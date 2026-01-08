"use client";

import { useState } from "react";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="flex items-center justify-between px-5 h-14 max-w-5xl mx-auto bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-800/80 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center shadow-sm">
              <div className="w-3 h-3 bg-black rounded-[3px]" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              Swap
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-0.5 p-0.5 bg-neutral-800/50 rounded-lg">
            <a
              href="#"
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-neutral-700/80 rounded-md shadow-sm"
            >
              Swap
            </a>
            <a
              href="#"
              className="px-3.5 py-1.5 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-700/40 rounded-md transition-colors"
            >
              Pool
            </a>
            <a
              href="#"
              className="px-3.5 py-1.5 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-700/40 rounded-md transition-colors"
            >
              Charts
            </a>
          </nav>

          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`h-8 px-3.5 rounded-lg text-xs font-semibold transition-all ${
              isConnected
                ? "bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-700"
                : "bg-white text-black hover:bg-neutral-100 shadow-sm"
            }`}
          >
            {isConnected ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span className="font-mono">0x12...5678</span>
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
