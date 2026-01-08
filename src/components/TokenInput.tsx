"use client";

import { useState } from "react";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
}

interface TokenInputProps {
  label: string;
  token: Token;
  amount: string;
  onAmountChange: (value: string) => void;
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
  readOnly?: boolean;
}

export default function TokenInput({
  label,
  token,
  amount,
  onAmountChange,
  tokens,
  onTokenSelect,
  readOnly = false,
}: TokenInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-700/50 rounded-2xl p-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="text-sm text-slate-400">
          Balance: {token.balance.toLocaleString()} {token.symbol}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.0"
          readOnly={readOnly}
          className="flex-1 bg-transparent text-3xl font-medium text-white placeholder-slate-500 outline-none"
        />

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded-xl transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              {token.icon}
            </div>
            <span className="text-white font-medium">{token.symbol}</span>
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-xl shadow-lg border border-slate-600 overflow-hidden z-20">
              {tokens.map((t) => (
                <button
                  key={t.symbol}
                  onClick={() => {
                    onTokenSelect(t);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                    {t.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">{t.symbol}</div>
                    <div className="text-xs text-slate-400">{t.name}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {!readOnly && (
        <div className="flex gap-2 mt-3">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() =>
                onAmountChange(((token.balance * pct) / 100).toString())
              }
              className="px-3 py-1 text-xs font-medium text-slate-400 bg-slate-600/50 hover:bg-slate-600 rounded-lg transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
