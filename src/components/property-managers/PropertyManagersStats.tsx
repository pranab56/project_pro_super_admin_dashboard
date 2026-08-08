"use client";

import React from "react";
import rawStats from "@/data/propertyManagersStats.json";
import { StatItem } from "./types";

interface PropertyManagersStatsProps {
  stats?: StatItem[];
  activeCardId?: string | null;
  onSelectCard?: (id: string) => void;
}

export default function PropertyManagersStats({
  stats = rawStats as StatItem[],
  activeCardId,
  onSelectCard,
}: PropertyManagersStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((item) => {
        const isActive = activeCardId === item.id;
        return (
          <div
            key={item.id}
            onClick={() => onSelectCard && onSelectCard(item.id)}
            className={`bg-[#FFFFFF] border rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all duration-200 cursor-pointer ${
              isActive
                ? "border-[#8E25E3] ring-2 ring-[#8E25E3]/20 bg-purple-50/20"
                : "border-[#E5E7EB] hover:border-gray-300 hover:shadow-xs"
            }`}
          >
            <div>
              <h2 className={`text-3xl font-bold tracking-tight ${item.textColor}`}>
                {item.value}
              </h2>
              <p className="text-xs font-bold text-gray-800 mt-2">{item.title}</p>
              {item.subTitle && (
                <p className="text-[11px] font-medium text-gray-500 mt-0.5">
                  {item.subTitle}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
