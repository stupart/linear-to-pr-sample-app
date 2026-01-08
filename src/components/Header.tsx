"use client";

import { useState } from "react";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-neutral-950 border-b border-neutral-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
          <div className="w-4 h-4 bg-neutral-900 rounded-sm" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">
          Swap
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-1">
        <a
          href="#"
          className="px-4 py-2 text-sm font-medium text-white bg-neutral-800 rounded-lg"
        >
          Swap
        </a>
        <a
          href="#"
          className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg"
        >
          Pool
        </a>
        <a
          href="#"
          className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg"
        >
          Charts
        </a>
      </nav>

      <button
        onClick={() => setIsConnected(!isConnected)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          isConnected
            ? "bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700"
            : "bg-white text-neutral-900 hover:bg-neutral-100"
        }`}
      >
        {isConnected ? "0x1234...5678" : "Connect Wallet"}
      </button>
    </header>
  );
}
