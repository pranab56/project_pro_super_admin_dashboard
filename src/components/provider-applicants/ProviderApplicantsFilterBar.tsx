"use client";

import React from "react";
import { FilterTab } from "./types";

interface ProviderApplicantsFilterBarProps {
  activeTab: FilterTab;
  setActiveTab: (tab: FilterTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  counts: {
    all: number;
    pending: number;
    approved: number;
    actionRequired: number;
    rejected: number;
  };
}

export default function ProviderApplicantsFilterBar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  counts,
}: ProviderApplicantsFilterBarProps) {
  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "All", label: "All", count: counts.all },
    { key: "Approved", label: "Approved", count: counts.approved },
    { key: "Pending", label: "Pending", count: counts.pending },
    { key: "Action Required", label: "Action Required", count: counts.actionRequired },
    { key: "Rejected", label: "Rejected", count: counts.rejected },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "bg-[#F3E8FF] text-[#8E25E3] border border-[#8E25E3] shadow-2xs font-bold"
                  : "bg-[#FFFFFF] text-gray-700 hover:bg-gray-50 border border-[#E5E7EB]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  isActive ? "bg-[#8E25E3] text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="w-full md:w-64">
        <input
          type="text"
          placeholder="Search contractors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-xs sm:text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/20 focus:border-[#8E25E3] transition-colors"
        />
      </div>
    </div>
  );
}
