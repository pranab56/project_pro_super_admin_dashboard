"use client";

import React from "react";
import { X } from "lucide-react";
import { UserItem } from "./types";

interface UserDetailsModalProps {
  user: UserItem | null;
  onClose: () => void;
}

export default function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-base font-medium text-gray-900">User Profile Details</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 text-xs text-gray-700">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Joined Date:</strong> {user.joinedDate}</p>
          <p><strong>Last Login:</strong> {user.lastLogin}</p>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-[#8E25E3] text-white font-semibold text-xs rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
