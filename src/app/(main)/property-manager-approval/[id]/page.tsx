"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  User,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { approvalQueueItems } from "@/components/property-manager-approval/approvalData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyManagerApprovalDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const item = approvalQueueItems.find((q) => q.id === resolvedParams.id) || approvalQueueItems[0];

  const [activeActionView, setActiveActionView] = useState<"default" | "additional_info">("default");
  const [additionalInfoNote, setAdditionalInfoNote] = useState("");
  const [currentStatus, setCurrentStatus] = useState(item.status);

  const handleApprove = () => {
    setCurrentStatus("Approved");
    toast.success(`Application for ${item.companyName} approved successfully!`);
  };

  const handleReject = () => {
    setCurrentStatus("Rejected");
    toast.error(`Application for ${item.companyName} rejected.`);
  };

  const handleSendAdditionalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!additionalInfoNote) {
      toast.error("Please enter a note for the applicant.");
      return;
    }
    setCurrentStatus("Additional Info Required");
    toast.success("Additional information request sent to applicant!");
    setActiveActionView("default");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation Header */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <Link
          href="/property-manager-approval"
          className="px-3 py-2.5 bg-[#FFFFFF] hover:bg-gray-50 border border-[#E5E7EB] rounded-md text-gray-700 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Queue</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span>Approval Queue</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-bold text-gray-900">{item.companyName}</span>
      </div>

      {/* Top Header Card */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar Circle */}
          <div className="w-14 h-14 rounded-2xl bg-[#E1D4F4] text-[#8E25E3] font-bold text-xl flex items-center justify-center shrink-0">
            {item.avatarChar}
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-medium text-gray-900 tracking-tight leading-snug">
              {item.companyName}
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {item.applicantName} · {item.roleTitle}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600 font-medium mt-1.5 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{item.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>Submitted {item.submittedDate}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          <span className="px-3.5 py-2 rounded-md bg-amber-100/90 text-amber-700 font-medium text-xs flex items-center gap-1.5 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{currentStatus}</span>
          </span>
        </div>
      </div>

      {/* 2x2 Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: CONTACT INFORMATION */}
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            CONTACT INFORMATION
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-purple-200 text-[#8E25E3] shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">FULL NAME</span>
                <span className="font-normal text-gray-900 text-sm">{item.applicantName}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-purple-200 text-[#8E25E3] shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">JOB TITLE</span>
                <span className="font-normal text-gray-900 text-sm">{item.roleTitle}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-purple-200 text-[#8E25E3] shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">BUSINESS EMAIL</span>
                <span className="font-normal text-gray-900 text-sm">{item.email}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-purple-200 text-[#8E25E3] shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">CONTACT NUMBER</span>
                <span className="font-normal text-gray-900 text-sm">{item.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: COMPANY & LOCATION */}
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            COMPANY & LOCATION
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-purple-200 text-[#8E25E3] shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">COMPANY NAME</span>
                <span className="font-normal text-gray-900 text-sm">{item.companyName}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-purple-200 text-[#8E25E3] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">CITY</span>
                <span className="font-normal text-gray-900 text-sm">{item.city}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-purple-200 text-[#8E25E3] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">STATE</span>
                <span className="font-normal text-gray-900 text-sm">{item.state}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: PORTFOLIO DETAILS */}
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            PORTFOLIO DETAILS
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-purple-200 text-[#8E25E3] shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">PORTFOLIO SIZE</span>
                <span className="font-normal text-gray-900 text-sm">{item.portfolioUnits}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 rounded-md bg-purple-200 text-[#8E25E3] shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">MAINTENANCE TYPE</span>
                <span className="font-normal text-gray-900 text-sm">{item.maintenanceType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: PROPERTY TYPES */}
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            PROPERTY TYPES
          </h3>

          {[
            { label: "Single-Family Homes", active: item.propertyTypes.singleFamily, icon: Home },
            { label: "Multi-Family / Apartments", active: item.propertyTypes.multiFamily, icon: Building2 },
            { label: "Commercial Buildings", active: item.propertyTypes.commercial, icon: Building2 },
            { label: "Student Housing", active: item.propertyTypes.studentHousing, icon: Home },
            { label: "HOAs / Condos", active: item.propertyTypes.hoasCondos, icon: Home },
          ].map((pt, idx) => {
            const IconComp = pt.icon;
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl flex items-center justify-between text-xs transition-colors ${pt.active
                  ? "bg-[#E1D4F4] text-[#8E25E3] font-bold shadow-2xs"
                  : "bg-gray-100 text-gray-500 font-medium"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <IconComp className="w-4 h-4" />
                  <span>{pt.label}</span>
                </div>
                {pt.active && <CheckCircle2 className="w-4 h-4 text-[#8E25E3]" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Action Required (Matching Screenshots 2 & 3) */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        {activeActionView === "default" ? (
          /* Default 3 Action Buttons View (Mockup 2) */
          <>
            <div>
              <h3 className="text-base font-bold text-gray-900">Action Required</h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Please review this submitted application and take one of the following actions: approve, request additional information, or reject.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Approve Button */}
              <button
                type="button"
                onClick={handleApprove}
                className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-500 text-emerald-700 font-medium text-xs rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Approve Application</span>
              </button>

              {/* Additional Info Needed Button */}
              <button
                type="button"
                onClick={() => setActiveActionView("additional_info")}
                className="py-3 px-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-400 text-[#8E25E3] font-medium text-xs rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
              >
                <Briefcase className="w-4 h-4 text-[#8E25E3]" />
                <span>Additional Info. Needed</span>
              </button>

              {/* Reject Button */}
              <button
                type="button"
                onClick={handleReject}
                className="py-3 px-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 text-red-700 font-medium text-xs rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
              >
                <XCircle className="w-4 h-4 text-red-600" />
                <span>Reject Application</span>
              </button>
            </div>
          </>
        ) : (
          /* Additional Information Form View (Mockup 3) */
          <form onSubmit={handleSendAdditionalInfo} className="space-y-4">
            <div className="p-3.5 bg-red-100/70 border border-red-200/90 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
              <span>Additional Information Required will notify the applicant and keep their account inactive.</span>
            </div>

            <div>
              <textarea
                rows={3}
                value={additionalInfoNote}
                onChange={(e) => setAdditionalInfoNote(e.target.value)}
                placeholder="e.g. Unable to verify business license. Please contact support before reapplying."
                className="w-full p-3.5 bg-white/90 border border-gray-300 rounded-md text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#8E25E3]/40 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-start gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#6B21A8] hover:bg-[#581c87] text-white font-medium text-xs rounded-md shadow-xs transition-colors cursor-pointer"
              >
                Send Message
              </button>
              <button
                type="button"
                onClick={() => setActiveActionView("default")}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-xs rounded-md hover:bg-gray-200/70 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
