"use client";

import React, { useState, useEffect } from "react";
import { X, MapPin, Calendar, Key, Sliders } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceRequestItem, JobStatus } from "./types";

interface JobRateModalProps {
  job: ServiceRequestItem | null;
  onClose: () => void;
  onSave: (updatedJob: {
    status: JobStatus;
    etaDate: string;
    contractor: string;
    basePay: number;
    isSpecialized: boolean;
    paymentType: "Percentage" | "Flat Amount";
    rateValue: string;
    selectedReason: string;
  }) => void;
  assignedContractor: string;
  setAssignedContractor: (contractor: string) => void;
  isSpecializedRateActive: boolean;
  setIsSpecializedRateActive: (active: boolean) => void;
  paymentType: "Percentage" | "Flat Amount";
  setPaymentType: (type: "Percentage" | "Flat Amount") => void;
  rateValue: string;
  setRateValue: (val: string) => void;
  selectedReason: string;
  setSelectedReason: (reason: string) => void;
}

export default function JobRateModal({
  job,
  onClose,
  onSave,
  assignedContractor,
  setAssignedContractor,
  isSpecializedRateActive,
  setIsSpecializedRateActive,
  paymentType,
  setPaymentType,
  rateValue,
  setRateValue,
  selectedReason,
  setSelectedReason,
}: JobRateModalProps) {
  const [currentStatus, setCurrentStatus] = useState<JobStatus>("In Progress");
  const [currentEta, setCurrentEta] = useState<string>("Jun 27, 2026");
  const [basePayInput, setBasePayInput] = useState<number>(250);
  const [customReasonInput, setCustomReasonInput] = useState<string>("");

  useEffect(() => {
    if (job) {
      setCurrentStatus(job.status);
      setCurrentEta(job.etaDate || "Jun 27, 2026");
      setBasePayInput(job.basePay);
      setCustomReasonInput(selectedReason);
    }
  }, [job, selectedReason]);

  if (!job) return null;

  const quickReasons = [
    "Certified Electrician",
    "Licensed Plumber",
    "Emergency Service",
    "After Hours",
    "Hazardous Materials",
    "Specialized Equipment",
  ];

  const numRateVal = parseFloat(rateValue) || 0;
  let additionalPay = 0;
  let additionLabel = "";

  if (isSpecializedRateActive && numRateVal > 0) {
    if (paymentType === "Percentage") {
      additionalPay = (basePayInput * numRateVal) / 100;
      additionLabel = `+${numRateVal}%`;
    } else {
      additionalPay = numRateVal;
      additionLabel = `+$${numRateVal}`;
    }
  }

  const finalPayout = isSpecializedRateActive ? basePayInput + additionalPay : basePayInput;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      status: currentStatus,
      etaDate: currentEta,
      contractor: assignedContractor,
      basePay: basePayInput,
      isSpecialized: isSpecializedRateActive,
      paymentType,
      rateValue,
      selectedReason: customReasonInput || selectedReason,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-gray-200/80 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200/80">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{job.id}</h2>
            
            {/* Status Badge */}
            <span className="px-2.5 py-0.5 bg-blue-100/90 text-[#2563EB] rounded-full text-xs font-semibold flex items-center gap-1">
              <Key className="w-3 h-3 text-[#2563EB]" />
              {currentStatus}
            </span>

            {/* Priority Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                job.priority === "Critical"
                  ? "bg-red-100 text-red-600"
                  : job.priority === "High"
                  ? "bg-amber-100 text-amber-700"
                  : job.priority === "Medium"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {job.priority}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200/80 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: JOB DETAILS */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">JOB DETAILS</h3>

            {/* Property */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">PROPERTY</p>
              <h4 className="text-sm font-bold text-gray-900 mt-0.5">{job.property}</h4>
              <p className="text-xs text-gray-500 font-normal mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{job.address}</span>
              </p>
            </div>

            {/* Service Type & Submitted */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">SERVICE TYPE</p>
                <div className="flex items-center gap-1.5 mt-1 font-semibold text-xs text-[#2563EB]">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  <span>{job.type}</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">SUBMITTED</p>
                <div className="flex items-center gap-1.5 mt-1 font-normal text-xs text-gray-700">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{job.date}</span>
                </div>
              </div>
            </div>

            {/* Reported Issue */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">REPORTED ISSUE</p>
              <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">{job.issue}</p>
            </div>

            {/* Notes */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">NOTES</p>
              <div className="bg-gray-100/70 border border-gray-200/80 rounded-2xl p-3.5 text-xs text-gray-700 font-normal leading-relaxed">
                {job.notes || "Tenant reports water pooling under the sink. Has been ongoing for 3 days."}
              </div>
            </div>

            {/* Status & ETA Inputs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                  STATUS
                </label>
                <Select
                  value={currentStatus}
                  onValueChange={(val) => setCurrentStatus(val as JobStatus)}
                >
                  <SelectTrigger className="w-full bg-gray-100/70 border border-gray-200 rounded-lg h-9 px-3 text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer shadow-none">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg text-xs font-medium text-gray-800">
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                  ETA
                </label>
                <input
                  type="text"
                  value={currentEta}
                  onChange={(e) => setCurrentEta(e.target.value)}
                  className="w-full bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/40 h-9"
                  placeholder="Jun 27, 2026"
                />
              </div>
            </div>
          </div>

          {/* Right Column: ASSIGNMENT & PAYOUT */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">ASSIGNMENT & PAYOUT</h3>

            {/* Assign Contractor */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                ASSIGN CONTRACTOR
              </label>
              <Select
                value={assignedContractor}
                onValueChange={setAssignedContractor}
              >
                <SelectTrigger className="w-full bg-gray-100/70 border border-gray-200 rounded-lg h-9 px-3.5 text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-[#8E25E3]/40 cursor-pointer shadow-none">
                  <SelectValue placeholder="Select contractor" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg text-xs font-medium text-gray-800">
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                  <SelectItem value="Nina Patel">Nina Patel</SelectItem>
                  <SelectItem value="Lisa Park">Lisa Park</SelectItem>
                  <SelectItem value="Tom Wilson">Tom Wilson</SelectItem>
                  <SelectItem value="Alex Kumar">Alex Kumar</SelectItem>
                  <SelectItem value="Carlos Rivera">Carlos Rivera</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Base Payment */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                BASE PAYMENT
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">$</span>
                <input
                  type="number"
                  value={basePayInput}
                  onChange={(e) => setBasePayInput(Number(e.target.value))}
                  className="w-full bg-gray-100/70 border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/40"
                />
              </div>
            </div>

            {/* Specialized Job Rate Container */}
            <div
              className={`rounded-2xl p-4 transition-all space-y-3.5 ${
                isSpecializedRateActive
                  ? "border-2 border-[#8E25E3] bg-purple-50/40"
                  : "border border-gray-200 bg-gray-100/50"
              }`}
            >
              {/* Header inside container */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className={`w-4 h-4 ${isSpecializedRateActive ? "text-[#8E25E3]" : "text-gray-400"}`} />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Specialized Job Rate</h4>
                    <p className="text-[11px] text-gray-500 font-normal">
                      {isSpecializedRateActive ? "Active — additional pay applied" : "Off — standard rate only"}
                    </p>
                  </div>
                </div>

                {/* Custom Switch Toggle */}
                <button
                  type="button"
                  onClick={() => setIsSpecializedRateActive(!isSpecializedRateActive)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                    isSpecializedRateActive ? "bg-[#8E25E3] justify-end" : "bg-gray-300 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              {/* Active Specialized Rate Controls */}
              {isSpecializedRateActive && (
                <div className="space-y-3 pt-2 border-t border-purple-200/60 animate-in fade-in duration-200">
                  
                  {/* Payment Type Switcher */}
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                      PAYMENT TYPE
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentType("Percentage")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          paymentType === "Percentage"
                            ? "bg-[#8E25E3] text-white shadow-2xs"
                            : "bg-gray-200/80 text-gray-700 hover:bg-gray-300/80"
                        }`}
                      >
                        <span>% Percentage</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentType("Flat Amount")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          paymentType === "Flat Amount"
                            ? "bg-[#8E25E3] text-white shadow-2xs"
                            : "bg-gray-200/80 text-gray-700 hover:bg-gray-300/80"
                        }`}
                      >
                        <span># Flat Amount</span>
                      </button>
                    </div>
                  </div>

                  {/* Value Input */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                      {paymentType === "Percentage" ? "VALUE (0-100%)" : "VALUE ($)"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 15"
                      value={rateValue}
                      onChange={(e) => setRateValue(e.target.value)}
                      className="w-full bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/40"
                    />
                  </div>

                  {/* Reasons Quick Tag Selection */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
                      REASON <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {quickReasons.map((reason) => {
                        const isSelected = selectedReason === reason || customReasonInput === reason;
                        return (
                          <button
                            key={reason}
                            type="button"
                            onClick={() => {
                              setSelectedReason(reason);
                              setCustomReasonInput(reason);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#8E25E3] text-white"
                                : "bg-gray-200/80 text-gray-700 hover:bg-gray-300/80"
                            }`}
                          >
                            {reason}
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="text"
                      placeholder="Or type a custom reason..."
                      value={customReasonInput}
                      onChange={(e) => setCustomReasonInput(e.target.value)}
                      className="w-full bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8E25E3]/40 mt-2"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payout Summary Container */}
            <div className="bg-gray-100/70 border border-gray-200/80 rounded-2xl p-4 space-y-2 text-xs">
              <h5 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">PAYOUT SUMMARY</h5>
              
              <div className="flex items-center justify-between text-gray-700 font-medium">
                <span>Base Payment</span>
                <span className="font-bold text-gray-900">${basePayInput.toLocaleString()}</span>
              </div>

              {isSpecializedRateActive && numRateVal > 0 && (
                <div className="flex items-center justify-between text-[#8E25E3] font-medium">
                  <span>Additional Rate ({additionLabel})</span>
                  <span className="font-bold">+${additionalPay.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-2 flex items-center justify-between font-bold text-sm text-gray-900">
                <span>Final Payout</span>
                <span>${finalPayout.toLocaleString()}</span>
              </div>
            </div>

          </div>

          {/* Submit/Cancel Buttons inside Form */}
          <div className="lg:col-span-2 pt-2 border-t border-gray-200/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-lg border border-gray-200 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#8E25E3] hover:bg-[#7b1bd1] text-white font-semibold text-xs rounded-lg shadow-xs transition-all cursor-pointer"
            >
              Save & Assign
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
