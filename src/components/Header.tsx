"use client";

import { useState } from "react";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="flex items-center justify-between px-4 sm:px-5 h-14 max-w-[480px] mx-auto bg-[#111111]/95 backdrop-blur-xl rounded-2xl border border-[#222222] shadow-[0_4px_24px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="w-2.5 h-2.5 bg-black rounded-sm" />
            </div>
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-white">
              Swap
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-0.5 p-1 bg-[#1a1a1a] rounded-xl border border-[#252525]">
            <a
              href="#"
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#2a2a2a] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
              Swap
            </a>
            <a
              href="#"
              className="px-3 py-1.5 text-xs font-medium text-[#707070] hover:text-[#a0a0a0] hover:bg-[#222222] rounded-lg"
            >
              Pool
            </a>
            <a
              href="#"
              className="px-3 py-1.5 text-xs font-medium text-[#707070] hover:text-[#a0a0a0] hover:bg-[#222222] rounded-lg"
            >
              Charts
            </a>
          </nav>

          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`h-8 px-3.5 rounded-xl text-xs font-semibold ${
              isConnected
                ? "bg-[#1a1a1a] text-[#b0b0b0] border border-[#2a2a2a] hover:border-[#3a3a3a] hover:bg-[#222222]"
                : "bg-white text-black hover:bg-[#f0f0f0] shadow-[0_2px_8px_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.2)]"
            }`}
          >
            {isConnected ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#606060]" />
                <span className="font-mono text-[11px]">0x12...5678</span>
              </span>
            ) : (
              "Connect"
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
