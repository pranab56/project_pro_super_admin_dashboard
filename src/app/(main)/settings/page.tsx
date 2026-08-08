"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { SettingsTab } from "@/components/settings/types";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsTabNavigation from "@/components/settings/SettingsTabNavigation";
import GeneralSettingsTab from "@/components/settings/GeneralSettingsTab";
import SecuritySettingsTab from "@/components/settings/SecuritySettingsTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("General");

  // General Settings Account Form State
  const [username, setUsername] = useState("ProjeXPro_User123");
  const [fullName, setFullName] = useState("Alex Morgan");
  const [emailAddress, setEmailAddress] = useState("user@company.com");
  const [systemRole, setSystemRole] = useState("Super Admin");
  const [isAccountActive, setIsAccountActive] = useState(true);

  const handleSaveChanges = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // API integration point for updating user account details & status
    toast.success("Account settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SettingsHeader onSaveChanges={() => handleSaveChanges()} />

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side Tab Navigation */}
        <SettingsTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Right Side Content Box */}
        {activeTab === "General" ? (
          <GeneralSettingsTab
            username={username}
            setUsername={setUsername}
            fullName={fullName}
            setFullName={setFullName}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            systemRole={systemRole}
            setSystemRole={setSystemRole}
            isAccountActive={isAccountActive}
            setIsAccountActive={setIsAccountActive}
            onSave={handleSaveChanges}
          />
        ) : (
          <SecuritySettingsTab />
        )}
      </div>
    </div>
  );
}