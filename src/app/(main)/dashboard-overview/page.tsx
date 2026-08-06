"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  ExternalLink,
  FileSpreadsheet,
  ShieldAlert,
  Tag,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

// Custom Contractor Worker Icon matching Figma sample image
const ContractorWorkerIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    className={className}
  >
    {/* Hard Hat Helmet & Brim */}
    <path d="M32 6 C21 6 12 14 10 25 L6 25 C4.3 25 3 26.3 3 28 L3 31 C3 32.7 4.3 34 6 34 L58 34 C59.7 34 61 32.7 61 31 L61 28 C61 26.3 59.7 25 58 25 L54 25 C52 14 43 6 32 6 Z M29 10 L35 10 L35 25 L29 25 Z" />
    {/* Head */}
    <circle cx="32" cy="38" r="6" />
    {/* Body / Shoulders */}
    <path d="M14 58 C14 47 21 44 32 44 C43 44 50 47 50 58 L50 62 L14 62 Z" />
    {/* Crossed Wrench & Hammer in Foreground */}
    <path d="M42 42 L58 56 C59.5 57.5 59.5 60 58 61.5 C56.5 63 54 63 52.5 61.5 L36.5 47.5 Z" />
    <path d="M58 42 L42 56 C40.5 57.5 40.5 60 42 61.5 C43.5 63 46 63 47.5 61.5 L63.5 47.5 Z" />
  </svg>
);

export type PipelineSubTab = "Pending" | "Active" | "Completed" | "Cancelled";
export type PropertySubTab = "Properties List" | "Total Units";
export type DisputeSubTab = "Escalated Complaints" | "Client-Vendor Conflicts";

export type PayoutItem = {
  payoutId: string;
  category: string;
  vendorName: string;
  isVerified: boolean;
  workOrderNo: string;
  amount: string;
  requestDate: string;
  status: "Pending" | "Flagged" | "Disputed";
};

export type OverviewCardType =
  | "service-pipeline"
  | "pending-jobs"
  | "completed-jobs"
  | "cancelled-jobs"
  | "properties"
  | "total-units"
  | "property-partners"
  | "total-revenue-generated"
  | "service-providers"
  | "service-categories"
  | "pending-payouts"
  | "total-revenue-paid-out"
  | "dispute-center";

export type OverviewCard = {
  id: OverviewCardType;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  linkColor: string;
};

const overviewCards: OverviewCard[] = [
  {
    id: "service-pipeline",
    icon: ContractorWorkerIcon,
    iconBg: "bg-purple-100/90",
    iconColor: "text-purple-600",
    value: "5",
    label: "Service Pipeline",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "pending-jobs",
    icon: Clock,
    iconBg: "bg-amber-100/90",
    iconColor: "text-amber-600",
    value: "3",
    label: "Pending Jobs",
    linkColor: "text-amber-600",
  },
  {
    id: "completed-jobs",
    icon: CheckCircle2,
    iconBg: "bg-emerald-100/90",
    iconColor: "text-emerald-600",
    value: "523",
    label: "Completed Jobs",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "cancelled-jobs",
    icon: ContractorWorkerIcon,
    iconBg: "bg-red-100/90",
    iconColor: "text-red-600",
    value: "20",
    label: "Cancelled Jobs",
    linkColor: "text-red-600",
  },
  {
    id: "properties",
    icon: Building2,
    iconBg: "bg-blue-100/90",
    iconColor: "text-blue-600",
    value: "84",
    label: "Properties",
    linkColor: "text-blue-600",
  },
  {
    id: "total-units",
    icon: Users,
    iconBg: "bg-purple-100/90",
    iconColor: "text-purple-600",
    value: "1,247",
    label: "Total Units",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "property-partners",
    icon: CreditCard,
    iconBg: "bg-amber-100/90",
    iconColor: "text-amber-600",
    value: "523",
    label: "Property Partners",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "total-revenue-generated",
    icon: DollarSign,
    iconBg: "bg-emerald-100/90",
    iconColor: "text-emerald-600",
    value: "$84.5K",
    label: "Total Revenue Generated",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "service-providers",
    icon: ContractorWorkerIcon,
    iconBg: "bg-blue-100/90",
    iconColor: "text-blue-600",
    value: "84",
    label: "Service Providers",
    linkColor: "text-blue-600",
  },
  {
    id: "service-categories",
    icon: Tag,
    iconBg: "bg-emerald-100/90",
    iconColor: "text-emerald-600",
    value: "523",
    label: "Service Categories",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "pending-payouts",
    icon: CreditCard,
    iconBg: "bg-amber-100/90",
    iconColor: "text-amber-600",
    value: "18",
    label: "Pending Payout Request",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "total-revenue-paid-out",
    icon: DollarSign,
    iconBg: "bg-amber-100/90",
    iconColor: "text-amber-600",
    value: "$284.5K",
    label: "Total Revenue Paid Out",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "dispute-center",
    icon: ShieldAlert,
    iconBg: "bg-blue-100/90",
    iconColor: "text-blue-600",
    value: "12",
    label: "Dispute Center",
    linkColor: "text-blue-600",
  },
];

// Mock Data for Pipeline Sub-Tabs
const pipelineData = {
  Pending: [
    { id: "WO-1297", title: "Electrical outlet fix in kitchen", property: "Oak Heights · Unit 12", date: "Jun 24, 2026", status: "Awaiting Provider" },
    { id: "WO-1301", title: "Water Heater Repair", property: "Pine Ridge Townhomes", date: "Jun 23, 2026", status: "Pending Review" },
    { id: "WO-1304", title: "Door Lock Mechanism Fix", property: "Oakwood Terrace · Unit 1A", date: "Jun 22, 2026", status: "Awaiting Provider" },
  ],
  Active: [
    { id: "WO-1298", title: "Leaking faucet in master bathroom", property: "Maple Residences · Unit 4B", date: "Jun 24, 2026", status: "In Progress" },
    { id: "WO-1296", title: "Air conditioning not cooling properly", property: "Sunrise Towers · Suite 301", date: "Jun 23, 2026", status: "In Progress" },
    { id: "WO-1294", title: "Interior repainting of living room", property: "Harbor Point · Unit 10", date: "Jun 22, 2026", status: "In Progress" },
    { id: "WO-1299", title: "Circuit Breaker Replacement", property: "Lakeside Studio · Unit 12", date: "Jun 21, 2026", status: "Assigned" },
    { id: "WO-1300", title: "Elevator Annual Maintenance", property: "Skyline Towers · Core B", date: "Jun 20, 2026", status: "In Progress" },
  ],
  Completed: [
    { id: "WO-1293", title: "Water heater replacement needed", property: "Skyline Apts · Suite 400", date: "Jun 20, 2026", status: "Completed" },
    { id: "WO-1292", title: "Installing new ceiling fan", property: "Cedar Ridge · Unit 5", date: "Jun 19, 2026", status: "Completed" },
    { id: "WO-1290", title: "Carpet Deep Cleaning", property: "Sunset Heights · Unit 8", date: "Jun 17, 2026", status: "Verified & Closed" },
  ],
  Cancelled: [
    { id: "WO-1291", title: "Annual AC maintenance inspection", property: "Westpark Office · Floor 2", date: "Jun 18, 2026", status: "Cancelled" },
    { id: "WO-1285", title: "Duplicate Plumbing Request", property: "Cedar Ridge Villas · Unit 2", date: "Jun 15, 2026", status: "Cancelled by Tenant" },
  ],
};

// Mock Data for Pending Payout Requests Flow
const pendingPayoutsList: PayoutItem[] = [
  {
    payoutId: "#PAY-8941",
    category: "HVAC",
    vendorName: "ElectraCare Solutions",
    isVerified: true,
    workOrderNo: "WO-1296",
    amount: "$1,450.00",
    requestDate: "Jun 26, 2026",
    status: "Pending",
  },
  {
    payoutId: "#PAY-8942",
    category: "Plumbing",
    vendorName: "Fast Flow Plumbing",
    isVerified: true,
    workOrderNo: "WO-1298",
    amount: "$2,890.00",
    requestDate: "Jun 25, 2026",
    status: "Pending",
  },
  {
    payoutId: "#PAY-8943",
    category: "Electrical",
    vendorName: "Bright Spark Electric",
    isVerified: true,
    workOrderNo: "WO-1297",
    amount: "$980.00",
    requestDate: "Jun 24, 2026",
    status: "Flagged",
  },
  {
    payoutId: "#PAY-8944",
    category: "Painting",
    vendorName: "ProCoat Painters LLC",
    isVerified: false,
    workOrderNo: "WO-1294",
    amount: "$1,275.00",
    requestDate: "Jun 23, 2026",
    status: "Disputed",
  },
];

// Mock Data for Dispute Center
const disputeCenterData = {
  "Escalated Complaints": [
    { id: "DSP-301", client: "Sarah Jenkins (Tenant)", party: "Fast Flow Plumbing", issue: "Unresolved water leakage damage to kitchen floor", priority: "High", status: "Escalated" },
    { id: "DSP-302", client: "Robert Chen (Property Manager)", party: "ProCoat Painters", issue: "Delay in finishing exterior coating project", priority: "Medium", status: "Under Review" },
  ],
  "Client-Vendor Conflicts": [
    { id: "DSP-303", client: "Metro Property Mgmt", party: "ElectraCare Solutions", issue: "Invoice discrepancy over after-hours rate charge", priority: "High", status: "Disputed" },
    { id: "DSP-304", client: "Oakwood Estates", party: "HVAC Masters", issue: "Equipment warranty coverage disagreement", priority: "Low", status: "Under Review" },
  ],
};

export default function DashboardOverviewPage() {
  const [selectedCardId, setSelectedCardId] = useState<OverviewCardType | null>(null);

  // Sub-Tab States
  const [pipelineSubTab, setPipelineSubTab] = useState<PipelineSubTab>("Active");
  const [propertySubTab, setPropertySubTab] = useState<PropertySubTab>("Properties List");
  const [disputeSubTab, setDisputeSubTab] = useState<DisputeSubTab>("Escalated Complaints");

  const handleGenerateReport = () => {
    toast.success("Portfolio performance report generated successfully!");
  };

  const activeCard = overviewCards.find((c) => c.id === selectedCardId);

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            View portfolio performance at a glance
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleGenerateReport}
            className="px-5 py-2.5 bg-[#8E25E3] hover:bg-[#7b1bd1] text-white font-semibold text-sm rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Overview Cards Grid (All 13 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {overviewCards.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.id}
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Icon Badge */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor} shadow-2xs`}
                >
                  <IconComp className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Big Number Value */}
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight mt-4 mb-1">
                  {card.value}
                </h2>

                {/* Metric Label */}
                <p className="text-sm font-normal  text-gray-500 mb-3">
                  {card.label}
                </p>
              </div>

              {/* Bottom Click for Details Link */}
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCardId(card.id)}
                  className={`text-xs font-semibold underline hover:opacity-80 transition-opacity cursor-pointer ${card.linkColor}`}
                >
                  Click for Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal Container */}
      {selectedCardId && activeCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCard.iconBg} ${activeCard.iconColor}`}
                >
                  <activeCard.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {activeCard.label} Details
                  </h3>
                  <p className="text-xs text-gray-500 font-normal">
                    Comprehensive breakdown & status logs
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCardId(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 1. SERVICE PIPELINE MASTER TAB DETAILS (With Sub-Tabs) */}
            {selectedCardId === "service-pipeline" && (
              <div className="space-y-4">
                {/* Sub-Tabs Navigation */}
                <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
                  {(["Pending", "Active", "Completed", "Cancelled"] as PipelineSubTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPipelineSubTab(tab)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        pipelineSubTab === tab
                          ? "bg-[#8E25E3] text-white shadow-2xs"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                      }`}
                    >
                      {tab} ({pipelineData[tab].length})
                    </button>
                  ))}
                </div>

                {/* Sub-Tab Items List */}
                <div className="space-y-2.5">
                  {pipelineData[pipelineSubTab].map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 border border-gray-200/90 rounded-xl p-3.5 flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#8E25E3]">{item.id}</span>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900">{item.title}</h4>
                        </div>
                        <p className="text-xs text-gray-500 font-normal mt-0.5">{item.property} · {item.date}</p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                          pipelineSubTab === "Active"
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : pipelineSubTab === "Pending"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : pipelineSubTab === "Completed"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. PROPERTIES MASTER TAB DETAILS (With Sub-Tabs: List of Properties & Total Units) */}
            {selectedCardId === "properties" && (
              <div className="space-y-4">
                {/* Sub-Tabs Navigation */}
                <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
                  {(["Properties List", "Total Units"] as PropertySubTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPropertySubTab(tab)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        propertySubTab === tab
                          ? "bg-blue-600 text-white shadow-2xs"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Properties List Tab Content */}
                {propertySubTab === "Properties List" && (
                  <div className="space-y-2.5">
                    {[
                      { name: "Cedar Ridge Villas", address: "1201 Maple Ave, Austin, TX", units: "80 Units", type: "Residential", status: "Active" },
                      { name: "Westpark Commercial", address: "412 Oak Street, Chicago, IL", units: "45 Units", type: "Commercial", status: "Active" },
                      { name: "Lakeside Studio", address: "88 Ocean Drive, San Francisco, CA", units: "32 Units", type: "Mixed-Use", status: "Active" },
                      { name: "Elmwood Heights", address: "105 Greenview Rd, Denver, CO", units: "60 Units", type: "Residential", status: "Active" },
                    ].map((prop, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900">{prop.name}</h4>
                          <p className="text-xs text-gray-500 font-normal mt-0.5">{prop.address} · {prop.units}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {prop.type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Total Units Sub-Tab Content */}
                {propertySubTab === "Total Units" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                      <h4 className="text-3xl font-bold text-blue-600">1,120</h4>
                      <p className="text-xs font-semibold text-gray-700 mt-1">Occupied Units (90%)</p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                      <h4 className="text-3xl font-bold text-amber-600">127</h4>
                      <p className="text-xs font-semibold text-gray-700 mt-1">Vacant Units (10%)</p>
                    </div>

                    <div className="sm:col-span-2 bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-gray-900">Total Managed Portfolio Units</h4>
                        <p className="text-xs text-gray-500">Across 84 verified property partnerships</p>
                      </div>
                      <span className="text-2xl font-bold text-[#8E25E3]">1,247 Units</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. DISPUTE CENTER MASTER TAB DETAILS (With Sub-Tabs: Complaints & Conflicts) */}
            {selectedCardId === "dispute-center" && (
              <div className="space-y-4">
                {/* Sub-Tabs Navigation */}
                <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
                  {(["Escalated Complaints", "Client-Vendor Conflicts"] as DisputeSubTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setDisputeSubTab(tab)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        disputeSubTab === tab
                          ? "bg-blue-600 text-white shadow-2xs"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Dispute Items List */}
                <div className="space-y-3">
                  {disputeCenterData[disputeSubTab].map((item) => (
                    <div key={item.id} className="bg-blue-50/40 border border-blue-200/80 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600">{item.id}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            item.status === "Escalated" || item.status === "Disputed"
                              ? "bg-red-100 text-red-700 border border-red-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-gray-900">{item.issue}</h4>

                      <div className="flex flex-wrap items-center justify-between text-xs text-gray-600 font-normal pt-1 border-t border-blue-100">
                        <span>Reported by: <strong>{item.client}</strong></span>
                        <span>Against: <strong>{item.party}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PENDING PAYOUT REQUEST DETAILS FLOW */}
            {selectedCardId === "pending-payouts" && (
              <div className="space-y-3">
                {pendingPayoutsList.map((payout) => (
                  <div
                    key={payout.payoutId}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2.5 shadow-2xs"
                  >
                    {/* Header Row: Payout ID & Status Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#8E25E3]">{payout.payoutId}</span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                          {payout.category}
                        </span>
                      </div>

                      {/* Status Badge: Yellow warning for Pending, Red for Flagged/Disputed */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                          payout.status === "Pending"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-red-100 text-red-700 border border-red-300"
                        }`}
                      >
                        {payout.status === "Pending" ? (
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        )}
                        <span>{payout.status}</span>
                      </span>
                    </div>

                    {/* Service Provider Name + Verified Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-800 font-medium">
                      <span>Service Provider:</span>
                      <span className="font-bold text-gray-900">{payout.vendorName}</span>
                      {payout.isVerified && (
                        <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </div>

                    {/* Work Order Link & Dates & Amount */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200 text-xs">
                      <div>
                        <span className="text-gray-500 font-normal">Work Order: </span>
                        <a
                          href="/maintenance-requests"
                          className="font-semibold text-[#8E25E3] underline hover:text-[#7b1bd1] inline-flex items-center gap-1"
                        >
                          <span>{payout.workOrderNo} (View Job)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div>
                        <span className="text-gray-500 font-normal">Requested: </span>
                        <span className="font-semibold text-gray-700">{payout.requestDate}</span>
                      </div>

                      <div>
                        <span className="text-gray-500 font-normal">Amount: </span>
                        <span className="text-sm font-bold text-gray-900">{payout.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* DEFAULT DETAILS MODAL FOR OTHER CARDS */}
            {selectedCardId !== "service-pipeline" &&
              selectedCardId !== "properties" &&
              selectedCardId !== "dispute-center" &&
              selectedCardId !== "pending-payouts" && (
                <div className="space-y-2.5">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                      {activeCard.label} Summary Records
                    </h4>
                    <p className="text-xs text-gray-500 font-normal">
                      Total Count: <strong className="text-gray-900">{activeCard.value}</strong>
                    </p>
                  </div>
                </div>
              )}

            {/* Modal Footer */}
            <div className="pt-3 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCardId(null)}
                className="px-5 py-2.5 bg-[#8E25E3] hover:bg-[#7b1bd1] text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
