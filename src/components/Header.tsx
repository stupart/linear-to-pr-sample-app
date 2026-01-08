"use client";

import { useState } from "react";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-800/50">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <div className="w-4 h-4 bg-zinc-900 rounded" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Swap
          </span>
        </div>

        <nav className="hidden md:flex items-center p-1 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
          <a
            href="#"
            className="px-4 py-1.5 text-sm font-medium text-white bg-zinc-800 rounded-lg shadow-sm"
          >
            Swap
          </a>
          <a
            href="#"
            className="px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white rounded-lg transition-colors"
          >
            Pool
          </a>
          <a
            href="#"
            className="px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white rounded-lg transition-colors"
          >
            Charts
          </a>
        </nav>

        <button
          onClick={() => setIsConnected(!isConnected)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            isConnected
              ? "bg-zinc-900 text-white border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800"
              : "bg-white text-zinc-900 hover:bg-zinc-100 shadow-sm"
          }`}
        >
          {isConnected ? (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              0x1234...5678
            </span>
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>
    </header>
  );
}
