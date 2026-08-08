"use client";

import React, { useState } from "react";
import {
  initialPlatformCommissions,
  initialPropertyPartnerInvoices,
  initialSubscriptionBillings,
  initialVendorPayments,
  MainInvoiceTab,
  PlatformCommissionItem,
  PropertyInvoiceStatusFilter,
  PropertyPartnerInvoice,
  SubscriptionBillingItem,
  SubscriptionBillingStatusFilter,
  TransactionItem,
  VendorPaymentItem,
} from "@/components/invoices/types";
import InvoicesHeader from "@/components/invoices/InvoicesHeader";
import InvoicesStats from "@/components/invoices/InvoicesStats";
import InvoicesFilterBar from "@/components/invoices/InvoicesFilterBar";
import InvoicesTable from "@/components/invoices/InvoicesTable";
import TransactionReceiptModal from "@/components/invoices/TransactionReceiptModal";
import InvoicesCardDetailsModal from "@/components/invoices/InvoicesCardDetailsModal";
import toast from "react-hot-toast";

export default function InvoicesPage() {
  // Main Tab & Filter States
  const [activeTab, setActiveTab] = useState<MainInvoiceTab>("property-partner-invoices");
  const [searchQuery, setSearchQuery] = useState("");

  // Subtab Status Filter States
  const [propertyStatusFilter, setPropertyStatusFilter] =
    useState<PropertyInvoiceStatusFilter>("All");
  const [subscriptionStatusFilter, setSubscriptionStatusFilter] =
    useState<SubscriptionBillingStatusFilter>("All");
  const [vendorStatusFilter, setVendorStatusFilter] = useState<string>("All");
  const [commissionStatusFilter, setCommissionStatusFilter] = useState<string>("All");

  // Datasets State
  const [propertyInvoices] = useState<PropertyPartnerInvoice[]>(initialPropertyPartnerInvoices);
  const [vendorPayments, setVendorPayments] = useState<VendorPaymentItem[]>(initialVendorPayments);
  const [platformCommissions] = useState<PlatformCommissionItem[]>(initialPlatformCommissions);
  const [subscriptionBillings] = useState<SubscriptionBillingItem[]>(initialSubscriptionBillings);

  // Modal States
  const [selectedTxn, setSelectedTxn] = useState<TransactionItem | null>(null);
  const [cardModalTitle, setCardModalTitle] = useState<string | null>(null);

  // 1. Filter Property Partner Invoices
  const filteredPropertyInvoices = propertyInvoices.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      propertyStatusFilter === "All" || item.status === propertyStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // 2. Filter Vendor Payments
  const filteredVendorPayments = vendorPayments.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.workOrder.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      vendorStatusFilter === "All" || item.status === vendorStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // 3. Filter Platform Commissions
  const filteredPlatformCommissions = platformCommissions.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.workOrder.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      commissionStatusFilter === "All" || item.status === commissionStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // 4. Filter Subscription Billings
  const filteredSubscriptionBillings = subscriptionBillings.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.planName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      subscriptionStatusFilter === "All" || item.status === subscriptionStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate current active count
  const getCurrentCount = () => {
    if (activeTab === "property-partner-invoices") return filteredPropertyInvoices.length;
    if (activeTab === "vendor-payments") return filteredVendorPayments.length;
    if (activeTab === "platform-commissions") return filteredPlatformCommissions.length;
    if (activeTab === "subscription-billings") return filteredSubscriptionBillings.length;
    return 0;
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    let filename = "invoices_export.csv";
    let headers: string[] = [];
    let rows: string[][] = [];

    if (activeTab === "property-partner-invoices") {
      filename = `Property_Partner_Invoices_${propertyStatusFilter.replace(/\s+/g, "_")}.csv`;
      headers = [
        "Invoice ID",
        "Date",
        "Description",
        "Property Partner",
        "Category",
        "Amount ($)",
        "Payment Method",
        "Status",
      ];
      rows = filteredPropertyInvoices.map((item) => [
        item.id,
        item.date,
        `"${item.description.replace(/"/g, '""')}"`,
        `"${item.partner.replace(/"/g, '""')}"`,
        item.category,
        item.amount.toString(),
        `"${item.paymentMethod.replace(/"/g, '""')}"`,
        item.status,
      ]);
    } else if (activeTab === "vendor-payments") {
      filename = `Vendor_Payments_${vendorStatusFilter.replace(/\s+/g, "_")}.csv`;
      headers = [
        "Payout ID",
        "Date",
        "Vendor Name",
        "Type",
        "Work Order",
        "Amount ($)",
        "Payment Method",
        "Status",
      ];
      rows = filteredVendorPayments.map((item) => [
        item.id,
        item.date,
        `"${item.vendorName.replace(/"/g, '""')}"`,
        item.type,
        item.workOrder,
        item.amount.toString(),
        `"${item.paymentMethod.replace(/"/g, '""')}"`,
        item.status,
      ]);
    } else if (activeTab === "platform-commissions") {
      filename = `Platform_Commissions_${commissionStatusFilter.replace(/\s+/g, "_")}.csv`;
      headers = [
        "Comm ID",
        "Date",
        "Work Order",
        "Property",
        "Vendor",
        "Total Job Amount ($)",
        "Commission Rate",
        "Platform Commission ($)",
        "Payment Method",
        "Status",
      ];
      rows = filteredPlatformCommissions.map((item) => [
        item.id,
        item.date,
        item.workOrder,
        `"${item.property.replace(/"/g, '""')}"`,
        `"${item.vendorName.replace(/"/g, '""')}"`,
        item.totalJobAmount.toString(),
        item.commissionRate,
        item.platformCommission.toString(),
        `"${item.paymentMethod.replace(/"/g, '""')}"`,
        item.status,
      ]);
    } else if (activeTab === "subscription-billings") {
      filename = `Subscription_Billings_${subscriptionStatusFilter.replace(/\s+/g, "_")}.csv`;
      headers = [
        "Subscription ID",
        "Date",
        "Property Partner",
        "Plan Name",
        "Billing Cycle",
        "Amount ($)",
        "Payment Method",
        "Status",
      ];
      rows = filteredSubscriptionBillings.map((item) => [
        item.id,
        item.date,
        `"${item.partner.replace(/"/g, '""')}"`,
        `"${item.planName.replace(/"/g, '""')}"`,
        item.billingCycle,
        item.amount.toString(),
        `"${item.paymentMethod.replace(/"/g, '""')}"`,
        item.status,
      ]);
    }

    if (rows.length === 0) {
      toast.error("No records available to export.");
      return;
    }

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${rows.length} records to ${filename}`);
  };

  // Handle clicking a Property Partner Invoice row
  const handleSelectPropertyInvoice = (inv: PropertyPartnerInvoice) => {
    setSelectedTxn({
      id: inv.id,
      date: inv.date,
      description: inv.description,
      partner: inv.partner,
      type: "Income",
      amount: inv.amount,
      paymentMethod: inv.paymentMethod,
      status: inv.status === "Paid" ? "Completed" : inv.status === "Failed Payment" ? "Failed" : "Pending",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <InvoicesHeader onExportCSV={handleExportCSV} />

      {/* Stats Cards */}
      <InvoicesStats onOpenCardDetails={(title) => setCardModalTitle(title)} />

      {/* Search, Tabs & Filter Bar */}
      <InvoicesFilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        propertyStatusFilter={propertyStatusFilter}
        setPropertyStatusFilter={setPropertyStatusFilter}
        subscriptionStatusFilter={subscriptionStatusFilter}
        setSubscriptionStatusFilter={setSubscriptionStatusFilter}
        vendorStatusFilter={vendorStatusFilter}
        setVendorStatusFilter={setVendorStatusFilter}
        commissionStatusFilter={commissionStatusFilter}
        setCommissionStatusFilter={setCommissionStatusFilter}
        filteredCount={getCurrentCount()}
        onExportCSV={handleExportCSV}
      />

      {/* Data Table Container */}
      <InvoicesTable
        activeTab={activeTab}
        propertyInvoices={filteredPropertyInvoices}
        vendorPayments={filteredVendorPayments}
        setVendorPayments={setVendorPayments}
        platformCommissions={filteredPlatformCommissions}
        subscriptionBillings={filteredSubscriptionBillings}
        onSelectPropertyInvoice={handleSelectPropertyInvoice}
      />

      {/* Transaction Receipt Modal */}
      <TransactionReceiptModal
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
      />

      {/* Card Details Modal */}
      <InvoicesCardDetailsModal
        cardTitle={cardModalTitle}
        onClose={() => setCardModalTitle(null)}
      />
    </div>
  );
}