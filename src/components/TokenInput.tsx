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
    <div className="bg-neutral-800 rounded-xl p-4 hover:bg-neutral-800/80 transition-colors">
      <div className="flex justify-between mb-2">
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xs text-neutral-500">
          Balance: {token.balance.toLocaleString()} {token.symbol}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0"
          readOnly={readOnly}
          className="flex-1 bg-transparent text-2xl font-medium text-white placeholder-neutral-600 outline-none w-0 min-w-0"
        />

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-neutral-500 flex items-center justify-center text-xs font-bold text-white">
              {token.icon}
            </div>
            <span className="text-white font-medium text-sm">
              {token.symbol}
            </span>
            <svg
              className={`w-4 h-4 text-neutral-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
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
            <div className="absolute right-0 mt-2 w-52 bg-neutral-800 rounded-xl shadow-xl shadow-black/50 border border-neutral-700 overflow-hidden z-20">
              {tokens.map((t) => (
                <button
                  key={t.symbol}
                  onClick={() => {
                    onTokenSelect(t);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-700 transition-colors ${
                    t.symbol === token.symbol ? "bg-neutral-700/50" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-neutral-600 flex items-center justify-center text-sm font-bold text-white">
                    {t.icon}
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-white font-medium text-sm">
                      {t.symbol}
                    </div>
                    <div className="text-xs text-neutral-500">{t.name}</div>
                  </div>
                  {t.symbol === token.symbol && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
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
              className="px-2.5 py-1 text-xs font-medium text-neutral-400 bg-neutral-700/50 hover:bg-neutral-700 hover:text-neutral-200 rounded-md transition-colors"
            >
              {pct === 100 ? "Max" : `${pct}%`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
