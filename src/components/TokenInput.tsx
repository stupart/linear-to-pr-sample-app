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
    <div className="bg-[#141414] rounded-2xl p-4 border border-[#1e1e1e] hover:border-[#282828] transition-colors">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-[10px] font-semibold text-[#505050] uppercase tracking-[0.06em]">
          {label}
        </span>
        <button
          className="text-[10px] text-[#505050] hover:text-[#808080] transition-colors"
          onClick={() => !readOnly && onAmountChange(token.balance.toString())}
        >
          Balance: <span className="text-[#606060] font-medium">{token.balance.toLocaleString()}</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
          readOnly={readOnly}
          className={`flex-1 bg-transparent text-[22px] font-semibold text-white placeholder-[#2a2a2a] outline-none w-0 min-w-0 font-mono tracking-tight ${
            readOnly ? "cursor-default" : ""
          }`}
        />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-2 bg-[#1e1e1e] hover:bg-[#262626] rounded-xl border border-[#2a2a2a] hover:border-[#353535] transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-[#303030] flex items-center justify-center text-[11px] font-bold text-[#a0a0a0]">
              {token.icon}
            </div>
            <span className="text-white font-semibold text-[13px]">
              {token.symbol}
            </span>
            <svg
              className={`w-3 h-3 text-[#505050] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#111111] rounded-xl border border-[#222222] overflow-hidden z-20 shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
              <div className="p-1.5">
                {tokens.map((t) => (
                  <button
                    key={t.symbol}
                    onClick={() => {
                      onTokenSelect(t);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors ${
                      t.symbol === token.symbol
                        ? "bg-[#1a1a1a]"
                        : "hover:bg-[#181818]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center text-[12px] font-bold text-[#909090]">
                      {t.icon}
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white font-semibold text-[13px]">
                        {t.symbol}
                      </div>
                      <div className="text-[10px] text-[#505050]">{t.name}</div>
                    </div>
                    {t.symbol === token.symbol && (
                      <svg
                        className="w-3.5 h-3.5 text-[#707070]"
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
              className="px-2.5 py-1.5 text-[10px] font-semibold text-[#505050] bg-[#1a1a1a] hover:bg-[#252525] hover:text-[#909090] rounded-lg border border-transparent hover:border-[#2a2a2a] transition-all"
            >
              {pct === 100 ? "Max" : `${pct}%`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
