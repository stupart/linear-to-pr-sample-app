"use client";

import { useState } from "react";
import TokenInput from "./TokenInput";

const TOKENS = [
  { symbol: "ETH", name: "Ethereum", icon: "E", balance: 2.5 },
  { symbol: "USDC", name: "USD Coin", icon: "$", balance: 5000 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", icon: "B", balance: 0.15 },
];

export default function SwapCard() {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    const numValue = parseFloat(value) || 0;
    if (fromToken.symbol === "ETH") {
      setToAmount((numValue * 2000).toFixed(2));
    } else {
      setToAmount((numValue / 2000).toFixed(6));
    }
  };

  return (
    <div className="w-full max-w-[420px] px-4">
      {/* Main Card */}
      <div className="bg-[#0a0a0a] rounded-[20px] border border-[#181818] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-semibold text-[#505050] uppercase tracking-[0.1em]">
              Swap
            </h2>
            <button className="w-8 h-8 -mr-1 rounded-lg flex items-center justify-center hover:bg-[#151515] group transition-colors">
              <svg
                className="w-[18px] h-[18px] text-[#404040] group-hover:text-[#707070] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* Token Inputs */}
          <div className="space-y-1">
            <TokenInput
              label="You pay"
              token={fromToken}
              amount={fromAmount}
              onAmountChange={handleFromAmountChange}
              tokens={TOKENS}
              onTokenSelect={setFromToken}
            />

            {/* Swap Button */}
            <div className="flex justify-center -my-3 relative z-10">
              <button
                onClick={handleSwapTokens}
                className="swap-btn-accent w-9 h-9 bg-[#151515] rounded-xl border-[3px] border-[#0a0a0a] flex items-center justify-center hover:bg-[#1f1f1f] group shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
              >
                <svg
                  className="w-4 h-4 text-[#404040] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            <TokenInput
              label="You receive"
              token={toToken}
              amount={toAmount}
              onAmountChange={setToAmount}
              tokens={TOKENS}
              onTokenSelect={setToToken}
              readOnly
            />
          </div>

          {/* Swap Action Button */}
          <button className="btn-primary-metallic w-full mt-5 h-12 text-sm">
            Swap
          </button>
        </div>
      </div>

      {/* Details Panel */}
      <div className="mt-3 px-4 py-3.5 rounded-xl bg-[#080808] border border-[#141414]">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-[#404040]">Rate</span>
          <span className="text-[11px] text-[#707070] font-medium font-mono">
            1 {fromToken.symbol} = 2,000 {toToken.symbol}
          </span>
        </div>
        <div className="w-full h-px divider-gold my-2.5" />
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-[#404040]">Network Fee</span>
          <span className="text-[11px] text-[#707070] font-medium font-mono">
            ~$2.50
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[11px] text-[#404040]">Slippage</span>
          <span className="text-[11px] text-[#707070] font-medium">0.5%</span>
        </div>
      </div>
    </div>
  );
}
