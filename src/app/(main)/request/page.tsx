"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FilterTab,
  initialRequestsList,
  JobStatus,
  PriorityLevel,
  ServiceCategory,
  ServiceRequestItem,
} from "@/components/maintenance-requests/types";
import MaintenanceRequestsHeader from "@/components/maintenance-requests/MaintenanceRequestsHeader";
import MaintenanceRequestsStats from "@/components/maintenance-requests/MaintenanceRequestsStats";
import MaintenanceRequestsFilterBar from "@/components/maintenance-requests/MaintenanceRequestsFilterBar";
import MaintenanceRequestsTable from "@/components/maintenance-requests/MaintenanceRequestsTable";
import JobRateModal from "@/components/maintenance-requests/JobRateModal";
import CreateServiceRequestModal from "@/components/maintenance-requests/CreateServiceRequestModal";

export default function MaintenanceRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequestItem[]>(initialRequestsList);
  const [activeTab, setActiveTab] = useState<FilterTab>("All Requests");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<ServiceRequestItem | null>(null);

  // Modal State for Specialized Rate
  const [isSpecializedRateActive, setIsSpecializedRateActive] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<"Percentage" | "Flat Amount">("Percentage");
  const [rateValue, setRateValue] = useState<string>("");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [assignedContractor, setAssignedContractor] = useState<string>("");

  // New Request Modal State
  const [showNewRequestModal, setShowNewRequestModal] = useState<boolean>(false);
  const [newProperty, setNewProperty] = useState("");
  const [newIssue, setNewIssue] = useState("");
  const [newType, setNewType] = useState<ServiceCategory>("Plumbing");
  const [newPriority, setNewPriority] = useState<PriorityLevel>("Medium");
  const [newBasePay, setNewBasePay] = useState<number>(200);

  // Open Job Modal Handler
  const handleOpenJobModal = (job: ServiceRequestItem) => {
    setSelectedJob(job);
    setAssignedContractor(job.contractor);
    setIsSpecializedRateActive(job.isSpecialized || !!job.rateBonus);
    if (job.rateBonus) {
      if (job.rateBonus.includes("%")) {
        setPaymentType("Percentage");
      } else {
        setPaymentType("Flat Amount");
      }
      setRateValue(job.rateBonus.replace(/[^0-9.]/g, ""));
    } else {
      setRateValue("");
    }
    setSelectedReason("");
  };

  const handleSaveJob = (updatedJob: {
    status: JobStatus;
    etaDate: string;
    contractor: string;
    basePay: number;
    isSpecialized: boolean;
    paymentType: "Percentage" | "Flat Amount";
    rateValue: string;
    selectedReason: string;
  }) => {
    if (!selectedJob) return;

    let bonusStr: string | undefined = undefined;
    let finalPay = updatedJob.basePay;

    if (updatedJob.isSpecialized && updatedJob.rateValue) {
      const valNum = parseFloat(updatedJob.rateValue) || 0;
      if (updatedJob.paymentType === "Percentage") {
        bonusStr = `+${valNum}%`;
        finalPay = updatedJob.basePay + (updatedJob.basePay * valNum) / 100;
      } else {
        bonusStr = `+$${valNum}`;
        finalPay = updatedJob.basePay + valNum;
      }
    }

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedJob.id
          ? {
              ...r,
              status: updatedJob.status,
              etaDate: updatedJob.etaDate,
              contractor: updatedJob.contractor,
              basePay: updatedJob.basePay,
              isSpecialized: updatedJob.isSpecialized,
              rateBonus: bonusStr,
              finalPayCalculated: updatedJob.isSpecialized ? finalPay : undefined,
            }
          : r
      )
    );

    toast.success(`Job ${selectedJob.id} updated successfully!`);
    setSelectedJob(null);
  };

  const handleCreateNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProperty || !newIssue) {
      toast.error("Please fill in property and issue details");
      return;
    }

    const newId = `SR-${Math.floor(1299 + Math.random() * 100)}`;
    const newReq: ServiceRequestItem = {
      id: newId,
      date: "Jun 25, 2026",
      property: newProperty,
      address: `${newProperty}, Unit 1A`,
      issue: newIssue,
      type: newType,
      contractor: "Unassigned",
      priority: newPriority,
      status: "Pending",
      basePay: newBasePay,
      notes: "Newly submitted maintenance request.",
      etaDate: "Jun 28, 2026",
      isSpecialized: false,
    };

    setRequests([newReq, ...requests]);
    toast.success(`New request ${newId} created!`);
    setShowNewRequestModal(false);
    setNewProperty("");
    setNewIssue("");
  };

  // Filtering
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.contractor.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTab = true;
    if (activeTab === "Pending") matchesTab = r.status === "Pending";
    else if (activeTab === "In Progress") matchesTab = r.status === "In Progress" || r.status === "Assigned";
    else if (activeTab === "Scheduled") matchesTab = r.status === "Assigned";
    else if (activeTab === "Completed") matchesTab = r.status === "Completed";
    else if (activeTab === "Cancelled") matchesTab = r.status === "Cancelled";

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <MaintenanceRequestsHeader onOpenNewRequest={() => setShowNewRequestModal(true)} />

      {/* Stats Cards */}
      <MaintenanceRequestsStats requests={requests} />

      {/* Filter Tabs & Search Bar */}
      <MaintenanceRequestsFilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        requests={requests}
      />

      {/* Table */}
      <MaintenanceRequestsTable
        requests={filteredRequests}
        handleOpenJobModal={handleOpenJobModal}
      />

      {/* Job & Specialized Rate Modal */}
      <JobRateModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onSave={handleSaveJob}
        assignedContractor={assignedContractor}
        setAssignedContractor={setAssignedContractor}
        isSpecializedRateActive={isSpecializedRateActive}
        setIsSpecializedRateActive={setIsSpecializedRateActive}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        rateValue={rateValue}
        setRateValue={setRateValue}
        selectedReason={selectedReason}
        setSelectedReason={setSelectedReason}
      />

      {/* Create New Service Request Modal */}
      <CreateServiceRequestModal
        show={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        onSubmit={handleCreateNewRequest}
        newProperty={newProperty}
        setNewProperty={setNewProperty}
        newIssue={newIssue}
        setNewIssue={setNewIssue}
        newType={newType}
        setNewType={setNewType}
        newPriority={newPriority}
        setNewPriority={setNewPriority}
        newBasePay={newBasePay}
        setNewBasePay={setNewBasePay}
      />
    </div>
  );
}

