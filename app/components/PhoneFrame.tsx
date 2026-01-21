"use client";

import React from "react";
import BottomNav from "./BottomNav";

type Props = {
  children: React.ReactNode;
};

export default function PhoneFrame({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="phone w-[380px] h-[812px] rounded-[42px] bg-white shadow-2xl relative overflow-hidden">
        {/* Top notch */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[210px] h-8 -mt-2 bg-black/5 rounded-b-xl pointer-events-none" />

        {/* Screen */}
        <div className="phone-screen h-full pt-4 pb-20 overflow-auto">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-24 h-1.5 bg-black/5 rounded-full pointer-events-none" />

        {/* Embedded Bottom Nav (non-fixed) */}
        <div className="absolute bottom-0 left-0 right-0">
          <BottomNav isEmbedded />
        </div>
      </div>
    </div>
  );
}
