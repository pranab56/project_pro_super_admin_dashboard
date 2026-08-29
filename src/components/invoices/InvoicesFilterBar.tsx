"use client";

import React from "react";
import { Calendar, Download, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MainInvoiceTab,
  PropertyInvoiceStatusFilter,
  SubscriptionBillingStatusFilter,
} from "./types";

interface InvoicesFilterBarProps {
  activeTab: MainInvoiceTab;
  setActiveTab: (tab: MainInvoiceTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  propertyStatusFilter: PropertyInvoiceStatusFilter;
  setPropertyStatusFilter: (status: PropertyInvoiceStatusFilter) => void;
  subscriptionStatusFilter: SubscriptionBillingStatusFilter;
  setSubscriptionStatusFilter: (status: SubscriptionBillingStatusFilter) => void;
  vendorStatusFilter: string;
  setVendorStatusFilter: (status: string) => void;
  commissionStatusFilter: string;
  setCommissionStatusFilter: (status: string) => void;
  filteredCount: number;
  onExportCSV: () => void;
}

export default function InvoicesFilterBar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  propertyStatusFilter,
  setPropertyStatusFilter,
  subscriptionStatusFilter,
  setSubscriptionStatusFilter,
  vendorStatusFilter,
  setVendorStatusFilter,
  commissionStatusFilter,
  setCommissionStatusFilter,
  filteredCount,
  onExportCSV,
}: InvoicesFilterBarProps) {
  const mainTabs: { id: MainInvoiceTab; label: string }[] = [
    { id: "property-partner-invoices", label: "Property Partner Invoices" },
    { id: "vendor-payments", label: "Vendor Payments" },
    { id: "platform-commissions", label: "Platform Commissions" },
    { id: "subscription-billings", label: "Subscription Billings" },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Main Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-200 custom-scrollbar">
        {mainTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#8E25E3] text-white shadow-xs"
                  : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. Secondary Filter Bar: Subtabs / Status Filters + Search + Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
        {/* Clickable Subtab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
          {/* Subtabs for Property Partner Invoices */}
          {activeTab === "property-partner-invoices" && (
            <>
              {(["All", "Paid", "Overdue", "Billed", "Failed Payment"] as PropertyInvoiceStatusFilter[]).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setPropertyStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      propertyStatusFilter === st
                        ? "bg-[#8E25E3]/10 text-[#8E25E3] border border-[#8E25E3]/30"
                        : "bg-gray-100/70 text-gray-600 hover:bg-gray-200/70"
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </>
          )}

          {/* Subtabs for Vendor Payments */}
          {activeTab === "vendor-payments" && (
            <>
              {["All", "Pending Payout", "Processing", "Paid", "Failed"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setVendorStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    vendorStatusFilter === st
                      ? "bg-[#8E25E3]/10 text-[#8E25E3] border border-[#8E25E3]/30"
                      : "bg-gray-100/70 text-gray-600 hover:bg-gray-200/70"
                  }`}
                >
                  {st}
                </button>
              ))}
            </>
          )}

          {/* Subtabs for Platform Commissions */}
          {activeTab === "platform-commissions" && (
            <>
              {["All", "Collected", "Pending Split", "Completed"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setCommissionStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    commissionStatusFilter === st
                      ? "bg-[#8E25E3]/10 text-[#8E25E3] border border-[#8E25E3]/30"
                      : "bg-gray-100/70 text-gray-600 hover:bg-gray-200/70"
                  }`}
                >
                  {st}
                </button>
              ))}
            </>
          )}

          {/* Subtabs for Subscription Billings */}
          {activeTab === "subscription-billings" && (
            <>
              {(
                ["All", "Active Subscriptions", "Trial Periods", "Cancelled Plans"] as SubscriptionBillingStatusFilter[]
              ).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSubscriptionStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    subscriptionStatusFilter === st
                      ? "bg-[#8E25E3]/10 text-[#8E25E3] border border-[#8E25E3]/30"
                      : "bg-gray-100/70 text-gray-600 hover:bg-gray-200/70"
                  }`}
                >
                  {st}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Right side: Year Filter, Search, Filtered Count & Export CSV */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-semibold text-gray-500 shrink-0 hidden sm:inline">
            {filteredCount} records
          </span>

          {/* Year Filter Dropdown (Client request Image 5: 2026, 2027, 2028) */}
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[125px] bg-gray-50 border border-gray-200 py-2 rounded-xl text-xs font-semibold text-gray-800 h-9 focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8E25E3]" />
                <SelectValue placeholder="Year" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 text-xs font-semibold text-gray-800 shadow-md">
              <SelectItem value="All Years">All Years</SelectItem>
              <SelectItem value="2026">Year 2026</SelectItem>
              <SelectItem value="2027">Year 2027</SelectItem>
              <SelectItem value="2028">Year 2028</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Input */}
          <div className="relative w-full md:w-48">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/40"
            />
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={onExportCSV}
            className="px-3.5 py-2 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
