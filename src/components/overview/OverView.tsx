"use client";

import React from "react";
import RevenueChart from "./RevenueChart";
import ServicesChart from "./ServicesChart";
import RecentContractor from "./RecentContractor";
import PendingProperty from "./PendingProperty";


export default function Overview(): React.ReactElement {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Manage Properties, payments, and job site request
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <RevenueChart />
        <ServicesChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <RecentContractor />
        <PendingProperty />
      </div>
    </div>
  );
}