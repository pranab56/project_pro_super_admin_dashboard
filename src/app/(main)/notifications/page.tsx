"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { NotificationCategory, NotificationItemType } from "@/types/notification";
import NotificationHeader from "@/components/notifications/NotificationHeader";
import NotificationFilters from "@/components/notifications/NotificationFilters";
import NotificationList from "@/components/notifications/NotificationList";

const initialNotifications: NotificationItemType[] = [
  {
    id: "NOTIF-101",
    title: "New Service Request Submitted",
    message: "Leaking faucet in master bathroom reported at Maple Residences (SR-1298).",
    category: "service_request",
    timestamp: "10 minutes ago",
    read: false,
    link: "/maintenance-requests",
    actionText: "View Request",
  },
  {
    id: "NOTIF-102",
    title: "High Value Rent Invoice Paid",
    message: "Monthly rent payment of $12,600 received from Sunrise Holdings (TXN-8843).",
    category: "invoice",
    timestamp: "1 hour ago",
    read: false,
    link: "/invoices",
    actionText: "View Invoice",
  },
  {
    id: "NOTIF-103",
    title: "Property Manager Pending Approval",
    message: "David Miller registered a new property manager account and requires review.",
    category: "property",
    timestamp: "3 hours ago",
    read: true,
    link: "/property-manager-approval",
    actionText: "Review Manager",
  },
  {
    id: "NOTIF-104",
    title: "Provider Application Under Review",
    message: "Alex Kumar submitted license documents for HVAC service provider role.",
    category: "service_request",
    timestamp: "5 hours ago",
    read: true,
    link: "/provider",
    actionText: "Check Application",
  },
  {
    id: "NOTIF-105",
    title: "System Maintenance Scheduled",
    message: "Routine database optimization and cloud server backup scheduled for midnight.",
    category: "system",
    timestamp: "1 day ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItemType[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const unreadCount = notifications.filter((item) => !item.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    toast.success("Notification deleted");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success("Cleared all notifications");
  };

  // Filter & Search Logic
  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesTab = true;
    if (activeTab === "unread") matchesTab = !item.read;
    else if (activeTab !== "all") matchesTab = item.category === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <NotificationHeader
        unreadCount={unreadCount}
        totalCount={notifications.length}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />

      {/* Filter Tabs & Search Bar */}
      <NotificationFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        unreadCount={unreadCount}
      />

      {/* Notifications List */}
      <NotificationList
        notifications={filteredNotifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </div>
  );
}
