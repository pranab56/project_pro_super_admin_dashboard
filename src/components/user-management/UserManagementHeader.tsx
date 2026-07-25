"use client";

import React from "react";

export default function UserManagementHeader() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
        User Management
      </h1>
      <p className="text-sm text-gray-500 font-medium mt-1">
        Manage access, activity, and assign roles.
      </p>
    </div>
  );
}
