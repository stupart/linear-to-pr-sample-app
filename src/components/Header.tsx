"use client";

import { useState } from "react";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[480px] px-4 pt-4">
        <div className="flex items-center justify-between h-14 px-4 bg-[#0a0a0a]/95 backdrop-blur-md rounded-2xl border border-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rounded-[3px]" />
            </div>
            <span className="text-sm font-semibold tracking-[-0.02em] text-white">
              Swap
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-0.5 p-1 bg-[#141414] rounded-xl border border-[#1f1f1f]">
            {[
              { label: "Swap", active: true },
              { label: "Pool", active: false },
              { label: "Charts", active: false },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  item.active
                    ? "text-white bg-[#252525]"
                    : "text-[#606060] hover:text-[#909090] hover:bg-[#1a1a1a]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Connect Button */}
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`h-8 px-4 rounded-xl text-xs font-semibold transition-all ${
              isConnected
                ? "bg-[#141414] text-[#909090] border border-[#252525] hover:border-[#353535] hover:text-[#b0b0b0]"
                : "bg-white text-black hover:bg-[#f0f0f0]"
            }`}
          >
            {isConnected ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#505050]" />
                <span className="font-mono text-[11px] tracking-tight">0x12...5678</span>
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
