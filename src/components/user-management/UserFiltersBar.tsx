"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRoleFilter: string;
  setSelectedRoleFilter: (role: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (status: string) => void;
  filteredCount: number;
  totalCount: number;
}

export default function UserFiltersBar({
  searchQuery,
  setSearchQuery,
  selectedRoleFilter,
  setSelectedRoleFilter,
  selectedStatusFilter,
  setSelectedStatusFilter,
  filteredCount,
  totalCount,
}: UserFiltersBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Search Box */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-md text-xs font-medium text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/40 transition-colors"
          />
        </div>

        {/* Role Filter Dropdown */}
        <Select value={selectedRoleFilter} onValueChange={setSelectedRoleFilter}>
          <SelectTrigger className="w-[180px] bg-[#FFFFFF] border-[#E5E7EB] py-5.5 rounded-md text-xs font-medium text-gray-700 h-12 focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
            <SelectItem value="All Roles">All Roles</SelectItem>
            <SelectItem value="Service Provider">Service Provider</SelectItem>
            <SelectItem value="Contractor">Contractor</SelectItem>
            <SelectItem value="Property Manager">Property Manager</SelectItem>
            <SelectItem value="Property Owner">Property Owner</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter Dropdown */}
        <Select value={selectedStatusFilter} onValueChange={setSelectedStatusFilter}>
          <SelectTrigger className="w-[150px] bg-[#FFFFFF] border-[#E5E7EB] rounded-md py-5.5 text-xs font-medium text-gray-700 h-[46px] focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
            <SelectItem value="All Statuses">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Counter Badge */}
      <div className="text-xs font-medium text-gray-500 shrink-0">
        {filteredCount} of {totalCount} users
      </div>
    </div>
  );
}
