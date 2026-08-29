"use client";

import React from "react";
import { Plus } from "lucide-react";

interface MaintenanceRequestsHeaderProps {
  onOpenNewRequest: () => void;
}

export default function MaintenanceRequestsHeader({ onOpenNewRequest }: MaintenanceRequestsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Service Requests
        </h1>
        <p className="text-sm text-gray-500 font-normal mt-1">
          Track, assign, and manage property requests and active work orders.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenNewRequest}
        className="px-4 py-3 bg-[#8E25E3] hover:bg-[#7b1bd1] text-white font-semibold text-xs rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>New Request</span>
      </button>
    </div>
  );
}

