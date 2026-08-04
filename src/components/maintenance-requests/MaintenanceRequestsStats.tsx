"use client";

import React from "react";
import { ServiceRequestItem } from "./types";

interface MaintenanceRequestsStatsProps {
  requests: ServiceRequestItem[];
}

export default function MaintenanceRequestsStats({ requests }: MaintenanceRequestsStatsProps) {
  const criticalCount = requests.filter((r) => r.priority === "Critical").length;
  const inProgressCount = requests.filter((r) => r.status === "In Progress").length;
  const pendingAssignmentCount = requests.filter((r) => r.contractor === "Unassigned" || r.status === "Pending").length;
  const specializedCount = requests.filter((r) => r.isSpecialized || !!r.rateBonus).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* Card 1: Critical */}
      <div className="bg-[#F8F8FA] border border-gray-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F87171] leading-none">{criticalCount}</h2>
        <p className="text-xs sm:text-sm font-medium text-gray-500 mt-2.5">Critical</p>
      </div>

      {/* Card 2: In Progress */}
      <div className="bg-[#F8F8FA] border border-gray-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#3B82F6] leading-none">{inProgressCount}</h2>
        <p className="text-xs sm:text-sm font-medium text-gray-500 mt-2.5">In Progress</p>
      </div>

      {/* Card 3: Pending Assignment */}
      <div className="bg-[#F8F8FA] border border-gray-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F59E0B] leading-none">{pendingAssignmentCount}</h2>
        <p className="text-xs sm:text-sm font-medium text-gray-500 mt-2.5">Pending Assignment</p>
      </div>

      {/* Card 4: Specialized Rate Jobs */}
      <div className="bg-[#F8F8FA] border border-gray-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#8E25E3] leading-none">{specializedCount}</h2>
        <p className="text-xs sm:text-sm font-medium text-gray-500 mt-2.5">Specialized Rate Jobs</p>
      </div>
    </div>
  );
}

