"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  FileSpreadsheet,
  Tag,
  Trash2,
  Users,
  Wrench,
} from "lucide-react";
import toast from "react-hot-toast";

type OverviewCard = {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  linkColor: string;
  targetRoute?: string;
  detailsData: {
    title: string;
    items: { title: string; subtitle: string; status: string }[];
  };
};

const overviewCards: OverviewCard[] = [
  {
    id: 1,
    icon: Wrench,
    iconBg: "bg-purple-100/90",
    iconColor: "text-purple-600",
    value: "5",
    label: "Active Jobs",
    linkColor: "text-[#8E25E3]",
    detailsData: {
      title: "Active Jobs Breakdown",
      items: [
        { title: "Pipe Leakage Repair", subtitle: "Cedar Ridge Villas · Unit 4B", status: "In Progress" },
        { title: "HVAC Maintenance", subtitle: "Westpark Commercial · Suite 201", status: "In Progress" },
        { title: "Circuit Breaker Replacement", subtitle: "Lakeside Studio · Unit 12", status: "Assigned" },
        { title: "Roof Inspection", subtitle: "Elmwood Heights · Building A", status: "In Progress" },
        { title: "Elevator Service", subtitle: "Skyline Towers · Core B", status: "In Progress" },
      ],
    },
  },
  {
    id: 2,
    icon: Clock,
    iconBg: "bg-amber-100/90",
    iconColor: "text-amber-600",
    value: "3",
    label: "Pending Jobs",
    linkColor: "text-amber-600",
    detailsData: {
      title: "Pending Jobs Breakdown",
      items: [
        { title: "Water Heater Repair", subtitle: "Pine Ridge Townhomes · Unit 5", status: "Awaiting Provider" },
        { title: "Door Lock Fix", subtitle: "Oakwood Terrace · Unit 1A", status: "Pending Manager Review" },
        { title: "Window Glazing Repair", subtitle: "Harbor View Plaza · Unit 302", status: "Awaiting Provider" },
      ],
    },
  },
  {
    id: 3,
    icon: CheckCircle2,
    iconBg: "bg-emerald-100/90",
    iconColor: "text-emerald-600",
    value: "523",
    label: "Completed Jobs",
    linkColor: "text-[#8E25E3]",
    detailsData: {
      title: "Completed Jobs Summary",
      items: [
        { title: "Carpet Deep Cleaning", subtitle: "Sunset Heights · Unit 8", status: "Completed Today" },
        { title: "Plumbing Drain Flush", subtitle: "Metro Lofts · Unit 14", status: "Completed Yesterday" },
        { title: "Security Camera Setup", subtitle: "Commerce Building · Main Gate", status: "Verified & Closed" },
      ],
    },
  },
  {
    id: 4,
    icon: Trash2,
    iconBg: "bg-red-100/90",
    iconColor: "text-red-600",
    value: "20",
    label: "Cancelled Jobs",
    linkColor: "text-red-600",
    detailsData: {
      title: "Cancelled Jobs Log",
      items: [
        { title: "Duplicate Plumbing Request", subtitle: "Cedar Ridge Villas · Unit 2", status: "Cancelled by Tenant" },
        { title: "Lawn Mowing Request", subtitle: "Westpark Commercial", status: "Out of Scope" },
      ],
    },
  },
  {
    id: 5,
    icon: Building2,
    iconBg: "bg-blue-100/90",
    iconColor: "text-blue-600",
    value: "84",
    label: "Total Properties",
    linkColor: "text-blue-600",
    detailsData: {
      title: "Properties Overview",
      items: [
        { title: "Cedar Ridge Villas", subtitle: "80 Units · Residential", status: "Active" },
        { title: "Westpark Commercial", subtitle: "45 Units · Commercial", status: "Active" },
        { title: "Lakeside Studio", subtitle: "32 Units · Mixed-Use", status: "Active" },
      ],
    },
  },
  {
    id: 6,
    icon: Users,
    iconBg: "bg-purple-100/90",
    iconColor: "text-purple-600",
    value: "1,247",
    label: "Total Units",
    linkColor: "text-[#8E25E3]",
    detailsData: {
      title: "Total Units Capacity",
      items: [
        { title: "Occupied Units", subtitle: "1,120 Units", status: "90% Occupancy" },
        { title: "Vacant Units", subtitle: "127 Units", status: "Available" },
      ],
    },
  },
  {
    id: 7,
    icon: CreditCard,
    iconBg: "bg-amber-100/90",
    iconColor: "text-amber-600",
    value: "523",
    label: "Property Partners",
    linkColor: "text-[#8E25E3]",
    detailsData: {
      title: "Property Partners Roster",
      items: [
        { title: "Apex Property Solutions", subtitle: "12 Properties Managed", status: "Verified Partner" },
        { title: "Sterling Real Estate Group", subtitle: "24 Properties Managed", status: "Verified Partner" },
      ],
    },
  },
  {
    id: 8,
    icon: DollarSign,
    iconBg: "bg-amber-100/90",
    iconColor: "text-amber-600",
    value: "$84.5K",
    label: "Total Revenue Generated",
    linkColor: "text-[#8E25E3]",
    detailsData: {
      title: "Revenue Generation Ledger",
      items: [
        { title: "Platform Commission Fees", subtitle: "$42,200", status: "Processed" },
        { title: "Subscription Services", subtitle: "$42,300", status: "Processed" },
      ],
    },
  },
  {
    id: 9,
    icon: Briefcase,
    iconBg: "bg-blue-100/90",
    iconColor: "text-blue-600",
    value: "84",
    label: "Service Providers",
    linkColor: "text-blue-600",
    detailsData: {
      title: "Active Service Providers",
      items: [
        { title: "Fast Flow Plumbing", subtitle: "License: PLUM-44210", status: "Active" },
        { title: "ElectraCare Solutions", subtitle: "License: ELEC-99382", status: "Active" },
      ],
    },
  },
  {
    id: 10,
    icon: Tag,
    iconBg: "bg-emerald-100/90",
    iconColor: "text-emerald-600",
    value: "523",
    label: "Service Categories",
    linkColor: "text-[#8E25E3]",
    detailsData: {
      title: "Supported Service Categories",
      items: [
        { title: "Plumbing & Drainage", subtitle: "33 Active Requests", status: "Enabled" },
        { title: "Electrical & Lighting", subtitle: "28 Active Requests", status: "Enabled" },
        { title: "HVAC & Climate", subtitle: "22 Active Requests", status: "Enabled" },
      ],
    },
  },
  {
    id: 11,
    icon: CreditCard,
    iconBg: "bg-amber-100/90",
    iconColor: "text-amber-600",
    value: "523",
    label: "Pending Payout Request",
    linkColor: "text-[#8E25E3]",
    detailsData: {
      title: "Pending Payout Requests",
      items: [
        { title: "Payout to Fast Flow Plumbing", subtitle: "$1,450.00", status: "Scheduled" },
        { title: "Payout to ElectraCare LLC", subtitle: "$2,890.00", status: "Processing" },
      ],
    },
  },
  {
    id: 12,
    icon: DollarSign,
    iconBg: "bg-amber-100/90",
    iconColor: "text-amber-600",
    value: "$284.5K",
    label: "Total Revenue Paid Out",
    linkColor: "text-[#8E25E3]",
    detailsData: {
      title: "Historical Payouts Summary",
      items: [
        { title: "Contractor Payouts YTD", subtitle: "$220,000.00", status: "Completed" },
        { title: "Partner Commissions Paid", subtitle: "$64,500.00", status: "Completed" },
      ],
    },
  },
];

export default function DashboardOverviewPage() {
  const [selectedCard, setSelectedCard] = useState<OverviewCard | null>(null);

  const handleGenerateReport = () => {
    toast.success("Portfolio performance report generated successfully!");
  };

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
            className="px-5 py-2.5 bg-[#6B21A8] hover:bg-[#581c87] text-white font-medium text-sm rounded-md transition-all shadow-sm cursor-pointer flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* 12 Metric Cards Grid (3 Rows x 4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {overviewCards.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.id}
              className="bg-[#EBEBEB] border border-gray-300/50 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:bg-[#EBEBEB] transition-all duration-200"
            >
              <div>
                {/* Icon Badge */}
                <div
                  className={`w-12 h-12 rounded-md flex items-center justify-center ${card.iconBg} ${card.iconColor}`}
                >
                  <IconComp className="w-6 h-6" />
                </div>

                {/* Big Number Value */}
                <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-1">
                  {card.value}
                </h2>

                {/* Metric Label */}
                <p className="text-sm font-medium text-gray-600 mb-3">
                  {card.label}
                </p>
              </div>

              {/* Bottom Click for Details Link */}
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCard(card)}
                  className={`text-xs font-semibold underline hover:opacity-80 transition-opacity cursor-pointer ${card.linkColor}`}
                >
                  Click for Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedCard.iconBg} ${selectedCard.iconColor}`}
                >
                  <selectedCard.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-medium text-gray-900">
                  {selectedCard.detailsData.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {selectedCard.detailsData.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-md p-3 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-medium text-gray-900">{item.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium">{item.subtitle}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-[#8E25E3]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="w-full py-2.5 bg-[#6B21A8] hover:bg-[#581c87] text-white font-medium text-xs rounded-md transition-colors cursor-pointer"
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
