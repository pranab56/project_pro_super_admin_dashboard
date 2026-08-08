"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { approvalQueueItems, PropertyManagerApprovalItem } from "@/components/property-manager-approval/approvalData";

export default function PropertyManagerApprovalPage() {
  const [queueList] = useState<PropertyManagerApprovalItem[]>(approvalQueueItems);

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
              Property Manager Approval Request
            </h1>
            <span className="px-3 py-1 rounded-full bg-amber-100/90 text-amber-700 font-medium text-xs">
              {queueList.length} pending
            </span>
          </div>
          <p className="text-sm text-gray-500 font-normal mt-1">
            Review, verify credentials, and manage platform access.
          </p>
        </div>
      </div>

      {/* Approvals Queue Cards List */}
      <div className="space-y-4">
        {queueList.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-10 text-center text-gray-500 font-medium">
            All property manager approval requests have been processed! 🎉
          </div>
        ) : (
          queueList.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] hover:bg-gray-50 border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-150"
            >
              {/* Left Side: Number, Avatar & Company Info */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Index Number */}
                <span className="text-sm font-semibold text-gray-400 w-4 text-center">
                  {item.id}
                </span>

                {/* Avatar Badge */}
                <div className="w-11 h-11 rounded-2xl bg-[#E1D4F4] text-[#8E25E3] font-bold text-base flex items-center justify-center shrink-0">
                  {item.avatarChar}
                </div>

                {/* Company & Applicant Name */}
                <div className="min-w-0">
                  <h3 className="text-base font-medium text-gray-900 leading-snug truncate">
                    {item.companyName}
                  </h3>
                  <p className="text-xs text-gray-500 font-normal truncate mt-0.5">
                    {item.applicantName} · {item.roleTitle}
                  </p>
                </div>
              </div>

              {/* Middle Section: Metadata Columns (Location, Portfolio, Submitted) */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs md:ml-auto pr-2">
                {/* Location */}
                <div>
                  <span className="text-[10px] font-medium text-gray-400  tracking-wider block mb-0.5">
                    LOCATION
                  </span>
                  <div className="flex items-center gap-1 text-gray-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Portfolio */}
                <div>
                  <span className="text-[10px] font-medium text-gray-400  tracking-wider block mb-0.5">
                    PORTFOLIO
                  </span>
                  <span className="text-gray-800 font-medium">
                    {item.portfolioUnits}
                  </span>
                </div>

                {/* Submitted */}
                <div>
                  <span className="text-[10px] font-medium text-gray-400 tracking-wider block mb-0.5">
                    SUBMITTED
                  </span>
                  <span className="text-gray-700 font-medium">
                    {item.submittedDate}
                  </span>
                </div>
              </div>

              {/* Right Side: Review Button Navigating to /property-manager-approval/[id] */}
              <div className="shrink-0 pt-2 md:pt-0">
                <Link
                  href={`/property-manager-approval/${item.id}`}
                  className="w-full md:w-auto px-5 py-3.5 bg-[#6B21A8] hover:bg-[#581c87] text-white font-medium text-xs rounded-md shadow-xs transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <span>Review</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
