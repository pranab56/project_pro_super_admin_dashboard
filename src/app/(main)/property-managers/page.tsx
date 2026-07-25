"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { initialPartnersList, PropertyPartner } from "@/components/property-managers/types";
import PropertyManagersHeader from "@/components/property-managers/PropertyManagersHeader";
import PropertyManagersStats from "@/components/property-managers/PropertyManagersStats";
import PropertyManagersFiltersBar from "@/components/property-managers/PropertyManagersFiltersBar";
import PropertyManagersTable from "@/components/property-managers/PropertyManagersTable";
import ViewPartnerModal from "@/components/property-managers/ViewPartnerModal";
import EditPartnerModal from "@/components/property-managers/EditPartnerModal";
import DeletePartnerModal from "@/components/property-managers/DeletePartnerModal";

export default function PropertyManagersPage() {
  const [partners, setPartners] = useState<PropertyPartner[]>(initialPartnersList);
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Modals
  const [viewPartner, setViewPartner] = useState<PropertyPartner | null>(null);
  const [editPartner, setEditPartner] = useState<PropertyPartner | null>(null);
  const [deletePartner, setDeletePartner] = useState<PropertyPartner | null>(null);

  // Filtered Partners
  const filteredPartners = partners.filter((p) => {
    const matchesSearch =
      p.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlan = planFilter === "All Plans" || p.plan === planFilter;
    const matchesStatus = statusFilter === "All Statuses" || p.status === statusFilter;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleDeleteConfirm = () => {
    if (!deletePartner) return;
    setPartners((prev) => prev.filter((p) => p.id !== deletePartner.id));
    toast.error(`Partner ${deletePartner.propertyName} deleted.`);
    setDeletePartner(null);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPartner) return;
    setPartners((prev) => prev.map((p) => (p.id === editPartner.id ? editPartner : p)));
    toast.success(`Updated details for ${editPartner.propertyName}`);
    setEditPartner(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PropertyManagersHeader />

      {/* Stats Cards */}
      <PropertyManagersStats />

      {/* Search and Filters Bar */}
      <PropertyManagersFiltersBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        planFilter={planFilter}
        setPlanFilter={setPlanFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filteredCount={filteredPartners.length}
      />

      {/* Table Component */}
      <PropertyManagersTable
        partners={filteredPartners}
        setViewPartner={setViewPartner}
        setEditPartner={setEditPartner}
        setDeletePartner={setDeletePartner}
      />

      {/* View Partner Details Modal */}
      <ViewPartnerModal
        partner={viewPartner}
        onClose={() => setViewPartner(null)}
      />

      {/* Edit Partner Modal */}
      <EditPartnerModal
        partner={editPartner}
        setPartner={setEditPartner}
        onSave={handleEditSave}
        onClose={() => setEditPartner(null)}
      />

      {/* Delete Partner Modal */}
      <DeletePartnerModal
        partner={deletePartner}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeletePartner(null)}
      />
    </div>
  );
}
