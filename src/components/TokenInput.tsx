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
    <div className="bg-neutral-800/50 rounded-2xl p-4 border border-neutral-800/80 hover:border-neutral-700/80 transition-colors">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
          {label}
        </span>
        <button
          className="text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
          onClick={() => !readOnly && onAmountChange(token.balance.toString())}
        >
          Balance: <span className="text-neutral-400 font-medium">{token.balance.toLocaleString()}</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
          readOnly={readOnly}
          className={`flex-1 bg-transparent text-2xl font-semibold text-white placeholder-neutral-600 outline-none w-0 min-w-0 font-mono tracking-tight ${
            readOnly ? "cursor-default" : ""
          }`}
        />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-2 bg-neutral-700/60 hover:bg-neutral-700 rounded-xl border border-neutral-600/50 hover:border-neutral-500/50 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-neutral-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
              {token.icon}
            </div>
            <span className="text-white font-semibold text-sm">
              {token.symbol}
            </span>
            <svg
              className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
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
            <div className="absolute right-0 mt-2 w-56 bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden z-20 shadow-2xl shadow-black/60">
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
                        ? "bg-neutral-800"
                        : "hover:bg-neutral-800/60"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                      {t.icon}
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white font-semibold text-sm">
                        {t.symbol}
                      </div>
                      <div className="text-[11px] text-neutral-500">{t.name}</div>
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
            </div>
          )}
        </div>
      </div>

      {!readOnly && (
        <div className="flex gap-1.5 mt-3.5">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() =>
                onAmountChange(((token.balance * pct) / 100).toString())
              }
              className="px-2.5 py-1.5 text-[11px] font-semibold text-neutral-500 bg-neutral-800/40 hover:bg-neutral-700/80 hover:text-neutral-200 rounded-lg transition-all"
            >
              {pct === 100 ? "Max" : `${pct}%`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
