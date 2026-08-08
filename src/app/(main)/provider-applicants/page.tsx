"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FilterTab, initialApplicantsList, ProviderApplicantItem } from "@/components/provider-applicants/types";
import ProviderApplicantsHeader from "@/components/provider-applicants/ProviderApplicantsHeader";
import ProviderApplicantsFilterBar from "@/components/provider-applicants/ProviderApplicantsFilterBar";
import ProviderApplicantsList from "@/components/provider-applicants/ProviderApplicantsList";

export default function ProviderApplicantsPage() {
  const [applicants, setApplicants] = useState<ProviderApplicantItem[]>(initialApplicantsList);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCardId, setExpandedCardId] = useState<string | null>("PROV-101");

  const handleApprove = (id: string, name: string) => {
    setApplicants((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item))
    );
    toast.success(`${name} approved successfully!`);
  };

  const handleReject = (id: string, name: string) => {
    setApplicants((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item))
    );
    toast.error(`${name} application rejected.`);
  };

  const handleActionRequired = (id: string, name: string) => {
    setApplicants((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Under Review" } : item))
    );
    toast.error(`Requested additional information from ${name}.`);
  };

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  // Filter List
  const filteredApplicants = applicants.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      item.trade.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.serviceRequestId.toLowerCase().includes(q) ||
      item.workOrderId.toLowerCase().includes(q) ||
      item.jobId.toLowerCase().includes(q);

    let matchesTab = true;
    if (activeTab === "Pending") matchesTab = item.status === "Pending";
    else if (activeTab === "Approved") matchesTab = item.status === "Approved";
    else if (activeTab === "Rejected") matchesTab = item.status === "Rejected";
    else if (activeTab === "Action Required") matchesTab = item.status === "Under Review" || item.status === "Pending";

    return matchesSearch && matchesTab;
  });

  // Calculate Tab Counts
  const counts = {
    all: applicants.length,
    approved: applicants.filter((a) => a.status === "Approved").length,
    pending: applicants.filter((a) => a.status === "Pending").length,
    actionRequired: applicants.filter((a) => a.status === "Pending" || a.status === "Under Review").length,
    rejected: applicants.filter((a) => a.status === "Rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProviderApplicantsHeader pendingCount={counts.pending} />

      {/* Filter Tabs & Search Bar */}
      <ProviderApplicantsFilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        counts={counts}
      />

      {/* Cards List */}
      <ProviderApplicantsList
        applicants={filteredApplicants}
        expandedCardId={expandedCardId}
        toggleExpand={toggleExpand}
        handleApprove={handleApprove}
        handleReject={handleReject}
        handleActionRequired={handleActionRequired}
      />
    </div>
  );
}
