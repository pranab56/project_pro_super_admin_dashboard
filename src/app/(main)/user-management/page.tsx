"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { initialUsersList, UserItem, UserStatus } from "@/components/user-management/types";
import UserManagementHeader from "@/components/user-management/UserManagementHeader";
import UserFiltersBar from "@/components/user-management/UserFiltersBar";
import UserTable from "@/components/user-management/UserTable";
import UserDetailsModal from "@/components/user-management/UserDetailsModal";

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserItem[]>(initialUsersList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All Roles");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All Statuses");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserItem | null>(null);

  // Filtering
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      selectedRoleFilter === "All Roles" || u.role === selectedRoleFilter;

    const matchesStatus =
      selectedStatusFilter === "All Statuses" || u.status === selectedStatusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleUserStatus = (user: UserItem) => {
    const newStatus: UserStatus = user.status === "Active" ? "Suspended" : "Active";
    setUsers((prev) =>
      prev.map((item) => (item.id === user.id ? { ...item, status: newStatus } : item))
    );
    toast.success(`Account for ${user.name} set to ${newStatus}`);
    setActiveMenuId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <UserManagementHeader />

      {/* Search & Filter Bar */}
      <UserFiltersBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRoleFilter={selectedRoleFilter}
        setSelectedRoleFilter={setSelectedRoleFilter}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        filteredCount={filteredUsers.length}
        totalCount={users.length}
      />

      {/* Users Data Table */}
      <UserTable
        users={filteredUsers}
        activeMenuId={activeMenuId}
        setActiveMenuId={setActiveMenuId}
        setSelectedUserDetail={setSelectedUserDetail}
        toggleUserStatus={toggleUserStatus}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUserDetail}
        onClose={() => setSelectedUserDetail(null)}
      />
    </div>
  );
}
