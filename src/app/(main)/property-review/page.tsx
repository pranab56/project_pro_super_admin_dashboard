"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { initialPropertiesList, PropertySubmission, ReviewStatus } from "@/components/property-review/types";
import PropertyReviewHeader from "@/components/property-review/PropertyReviewHeader";
import PropertyReviewTabs from "@/components/property-review/PropertyReviewTabs";
import PropertyReviewGrid from "@/components/property-review/PropertyReviewGrid";
import PropertyReviewModal from "@/components/property-review/PropertyReviewModal";

export default function PropertyReviewPage() {
  const [properties, setProperties] = useState<PropertySubmission[]>(initialPropertiesList);
  const [activeTab, setActiveTab] = useState<"All" | ReviewStatus>("All");
  const [selectedProperty, setSelectedProperty] = useState<PropertySubmission | null>(null);

  const handleApprove = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p))
    );
    toast.success("Property approved!");
    setSelectedProperty(null);
  };

  const handleReject = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p))
    );
    toast.error("Property rejected.");
    setSelectedProperty(null);
  };

  const filteredProperties = properties.filter((p) => {
    if (activeTab === "All") return true;
    return p.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <PropertyReviewHeader />

      {/* Tabs Bar */}
      <PropertyReviewTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        properties={properties}
      />

      {/* Properties Grid */}
      <PropertyReviewGrid
        properties={filteredProperties}
        activeTab={activeTab}
        setSelectedProperty={setSelectedProperty}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />

      {/* Details Modal */}
      <PropertyReviewModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />
    </div>
  );
}
