"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  Briefcase,
  Building2,
  Clock,
  CreditCard,
  DollarSign,
  ExternalLink,
  HardHat,
  Package,
  Receipt,
  Search,
  Users,
  Wrench,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type WorkOrderSubTab = "All" | "Pending" | "Active" | "Completed" | "Cancelled";
export type PropertySubTab = "Properties List" | "Total Units";
export type DisputeSubTab = "Escalated Complaints" | "Client-Vendor Conflicts";
export type ServiceProSubTab = "All" | "Onboarded" | "Pending Approval" | "Rejected" | "Deactivated";
export type VendorBillingSubTab = "All Batches" | "Ready for Payout" | "Processing" | "Completed";

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

export type PropertyServiceItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  prosAvailable: number;
  enabled: boolean;
};

export type ServiceProItem = {
  id: string;
  name: string;
  company: string;
  trade: string;
  rating: number;
  completedJobs: number;
  status: "Onboarded" | "Pending Approval" | "Rejected" | "Deactivated";
  phone: string;
  email: string;
};

export type VendorBatchItem = {
  batchId: string;
  dateCreated: string;
  totalVendors: number;
  totalAmount: string;
  payoutMethod: "ACH Direct Deposit" | "Wire Transfer" | "Check";
  status: "Ready for Payout" | "Processing" | "Completed";
};

export type OverviewCardType =
  | "work-orders"
  | "total-properties"
  | "property-partners"
  | "finance"
  | "service-categories"
  | "payout-requests"
  | "dispute-center"
  | "service-providers"
  | "vendor-billing";

export type OverviewCard = {
  id: OverviewCardType;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  linkColor: string;
  directLink?: string;
};

const overviewCards: OverviewCard[] = [
  {
    id: "work-orders",
    icon: Wrench,
    iconBg: "bg-purple-100/80",
    iconColor: "text-[#8E25E3]",
    value: "5",
    label: "Work Orders",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "total-properties",
    icon: Building2,
    iconBg: "bg-blue-100/80",
    iconColor: "text-blue-500",
    value: "84",
    label: "Total Properties",
    linkColor: "text-[#0284C7]",
  },
  {
    id: "property-partners",
    icon: Users,
    iconBg: "bg-amber-100/80",
    iconColor: "text-amber-600",
    value: "523",
    label: "Property Partners",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "finance",
    icon: DollarSign,
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-600",
    value: "$84.5K",
    label: "Finance",
    linkColor: "text-[#8E25E3]",
    directLink: "/invoices",
  },
  {
    id: "service-categories",
    icon: Package,
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-600",
    value: "523",
    label: "Service Categories",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "payout-requests",
    icon: CreditCard,
    iconBg: "bg-amber-100/80",
    iconColor: "text-amber-600",
    value: "523",
    label: "Payout Request",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "dispute-center",
    icon: Briefcase,
    iconBg: "bg-blue-100/80",
    iconColor: "text-blue-500",
    value: "84",
    label: "Dispute Center",
    linkColor: "text-[#0284C7]",
  },
  {
    id: "service-providers",
    icon: HardHat,
    iconBg: "bg-purple-100/80",
    iconColor: "text-[#8E25E3]",
    value: "312",
    label: "Service Providers (Service Pro's)",
    linkColor: "text-[#8E25E3]",
  },
  {
    id: "vendor-billing",
    icon: Receipt,
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-600",
    value: "$120.5K",
    label: "Vendor Billing",
    linkColor: "text-[#8E25E3]",
  },
];

// Mock Data for Work Orders Sub-Tabs
const workOrdersData = {
  All: [
    { id: "WO-1297", title: "Electrical outlet fix in kitchen", property: "Oak Heights · Unit 12", date: "Jun 24, 2026", status: "Pending" },
    { id: "WO-1301", title: "Water Heater Repair", property: "Pine Ridge Townhomes", date: "Jun 23, 2026", status: "Pending" },
    { id: "WO-1298", title: "Leaking faucet in master bathroom", property: "Maple Residences · Unit 4B", date: "Jun 24, 2026", status: "Active" },
    { id: "WO-1296", title: "Air conditioning not cooling properly", property: "Sunrise Towers · Suite 301", date: "Jun 23, 2026", status: "Active" },
    { id: "WO-1294", title: "Interior repainting of living room", property: "Harbor Point · Unit 10", date: "Jun 22, 2026", status: "Active" },
    { id: "WO-1293", title: "Water heater replacement needed", property: "Skyline Apts · Suite 400", date: "Jun 20, 2026", status: "Completed" },
    { id: "WO-1292", title: "Installing new ceiling fan", property: "Cedar Ridge · Unit 5", date: "Jun 19, 2026", status: "Completed" },
    { id: "WO-1291", title: "Annual AC maintenance inspection", property: "Westpark Office · Floor 2", date: "Jun 18, 2026", status: "Cancelled" },
  ],
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

// Mock Data for Property Services (Image 2 Figma specification with Toggle on/off)
const initialServiceCategories: PropertyServiceItem[] = [
  {
    id: "SERV-001",
    name: "Landscaping Service",
    category: "Exterior & Grounds",
    description: "Lawn care, tree trimming, irrigation & yard maintenance",
    prosAvailable: 24,
    enabled: true,
  },
  {
    id: "SERV-002",
    name: "Exterior Painting",
    category: "Painting & Coating",
    description: "Commercial & residential exterior wall painting & sealing",
    prosAvailable: 18,
    enabled: true,
  },
  {
    id: "SERV-003",
    name: "Interior Painting",
    category: "Painting & Coating",
    description: "Interior wall prep, drywall repair & finish painting",
    prosAvailable: 31,
    enabled: true,
  },
  {
    id: "SERV-004",
    name: "Plumbing Repair & Install",
    category: "Plumbing",
    description: "Leak detection, pipe replacement, drain clearing & fixtures",
    prosAvailable: 42,
    enabled: true,
  },
  {
    id: "SERV-005",
    name: "Electrical System Maintenance",
    category: "Electrical",
    description: "Wiring, circuit breaker repair, outlet install & lighting",
    prosAvailable: 29,
    enabled: true,
  },
  {
    id: "SERV-006",
    name: "HVAC Servicing & Repair",
    category: "HVAC",
    description: "Air conditioning, heating unit maintenance & duct cleaning",
    prosAvailable: 35,
    enabled: true,
  },
  {
    id: "SERV-007",
    name: "Roofing & Gutters",
    category: "Exterior & Grounds",
    description: "Roof inspection, shingle repair, gutter cleaning & leak fixes",
    prosAvailable: 16,
    enabled: false,
  },
  {
    id: "SERV-008",
    name: "Janitorial & Deep Cleaning",
    category: "Cleaning Services",
    description: "Move-in/move-out deep clean, carpet shampooing & sanitation",
    prosAvailable: 50,
    enabled: true,
  },
  {
    id: "SERV-009",
    name: "Pest Control & Extermination",
    category: "Specialized Services",
    description: "Termite treatment, rodent removal & preventative pest control",
    prosAvailable: 12,
    enabled: true,
  },
  {
    id: "SERV-010",
    name: "Pool & Spa Maintenance",
    category: "Exterior & Grounds",
    description: "Pool chemical balancing, pump filter repair & cleaning",
    prosAvailable: 8,
    enabled: false,
  },
  {
    id: "SERV-011",
    name: "Locksmith & Security Care",
    category: "Specialized Services",
    description: "Key duplication, electronic lock installation & emergency lockout",
    prosAvailable: 15,
    enabled: true,
  },
  {
    id: "SERV-012",
    name: "Appliance Repair",
    category: "Maintenance",
    description: "Refrigerator, dishwasher, washer/dryer diagnostics & repair",
    prosAvailable: 27,
    enabled: true,
  },
];

// Mock Data for Payout Requests
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

// Mock Data for Service Providers (Service Pro's) Tab
const initialServicePros: ServiceProItem[] = [
  { id: "PRO-801", name: "David Miller", company: "Fast Flow Plumbing", trade: "Plumbing Repair", rating: 4.9, completedJobs: 142, status: "Onboarded", phone: "(555) 234-5678", email: "david@fastflow.com" },
  { id: "PRO-802", name: "Marcus Vance", company: "ElectraCare Solutions", trade: "Electrical Maintenance", rating: 4.8, completedJobs: 98, status: "Onboarded", phone: "(555) 345-6789", email: "marcus@electracare.com" },
  { id: "PRO-803", name: "Sarah Jenkins", company: "ProCoat Painters LLC", trade: "Exterior & Interior Painting", rating: 4.7, completedJobs: 64, status: "Onboarded", phone: "(555) 456-7890", email: "sarah@procoat.com" },
  { id: "PRO-804", name: "Carlos Rodriguez", company: "Apex HVAC Systems", trade: "HVAC Servicing", rating: 4.9, completedJobs: 110, status: "Pending Approval", phone: "(555) 567-8901", email: "carlos@apexhvac.com" },
  { id: "PRO-805", name: "Tom Harrison", company: "GreenThumb Landscaping", trade: "Landscaping Service", rating: 4.5, completedJobs: 45, status: "Deactivated", phone: "(555) 678-9012", email: "tom@greenthumb.com" },
  { id: "PRO-806", name: "Elena Rostova", company: "CleanPro Services", trade: "Janitorial & Deep Cleaning", rating: 4.6, completedJobs: 78, status: "Rejected", phone: "(555) 789-0123", email: "elena@cleanpro.com" },
];

// Mock Data for Vendor Billing Tab
const initialVendorBatches: VendorBatchItem[] = [
  { batchId: "#BATCH-2026-08A", dateCreated: "Aug 20, 2026", totalVendors: 42, totalAmount: "$48,250.00", payoutMethod: "ACH Direct Deposit", status: "Ready for Payout" },
  { batchId: "#BATCH-2026-08B", dateCreated: "Aug 18, 2026", totalVendors: 28, totalAmount: "$32,100.00", payoutMethod: "ACH Direct Deposit", status: "Processing" },
  { batchId: "#BATCH-2026-07C", dateCreated: "Jul 31, 2026", totalVendors: 56, totalAmount: "$64,800.00", payoutMethod: "Wire Transfer", status: "Completed" },
  { batchId: "#BATCH-2026-07B", dateCreated: "Jul 15, 2026", totalVendors: 38, totalAmount: "$41,350.00", payoutMethod: "ACH Direct Deposit", status: "Completed" },
];

export default function DashboardOverviewPage() {
  const router = useRouter();
  const [selectedCardId, setSelectedCardId] = useState<OverviewCardType | null>(null);

  // Sub-Tab States
  const [workOrderSubTab, setWorkOrderSubTab] = useState<WorkOrderSubTab>("Active");
  const [propertySubTab, setPropertySubTab] = useState<PropertySubTab>("Properties List");
  const [disputeSubTab, setDisputeSubTab] = useState<DisputeSubTab>("Escalated Complaints");
  const [serviceProSubTab, setServiceProSubTab] = useState<ServiceProSubTab>("All");
  const [vendorBillingSubTab, setVendorBillingSubTab] = useState<VendorBillingSubTab>("All Batches");

  // Service Categories List & Search State (Image 2)
  const [servicesList, setServicesList] = useState<PropertyServiceItem[]>(initialServiceCategories);
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Service Pros State
  const [serviceProsList, setServiceProsList] = useState<ServiceProItem[]>(initialServicePros);

  // Vendor Batches State
  const [vendorBatchesList, setVendorBatchesList] = useState<VendorBatchItem[]>(initialVendorBatches);

  const handleGenerateReport = () => {
    toast.success("Portfolio performance report generated successfully!");
  };

  const toggleServiceStatus = (id: string, name: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setServicesList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: nextStatus } : s))
    );
    if (nextStatus) {
      toast.success(`${name} toggled ON (Active for Service Pros)`);
    } else {
      toast.error(`${name} toggled OFF (Disabled)`);
    }
  };

  const handleProStatusChange = (id: string, name: string, newStatus: ServiceProItem["status"]) => {
    setServiceProsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    toast.success(`Updated ${name} status to ${newStatus}`);
  };

  const handleProcessBatch = (batchId: string) => {
    setVendorBatchesList((prev) =>
      prev.map((b) => (b.batchId === batchId ? { ...b, status: "Processing" } : b))
    );
    toast.success(`Bulk payout ${batchId} processing initiated!`);
  };

  const activeCard = overviewCards.find((c) => c.id === selectedCardId);

  // Filtered Services for Modal
  const filteredServices = servicesList.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(serviceSearchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === "All" || s.category === selectedCategoryFilter;
    return matchesQuery && matchesCategory;
  });

  const categoriesList = ["All", ...Array.from(new Set(servicesList.map((s) => s.category)))];

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#8E25E3] font-bold text-sm">Welcome Admin!</span>
            <span className="text-xl">👋</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Your Central hub for open requests, pending approvals, and project updates.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleGenerateReport}
            className="px-5 py-3 bg-[#6B21A8] hover:bg-[#581c87] text-white font-medium text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {overviewCards.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white/90 border border-gray-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-purple-300 hover:shadow-xs transition-all duration-200"
            >
              <div>
                {/* Icon Badge */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor}`}
                >
                  <IconComp className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Big Number Value */}
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3 mb-0.5">
                  {card.value}
                </h2>

                {/* Metric Label */}
                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-3">
                  {card.label}
                </p>
              </div>

              {/* Bottom Click for Details Link */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    if (card.directLink) {
                      router.push(card.directLink);
                    } else {
                      setSelectedCardId(card.id);
                    }
                  }}
                  className={`text-xs font-semibold underline hover:opacity-80 transition-opacity cursor-pointer inline-flex items-center gap-1 ${card.linkColor}`}
                >
                  <span>Click for Details</span>
                  {card.directLink && <ExternalLink className="w-3 h-3 inline" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal Container */}
      {selectedCardId && activeCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-3xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">

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

            {/* 1. WORK ORDERS DETAILS (Sub-Tabs) */}
            {selectedCardId === "work-orders" && (
              <div className="space-y-4">
                {/* Sub-Tabs Navigation */}
                <div className="flex items-center gap-1.5 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200 overflow-x-auto">
                  {(["All", "Pending", "Active", "Completed", "Cancelled"] as WorkOrderSubTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setWorkOrderSubTab(tab)}
                      className={`flex-1 min-w-[70px] py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${workOrderSubTab === tab
                        ? "bg-[#8E25E3] text-white shadow-2xs"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                        }`}
                    >
                      {tab} ({workOrdersData[tab].length})
                    </button>
                  ))}
                </div>

                {/* Items List */}
                <div className="space-y-2.5">
                  {workOrdersData[workOrderSubTab].map((item) => (
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
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold ${item.status.includes("Active") || item.status.includes("Progress") || item.status.includes("Assigned")
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : item.status.includes("Pending") || item.status.includes("Awaiting")
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : item.status.includes("Completed") || item.status.includes("Verified")
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-red-100 text-red-700 border border-red-200"
                          }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/maintenance-requests")}
                    className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#8E25E3] font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View All Work Orders on Maintenance Requests Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. TOTAL PROPERTIES DETAILS */}
            {selectedCardId === "total-properties" && (
              <div className="space-y-4">
                {/* Sub-Tabs Navigation */}
                <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
                  {(["Properties List", "Total Units"] as PropertySubTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPropertySubTab(tab)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${propertySubTab === tab
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Properties List */}
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

                {/* Total Units Content */}
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

            {/* 3. PROPERTY PARTNERS DETAILS */}
            {selectedCardId === "property-partners" && (
              <div className="space-y-4">
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-amber-900">Onboarded Property Partners</h4>
                    <p className="text-xs text-amber-700 mt-0.5">523 verified real estate management partners & landlords</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg border border-amber-200">
                    523 Partners
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { company: "Apex Real Estate Group", contact: "Jessica Taylor", properties: "28 Properties", location: "Dallas, TX", status: "Active" },
                    { company: "Vanguard Management", contact: "Michael Scott", properties: "45 Properties", location: "Chicago, IL", status: "Active" },
                    { company: "Summit Heights Realty", contact: "Amanda Vance", properties: "19 Properties", location: "Denver, CO", status: "Active" },
                    { company: "Metro Property Partners", contact: "David Miller", properties: "34 Properties", location: "Austin, TX", status: "Active" },
                  ].map((partner, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900">{partner.company}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Contact: {partner.contact} · {partner.location} · {partner.properties}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {partner.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/property-managers")}
                    className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Manage Property Partners Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 4. SERVICE CATEGORIES (Image 2 Figma Spec with Toggle Switch) */}
            {selectedCardId === "service-categories" && (
              <div className="space-y-4">
                {/* Search & Filter Header */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-200">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={serviceSearchQuery}
                      onChange={(e) => setServiceSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-hidden focus:border-[#8E25E3]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                    {categoriesList.slice(0, 4).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategoryFilter(cat)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer shrink-0 ${selectedCategoryFilter === cat
                          ? "bg-[#8E25E3] text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtext info */}
                <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-3 text-xs text-purple-900 flex items-center justify-between">
                  <div>
                    <span className="font-bold">Property Service Status Management: </span>
                    <span className="text-purple-700">Toggle ON to enable services for active Service Pros on the platform.</span>
                  </div>
                  <span className="text-xs font-bold text-[#8E25E3] shrink-0 ml-2">
                    {servicesList.filter((s) => s.enabled).length} Enabled
                  </span>
                </div>

                {/* Services List Table */}
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-purple-200 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900">{service.name}</h4>
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-normal">{service.description}</p>
                        <p className="text-[11px] font-semibold text-[#8E25E3]">
                          ⚡ {service.prosAvailable} Service Pros Available
                        </p>
                      </div>

                      {/* Toggle Switch */}
                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <span
                          className={`text-xs font-bold ${service.enabled ? "text-emerald-600" : "text-gray-400"
                            }`}
                        >
                          {service.enabled ? "Active (ON)" : "Disabled (OFF)"}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleServiceStatus(service.id, service.name, service.enabled)}
                          className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${service.enabled ? "bg-emerald-500" : "bg-gray-300"
                            }`}
                          aria-label={`Toggle ${service.name}`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${service.enabled ? "translate-x-6" : "translate-x-0"
                              }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredServices.length === 0 && (
                    <div className="text-center py-8 text-xs text-gray-500">
                      No services match your search terms.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. PAYOUT REQUEST DETAILS */}
            {selectedCardId === "payout-requests" && (
              <div className="space-y-3">
                {pendingPayoutsList.map((payout) => (
                  <div
                    key={payout.payoutId}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#8E25E3]">{payout.payoutId}</span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                          {payout.category}
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${payout.status === "Pending"
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

                    <div className="flex items-center gap-1.5 text-xs text-gray-800 font-medium">
                      <span>Service Provider:</span>
                      <span className="font-bold text-gray-900">{payout.vendorName}</span>
                      {payout.isVerified && (
                        <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200 text-xs">
                      <div>
                        <span className="text-gray-500 font-normal">Work Order: </span>
                        <button
                          type="button"
                          onClick={() => router.push("/maintenance-requests")}
                          className="font-semibold text-[#8E25E3] underline hover:text-[#7b1bd1] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>{payout.workOrderNo} (View Job)</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
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

            {/* 6. DISPUTE CENTER DETAILS */}
            {selectedCardId === "dispute-center" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
                  {(["Escalated Complaints", "Client-Vendor Conflicts"] as DisputeSubTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setDisputeSubTab(tab)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${disputeSubTab === tab
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {disputeCenterData[disputeSubTab].map((item) => (
                    <div key={item.id} className="bg-blue-50/40 border border-blue-200/80 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600">{item.id}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${item.status === "Escalated" || item.status === "Disputed"
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

            {/* 7. SERVICE PROVIDERS (SERVICE PRO'S) DETAILS (Image 1 Requirement) */}
            {selectedCardId === "service-providers" && (
              <div className="space-y-4">
                {/* Subtabs */}
                <div className="flex items-center gap-1.5 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200 overflow-x-auto">
                  {(["All", "Onboarded", "Pending Approval", "Rejected", "Deactivated"] as ServiceProSubTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setServiceProSubTab(tab)}
                      className={`flex-1 min-w-[90px] py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${serviceProSubTab === tab
                        ? "bg-[#8E25E3] text-white shadow-2xs"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {serviceProsList
                    .filter((pro) => serviceProSubTab === "All" || pro.status === serviceProSubTab)
                    .map((pro) => (
                      <div
                        key={pro.id}
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#8E25E3]">{pro.id}</span>
                            <h4 className="text-sm font-bold text-gray-900">{pro.name}</h4>
                            <span className="text-xs text-gray-500 font-medium">({pro.company})</span>
                          </div>

                          <p className="text-xs text-gray-600">
                            Trade: <strong>{pro.trade}</strong> · Rating: <strong className="text-amber-600">★ {pro.rating}</strong> · Completed Jobs: <strong>{pro.completedJobs}</strong>
                          </p>

                          <p className="text-xs text-gray-500">
                            Phone: {pro.phone} · Email: {pro.email}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${pro.status === "Onboarded"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : pro.status === "Pending Approval"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : pro.status === "Rejected"
                                  ? "bg-red-100 text-red-700 border border-red-300"
                                  : "bg-gray-200 text-gray-700 border border-gray-300"
                              }`}
                          >
                            {pro.status}
                          </span>

                          {pro.status === "Pending Approval" && (
                            <button
                              type="button"
                              onClick={() => handleProStatusChange(pro.id, pro.name, "Onboarded")}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                            >
                              Approve
                            </button>
                          )}

                          {pro.status === "Onboarded" && (
                            <button
                              type="button"
                              onClick={() => handleProStatusChange(pro.id, pro.name, "Deactivated")}
                              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                            >
                              Deactivate
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/provider-applicants")}
                    className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#8E25E3] font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Provider Applicants Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 8. VENDOR BILLING DETAILS (Image 1 Requirement - Bulk Payment Processing) */}
            {selectedCardId === "vendor-billing" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
                  {(["All Batches", "Ready for Payout", "Processing", "Completed"] as VendorBillingSubTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setVendorBillingSubTab(tab)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${vendorBillingSubTab === tab
                        ? "bg-[#8E25E3] text-white shadow-2xs"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {vendorBatchesList
                    .filter((b) => vendorBillingSubTab === "All Batches" || b.status === vendorBillingSubTab)
                    .map((batch) => (
                      <div
                        key={batch.batchId}
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#8E25E3]">{batch.batchId}</span>
                            <span className="text-xs text-gray-500 font-medium">Created: {batch.dateCreated}</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            Vendors Included: <strong>{batch.totalVendors} Service Pros</strong> · Payment Method: <strong>{batch.payoutMethod}</strong>
                          </p>
                          <p className="text-sm font-bold text-gray-900">Total Bulk Amount: {batch.totalAmount}</p>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${batch.status === "Ready for Payout"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : batch.status === "Processing"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-blue-100 text-blue-800 border border-blue-300"
                              }`}
                          >
                            {batch.status}
                          </span>

                          {batch.status === "Ready for Payout" && (
                            <button
                              type="button"
                              onClick={() => handleProcessBatch(batch.batchId)}
                              className="px-3.5 py-1.5 bg-[#8E25E3] hover:bg-[#7b1bd1] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs"
                            >
                              Process Bulk Payout
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/invoices")}
                    className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Open Invoices & Payments Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
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
