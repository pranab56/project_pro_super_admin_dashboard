"use client";

import React from "react";
import { Eye, Clock, Key, CheckCircle2, Ban } from "lucide-react";
import { PriorityLevel, ServiceCategory, ServiceRequestItem } from "./types";

interface MaintenanceRequestsTableProps {
  requests: ServiceRequestItem[];
  handleOpenJobModal: (job: ServiceRequestItem) => void;
}

export default function MaintenanceRequestsTable({
  requests,
  handleOpenJobModal,
}: MaintenanceRequestsTableProps) {
  const getPriorityBadgeStyle = (priority: PriorityLevel) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-600";
      case "High":
        return "bg-amber-100 text-amber-700";
      case "Medium":
        return "bg-blue-100 text-blue-600";
      case "Low":
        return "bg-emerald-100 text-emerald-700";
    }
  };

  const getTypeStyle = (type: ServiceCategory) => {
    switch (type) {
      case "Plumbing":
        return { dot: "bg-[#3B82F6]", text: "text-[#3B82F6]" };
      case "Electrical":
        return { dot: "bg-[#F97316]", text: "text-[#F97316]" };
      case "HVAC":
        return { dot: "bg-[#10B981]", text: "text-[#10B981]" };
      case "Cleaning":
        return { dot: "bg-[#8E25E3]", text: "text-[#8E25E3]" };
      case "Painting":
        return { dot: "bg-[#F43F5E]", text: "text-[#F43F5E]" };
    }
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <span className="flex items-center gap-1.5 text-[#2563EB] font-semibold text-xs">
            <Key className="w-3.5 h-3.5 text-[#2563EB]" />
            In Progress
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center gap-1.5 text-[#D97706] font-semibold text-xs">
            <Clock className="w-3.5 h-3.5 text-[#D97706]" />
            Pending
          </span>
        );
      case "Assigned":
        return (
          <span className="flex items-center gap-1.5 text-[#8E25E3] font-semibold text-xs">
            <Clock className="w-3.5 h-3.5 text-[#8E25E3]" />
            Assigned
          </span>
        );
      case "Completed":
        return (
          <span className="flex items-center gap-1.5 text-[#16A34A] font-semibold text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            Completed
          </span>
        );
      case "Cancelled":
        return (
          <span className="flex items-center gap-1.5 text-gray-500 font-semibold text-xs">
            <Ban className="w-3.5 h-3.5 text-gray-400" />
            Cancelled
          </span>
        );
      default:
        return <span className="text-gray-600 text-xs">{status}</span>;
    }
  };

  return (
    <div className="bg-white/80 border border-gray-200/90 rounded-2xl overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-xs font-semibold">
              <th className="py-3.5 px-5 font-semibold">Job ID</th>
              <th className="py-3.5 px-5 font-semibold">Property & Issue</th>
              <th className="py-3.5 px-5 font-semibold">Type</th>
              <th className="py-3.5 px-5 font-semibold">Contractor</th>
              <th className="py-3.5 px-5 font-semibold">Priority</th>
              <th className="py-3.5 px-5 font-semibold">Status</th>
              <th className="py-3.5 px-5 font-semibold">Base Pay</th>
              <th className="py-3.5 px-5 font-semibold">Rate</th>
              <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/80 text-xs font-medium text-gray-800">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-gray-500 font-medium">
                  No service requests found.
                </td>
              </tr>
            ) : (
              requests.map((item) => {
                const typeStyle = getTypeStyle(item.type);
                return (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Job ID */}
                    <td className="py-4 px-5">
                      <div>
                        <p className="font-bold text-[#8E25E3] text-xs sm:text-sm">{item.id}</p>
                        <p className="text-[11px] text-gray-400 font-normal mt-0.5">{item.date}</p>
                      </div>
                    </td>

                    {/* Property & Issue */}
                    <td className="py-4 px-5 max-w-xs">
                      <div>
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">{item.property}</p>
                        <p className="text-xs text-gray-500 font-normal truncate mt-0.5">{item.issue}</p>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-xs">
                        <span className={`w-2 h-2 rounded-full ${typeStyle.dot}`} />
                        <span className={typeStyle.text}>{item.type}</span>
                      </span>
                    </td>

                    {/* Contractor */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`font-semibold text-xs ${
                          item.contractor === "Unassigned" ? "text-[#EF4444]" : "text-gray-900"
                        }`}
                      >
                        {item.contractor}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold inline-block ${getPriorityBadgeStyle(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      {renderStatus(item.status)}
                    </td>

                    {/* Base Pay */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="font-medium text-gray-700 text-xs sm:text-sm">
                        ${item.basePay.toLocaleString()}
                      </span>
                    </td>

                    {/* Rate */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      {item.rateBonus ? (
                        <div className="leading-tight">
                          <p className="font-bold text-[#8E25E3] text-xs">{item.rateBonus}</p>
                          <p className="font-bold text-[#8E25E3] text-xs">
                            = ${item.finalPayCalculated ? item.finalPayCalculated.toLocaleString() : item.basePay}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenJobModal(item)}
                        className="px-3 py-1.5 border border-purple-300 hover:border-[#8E25E3] text-[#8E25E3] bg-purple-50/50 hover:bg-purple-100/60 font-semibold text-xs rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Open Job</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

