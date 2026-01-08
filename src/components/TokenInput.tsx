"use client";

import { useState, useRef, useEffect } from "react";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-800 hover:border-zinc-700/50 transition-colors">
      <div className="flex justify-between mb-2">
        <span className="text-xs font-medium text-zinc-500">
          {label}
        </span>
        <button
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          onClick={() => !readOnly && onAmountChange(token.balance.toString())}
        >
          Balance: <span className="text-zinc-400">{token.balance.toLocaleString()}</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0"
          readOnly={readOnly}
          className={`flex-1 bg-transparent text-3xl font-semibold text-white placeholder-zinc-700 outline-none w-0 min-w-0 ${
            readOnly ? "cursor-default" : ""
          }`}
        />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors border border-zinc-700/50 hover:border-zinc-600"
          >
            <div className="w-7 h-7 rounded-full bg-zinc-600 flex items-center justify-center text-xs font-bold text-white">
              {token.icon}
            </div>
            <span className="text-white font-semibold text-sm">
              {token.symbol}
            </span>
            <svg
              className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
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
            <div className="absolute right-0 mt-2 w-56 bg-zinc-900 rounded-2xl shadow-2xl shadow-black/60 border border-zinc-800 overflow-hidden z-20">
              <div className="p-2">
                {tokens.map((t) => (
                  <button
                    key={t.symbol}
                    onClick={() => {
                      onTokenSelect(t);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      t.symbol === token.symbol
                        ? "bg-zinc-800"
                        : "hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-white">
                      {t.icon}
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white font-semibold text-sm">
                        {t.symbol}
                      </div>
                      <div className="text-xs text-zinc-500">{t.name}</div>
                    </div>
                    {t.symbol === token.symbol && (
                      <svg
                        className="w-5 h-5 text-white"
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
            </div>
          )}
        </div>
      </div>

      {!readOnly && (
        <div className="flex gap-1.5 mt-3">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() =>
                onAmountChange(((token.balance * pct) / 100).toString())
              }
              className="px-3 py-1.5 text-xs font-medium text-zinc-500 bg-zinc-800/50 hover:bg-zinc-700 hover:text-zinc-200 rounded-lg transition-colors border border-transparent hover:border-zinc-700"
            >
              {pct === 100 ? "Max" : `${pct}%`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
