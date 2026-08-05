"use client";

import React from "react";
import { Eye, Clock, Wrench, CheckCircle2, XCircle } from "lucide-react";
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
        return "bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5]";
      case "High":
        return "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]";
      case "Medium":
        return "bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE]";
      case "Low":
        return "bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]";
    }
  };

  const getTypeStyle = (type: ServiceCategory) => {
    switch (type) {
      case "Plumbing":
        return { dot: "bg-[#2563EB]", text: "text-[#2563EB]" };
      case "Electrical":
        return { dot: "bg-[#D97706]", text: "text-[#D97706]" };
      case "HVAC":
        return { dot: "bg-[#16A34A]", text: "text-[#16A34A]" };
      case "Cleaning":
        return { dot: "bg-[#8E25E3]", text: "text-[#8E25E3]" };
      case "Painting":
        return { dot: "bg-[#E53935]", text: "text-[#E53935]" };
    }
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <span className="flex items-center gap-1.5 text-[#2563EB] font-semibold text-xs">
            <Wrench className="w-3.5 h-3.5 text-[#2563EB]" />
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
            <XCircle className="w-3.5 h-3.5 text-gray-400" />
            Cancelled
          </span>
        );
      default:
        return <span className="text-gray-600 text-xs">{status}</span>;
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-4 px-5">Job ID</th>
              <th className="py-4 px-5">Property & Issue</th>
              <th className="py-4 px-5">Type</th>
              <th className="py-4 px-5">Contractor</th>
              <th className="py-4 px-5">Priority</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5">Base Pay</th>
              <th className="py-4 px-5">Rate</th>
              <th className="py-4 px-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-800">
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
                  <tr key={item.id} className="hover:bg-purple-50/20 transition-colors">
                    {/* Job ID */}
                    <td className="py-4 px-5 whitespace-nowrap">
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
                      <span className="inline-flex items-center gap-1.5 font-bold text-xs">
                        <span className={`w-2 h-2 rounded-full ${typeStyle.dot}`} />
                        <span className={typeStyle.text}>{item.type}</span>
                      </span>
                    </td>

                    {/* Contractor */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`font-semibold text-xs ${
                          item.contractor === "Unassigned" ? "text-[#DC2626]" : "text-gray-900"
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
                          <span className="bg-[#F3E8FF] text-[#8E25E3] border border-[#E9D5FF] px-2 py-0.5 rounded-md text-[11px] font-bold inline-block">
                            {item.rateBonus} = ${item.finalPayCalculated ? item.finalPayCalculated.toLocaleString() : item.basePay}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenJobModal(item)}
                        className="px-3.5 py-2 border border-[#E9D5FF] hover:border-[#8E25E3] text-[#8E25E3] bg-[#F3E8FF] hover:bg-[#E9D5FF] font-semibold text-xs rounded-lg transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
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

