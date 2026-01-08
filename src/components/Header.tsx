"use client";

import { useState } from "react";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
        <span className="text-xl font-bold text-white">CryptoSwap</span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-slate-300 hover:text-white transition-colors">
          Swap
        </a>
        <a href="#" className="text-slate-300 hover:text-white transition-colors">
          Pool
        </a>
        <a href="#" className="text-slate-300 hover:text-white transition-colors">
          Charts
        </a>
      </nav>

      <button
        onClick={() => setIsConnected(!isConnected)}
        className="px-4 py-2 rounded-xl font-medium transition-all bg-pink-500 hover:bg-pink-600 text-white"
      >
        {isConnected ? "0x1234...5678" : "Connect Wallet"}
      </button>
    </header>
  );
}
