"use client";

import { useState } from "react";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[440px] px-4 pt-4">
        <div className="flex items-center justify-between h-[52px] px-3 bg-[#0c0c0c]/90 backdrop-blur-xl rounded-2xl border border-[#1c1c1c] shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.02)]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[10px] bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              <div className="w-2 h-2 bg-black rounded-[4px]" />
            </div>
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-white/90">
              Swap
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-0.5 p-1 bg-[#141414] rounded-xl border border-[#1f1f1f]/80">
            {[
              { label: "Swap", active: true },
              { label: "Pool", active: false },
              { label: "Charts", active: false },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`px-3 py-1.5 text-[11px] font-medium rounded-[10px] transition-all ${
                  item.active
                    ? "text-white bg-[#282828] shadow-sm"
                    : "text-[#5a5a5a] hover:text-[#8a8a8a] hover:bg-[#1c1c1c]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Connect Button */}
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`h-8 px-4 rounded-xl text-[11px] font-semibold transition-all ${
              isConnected
                ? "bg-[#161616] text-[#8a8a8a] border border-[#282828] hover:border-[#383838] hover:text-[#a0a0a0] hover:bg-[#1c1c1c]"
                : "bg-white text-black hover:bg-[#f5f5f5] shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            }`}
          >
            {isConnected ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4a4a4a]" />
                <span className="font-mono text-[10px] tracking-tight">0x12...5678</span>
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
