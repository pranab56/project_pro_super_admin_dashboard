"use client";

import React from "react";
import { MoreHorizontal, Shield, UserCheck, UserX } from "lucide-react";
import { UserItem, UserRole } from "./types";

interface UserTableProps {
  users: UserItem[];
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  setSelectedUserDetail: (user: UserItem) => void;
  toggleUserStatus: (user: UserItem) => void;
}

export default function UserTable({
  users,
  activeMenuId,
  setActiveMenuId,
  setSelectedUserDetail,
  toggleUserStatus,
}: UserTableProps) {
  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case "Service Provider":
      case "Contractor":
        return "bg-emerald-100/90 text-emerald-700 border border-emerald-200/50";
      case "Property Manager":
      case "Property Owner":
        return "bg-amber-100/90 text-amber-700 border border-amber-200/50";
      case "Admin":
        return "bg-purple-100/90 text-[#8E25E3] border border-purple-200/50";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] text-gray-500 text-xs font-medium">
              <th className="py-4 px-5 font-medium">Name / Email</th>
              <th className="py-4 px-5 font-medium">User name</th>
              <th className="py-4 px-5 font-medium">Role</th>
              <th className="py-4 px-5 font-medium">Status</th>
              <th className="py-4 px-5 font-medium">Joined Date</th>
              <th className="py-4 px-5 font-medium">Last Login</th>
              <th className="py-4 px-5 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] text-xs font-medium text-gray-800">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500 font-medium">
                  No users matching your filters.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-200/50 transition-colors"
                >
                  {/* Name / Email */}
                  <td className="py-4 px-5">
                    <div>
                      <p className="font-bold text-gray-900 text-sm leading-snug">{user.name}</p>
                      <p className="text-[11px] text-gray-500 font-normal mt-0.5">{user.email}</p>
                    </div>
                  </td>

                  {/* Username */}
                  <td className="py-4 px-5 text-gray-600 font-normal">
                    {user.username}
                  </td>

                  {/* Role Badge */}
                  <td className="py-4 px-5">
                    <span
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold inline-block ${getRoleBadgeStyle(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span
                        className={`w-2 h-2 rounded-full ${user.status === "Active"
                          ? "bg-emerald-500"
                          : user.status === "Pending"
                            ? "bg-amber-500"
                            : "bg-red-500"
                          }`}
                      />
                      <span
                        className={
                          user.status === "Active"
                            ? "text-emerald-600"
                            : user.status === "Pending"
                              ? "text-amber-600"
                              : "text-red-600"
                        }
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>

                  {/* Joined Date */}
                  <td className="py-4 px-5 text-gray-600 font-normal">
                    {user.joinedDate}
                  </td>

                  {/* Last Login */}
                  <td className="py-4 px-5 text-gray-600 font-normal">
                    {user.lastLogin}
                  </td>

                  {/* Actions Button */}
                  <td className="py-4 px-5 text-center relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenuId(activeMenuId === user.id ? null : user.id)
                      }
                      className="px-2.5 py-1.5 bg-[#FFFFFF] hover:bg-gray-50 border border-[#E5E7EB] rounded-md text-gray-600 hover:text-gray-900 transition-all cursor-pointer inline-flex items-center justify-center"
                      title="Actions"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenuId === user.id && (
                      <div className="absolute right-6 top-12 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1 text-left animate-in fade-in zoom-in-95 duration-100">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUserDetail(user);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3.5 py-3 text-xs font-medium cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <Shield className="w-3.5 h-3.5 text-gray-500" />
                          <span>View Full Profile</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleUserStatus(user)}
                          className="w-full px-3.5 py-3 cursor-pointer text-md font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          {user.status === "Active" ? (
                            <>
                              <UserX className="w-3.5 h-3.5 text-red-600" />
                              <span>Suspend User</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Activate User</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
