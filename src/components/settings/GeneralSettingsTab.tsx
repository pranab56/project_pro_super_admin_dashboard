"use client";

import React from "react";
import { CheckCircle2, ShieldAlert, User, Mail, Shield, AtSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

interface GeneralSettingsTabProps {
  username: string;
  setUsername: (val: string) => void;
  fullName: string;
  setFullName: (val: string) => void;
  emailAddress: string;
  setEmailAddress: (val: string) => void;
  systemRole: string;
  setSystemRole: (val: string) => void;
  isAccountActive: boolean;
  setIsAccountActive: (val: boolean) => void;
  onSave: (e?: React.FormEvent) => void;
}

export default function GeneralSettingsTab({
  username,
  setUsername,
  fullName,
  setFullName,
  emailAddress,
  setEmailAddress,
  systemRole,
  setSystemRole,
  isAccountActive,
  setIsAccountActive,
  onSave,
}: GeneralSettingsTabProps) {
  const handleToggleAccountStatus = () => {
    const nextState = !isAccountActive;
    setIsAccountActive(nextState);
    if (!nextState) {
      toast.error("Account status changed to SUSPENDED.");
    } else {
      toast.success("Account status reactivated to ACTIVE.");
    }
  };

  return (
    <div className="lg:col-span-9 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
      <form onSubmit={onSave} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Personal Account & General Settings</h2>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              Manage personal account details, login information, system role, and account status
            </p>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-colors self-start sm:self-auto"
          >
            Save Changes
          </button>
        </div>

        {/* Form Inputs Grid */}
        <div className="space-y-5">
          {/* Row 1: Platform Username & Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <AtSign className="w-3.5 h-3.5 text-gray-400" />
                <span>Platform Username</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. ProjeXPro_User123"
                className="w-full px-4 py-3 bg-white border border-gray-300/80 rounded-md text-xs font-medium text-gray-900 focus:ring-2 focus:ring-[#8E25E3]/40 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full px-4 py-3 bg-white border border-gray-300/80 rounded-md text-xs font-medium text-gray-900 focus:ring-2 focus:ring-[#8E25E3]/40 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Login Email Address & System Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>Login Email Address</span>
              </label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="e.g. user@company.com"
                className="w-full px-4 py-3 bg-white border border-gray-300/80 rounded-md text-xs font-medium text-gray-900 focus:ring-2 focus:ring-[#8E25E3]/40 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gray-400" />
                <span>System Role</span>
              </label>
              <Select value={systemRole} onValueChange={setSystemRole}>
                <SelectTrigger className="w-full bg-white border border-gray-300/80 rounded-md h-[42px] px-4 text-xs font-medium text-gray-900 focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer">
                  <SelectValue placeholder="Select System Role" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Property Manager">Property Manager</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Support Staff">Support Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Account Status Control (ACTIVE / SUSPENDED Toggle) */}
          <div className="pt-4 border-t border-gray-200">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900">Account Status:</span>
                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      isAccountActive
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    {isAccountActive ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>ACTIVE</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                        <span>SUSPENDED</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-normal">
                  {isAccountActive
                    ? "The account is currently active and has full access to the platform."
                    : "The account is suspended. Login access and system privileges are restricted."}
                </p>
              </div>

              {/* Suspend / Activate Toggle Control */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold text-gray-700">
                  {isAccountActive ? "Active" : "Suspended"}
                </span>
                <button
                  type="button"
                  onClick={handleToggleAccountStatus}
                  className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                    isAccountActive ? "bg-emerald-500 justify-end" : "bg-red-500 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
