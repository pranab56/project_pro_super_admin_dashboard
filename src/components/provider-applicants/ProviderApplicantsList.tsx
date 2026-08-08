"use client";

import React from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Mail,
  Phone,
  Shield,
  Star,
  Wrench,
  XCircle,
} from "lucide-react";
import { ProviderApplicantItem } from "./types";

interface ProviderApplicantsListProps {
  applicants: ProviderApplicantItem[];
  expandedCardId: string | null;
  toggleExpand: (id: string) => void;
  handleApprove: (id: string, name: string) => void;
  handleReject: (id: string, name: string) => void;
  handleActionRequired: (id: string, name: string) => void;
}

export default function ProviderApplicantsList({
  applicants,
  expandedCardId,
  toggleExpand,
  handleApprove,
  handleReject,
  handleActionRequired,
}: ProviderApplicantsListProps) {
  if (applicants.length === 0) {
    return (
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-10 text-center text-gray-500 font-medium">
        No applicants found matching the current criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applicants.map((item) => {
        const isExpanded = expandedCardId === item.id;
        return (
          <div
            key={item.id}
            className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs transition-all duration-200"
          >
            {/* Main Header Row */}
            <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left: Avatar & Applicant Metadata */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Avatar Circle */}
                <div
                  className={`w-12 h-12 rounded-full ${item.avatarBg} ${item.avatarColor} font-bold text-base flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  {item.avatarChar}
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                      {item.name}
                    </h3>

                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                        item.status === "Pending"
                          ? "bg-[#FEF3C7] text-[#D97706]"
                          : item.status === "Under Review"
                          ? "bg-[#DBEAFE] text-[#2563EB]"
                          : item.status === "Approved"
                          ? "bg-[#DCFCE7] text-[#16A34A]"
                          : "bg-[#FEE2E2] text-[#DC2626]"
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* Rating if approved */}
                    {item.rating && (
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {item.rating}
                      </span>
                    )}
                  </div>

                  {/* ID Badges in List View */}
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[11px] font-bold rounded-md flex items-center gap-1">
                      <span className="text-[10px] text-blue-500 font-medium">SR #</span>
                      <span>{item.serviceRequestId}</span>
                    </span>

                    <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[11px] font-bold rounded-md flex items-center gap-1">
                      <span className="text-[10px] text-amber-600 font-medium">WO #</span>
                      <span>{item.workOrderId}</span>
                    </span>

                    <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold rounded-md flex items-center gap-1">
                      <span className="text-[10px] text-emerald-600 font-medium">JOB #</span>
                      <span>{item.jobId}</span>
                    </span>

                    <span className="px-2 py-0.5 bg-purple-50 border border-purple-200 text-[#8E25E3] font-mono text-[11px] font-bold rounded-md flex items-center gap-1">
                      <span className="text-[10px] text-purple-400 font-medium">PROV #</span>
                      <span>{item.id}</span>
                    </span>
                  </div>

                  {/* Subtitle with icons */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-500 font-normal mt-2">
                    <span className="flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {item.trade} · {item.experienceYears} years
                      </span>
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.email}</span>
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.phone}</span>
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>Applied {item.appliedDate}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2.5 flex-wrap shrink-0">
                {item.status === "Pending" || item.status === "Under Review" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleApprove(item.id, item.name)}
                      className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-xs sm:text-sm rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(item.id, item.name)}
                      className="px-4 py-2 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#DC2626] border border-[#FCA5A5] font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>

                    {item.id === "PROV-101" && (
                      <button
                        type="button"
                        onClick={() => handleActionRequired(item.id, item.name)}
                        className="px-4 py-2 bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#8E25E3] border border-[#E9D5FF] font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Action Required</span>
                      </button>
                    )}
                  </>
                ) : null}

                {/* Toggle Expand Details */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="px-4 py-2 bg-[#FFFFFF] hover:bg-gray-50 border border-gray-300/80 text-gray-700 font-medium text-xs sm:text-sm rounded-lg transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Details</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ease-in-out ${
                      isExpanded ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Smooth Animated Expansion Details View */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isExpanded
                  ? "grid-rows-[1fr] opacity-100 border-t border-[#E5E7EB]"
                  : "grid-rows-[0fr] opacity-0 border-t-0"
              }`}
            >
              <div className="overflow-hidden bg-gray-50/50">
                <div className="p-5 sm:p-6 space-y-6">
                  {/* Detailed Identifier Badges Card */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                      Associated Identifiers & Work Metadata
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-2.5">
                        <span className="text-[10px] font-bold text-blue-600 uppercase block mb-0.5">
                          Service Request ID #
                        </span>
                        <span className="text-xs font-mono font-bold text-blue-900">
                          {item.serviceRequestId}
                        </span>
                      </div>

                      <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2.5">
                        <span className="text-[10px] font-bold text-amber-700 uppercase block mb-0.5">
                          Work Order ID #
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-950">
                          {item.workOrderId}
                        </span>
                      </div>

                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-2.5">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase block mb-0.5">
                          Job ID #
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-950">
                          {item.jobId}
                        </span>
                      </div>

                      <div className="bg-purple-50/80 border border-purple-200 rounded-lg p-2.5">
                        <span className="text-[10px] font-bold text-purple-700 uppercase block mb-0.5">
                          Provider ID #
                        </span>
                        <span className="text-xs font-mono font-bold text-purple-950">
                          {item.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: About & License */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1.5">About</h4>
                        <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                          {item.aboutText}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                          LICENSE NUMBER
                        </span>
                        <span className="px-3.5 py-1.5 bg-[#FFFFFF] border border-gray-200 rounded-lg text-xs font-mono font-bold text-gray-800 inline-block shadow-2xs">
                          {item.licenseNumber}
                        </span>
                      </div>
                    </div>

                    {/* Right: Documents Submitted */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-3">
                        Documents Submitted
                      </h4>
                      <div className="space-y-2.5">
                        {item.documents.map((doc, idx) => (
                          <div
                            key={idx}
                            className="px-3.5 py-3 bg-[#FFFFFF] border border-gray-200 rounded-lg flex items-center justify-between shadow-2xs"
                          >
                            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-gray-800">
                              <FileText className="w-4 h-4 text-[#8E25E3]" />
                              <span>{doc.title}</span>
                            </div>
                            {doc.verified && (
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
