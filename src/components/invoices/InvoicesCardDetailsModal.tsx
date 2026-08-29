"use client";

import React from "react";
import { X, Sparkles, DollarSign } from "lucide-react";

interface InvoicesCardDetailsModalProps {
  cardTitle: string | null;
  onClose: () => void;
}

export default function InvoicesCardDetailsModal({
  cardTitle,
  onClose,
}: InvoicesCardDetailsModalProps) {
  if (!cardTitle) return null;

  const isSubscriptionModal = cardTitle.toLowerCase().includes("subscription");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8E25E3]/10 text-[#8E25E3] flex items-center justify-center">
              {isSubscriptionModal ? (
                <Sparkles className="w-4 h-4" />
              ) : (
                <DollarSign className="w-4 h-4" />
              )}
            </div>
            <h3 className="text-base font-bold text-gray-900">{cardTitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description Subtext */}
        <p className="text-xs text-gray-500 font-medium">
          Detailed transaction log and platform ledger calculations for{" "}
          <strong className="text-gray-800">{cardTitle}</strong>.
        </p>

        {/* Content Box */}
        {isSubscriptionModal ? (
          /* Subscription Plan Breakdown (Image 4 Client Request) */
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3 text-xs font-medium">
            {/* 1. Gold Plan */}
            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-700 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                1. Gold Plan:
              </span>
              <span className="font-bold text-gray-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
                45 Subscribers
              </span>
            </div>

            {/* 2. Silver Plan */}
            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-700 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                2. Silver Plan:
              </span>
              <span className="font-bold text-gray-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
                213 Subscribers
              </span>
            </div>

            {/* 3. Total Gross */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-2.5">
              <span className="text-gray-700 font-bold">3. Total Gross:</span>
              <span className="font-bold text-gray-900 text-sm">$52,400.00</span>
            </div>

            {/* 4. Total MRR */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-2.5">
              <span className="text-gray-700 font-bold">4. Total MRR:</span>
              <span className="font-bold text-[#8E25E3] text-sm">$14,850.00</span>
            </div>
          </div>
        ) : (
          /* Revenue & Payout Ledger (Image 5 Client Request) */
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-2.5 text-xs font-medium">
            {/* (1). YTD Gross Revenue */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">YTD Gross Revenue:</span>
              <span className="font-bold text-gray-900 text-sm">$52,400.00</span>
            </div>

            {/* (2). Platform Fees (Removed "(10%)") */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Platform Fees:</span>
              <span className="font-bold text-[#8E25E3] text-sm">$5,240.00</span>
            </div>

            {/* (3). YTD Net Revenue */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-2.5">
              <span className="text-gray-700 font-bold">YTD Net Revenue:</span>
              <span className="font-bold text-emerald-600 text-sm">$47,160.00</span>
            </div>
          </div>
        )}

        {/* Footer Button */}
        <div className="pt-2 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
