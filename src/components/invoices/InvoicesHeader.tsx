"use client";

import React from "react";
import { Download } from "lucide-react";

interface InvoicesHeaderProps {
  onExportCSV?: () => void;
}

export default function InvoicesHeader({ onExportCSV }: InvoicesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Invoices & Payments
        </h1>
        <p className="text-sm text-gray-500 font-normal mt-1">
          Manage and track active billing cycles, service providers payouts, platform commissions and subscription plans.
        </p>
      </div>

      {onExportCSV && (
        <div>
          <button
            type="button"
            onClick={onExportCSV}
            className="px-4 py-2.5 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV / Excel</span>
          </button>
        </div>
      )}
    </div>
  );
}
