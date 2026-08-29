"use client";

import React from "react";
import { Clock } from "lucide-react";

interface ProviderApplicantsHeaderProps {
  pendingCount: number;
}

export default function ProviderApplicantsHeader({ pendingCount }: ProviderApplicantsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
          Provider Applications
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
          Manage and monitor service provider sign-ups, licenses, and insurance verification
        </p>
      </div>

      <div>
        <div className="px-4 py-2 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706] font-semibold text-xs sm:text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#D97706]" />
          <span>{pendingCount} awaiting review</span>
        </div>
      </div>
    </div>
  );
}
