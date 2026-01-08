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
      <div className="bg-[#0c0c0c] rounded-[24px] border border-[#1a1a1a] shadow-[0_8px_40px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4)]">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] font-semibold text-[#606060] uppercase tracking-[0.08em]">Swap</h2>
            <button className="w-8 h-8 -mr-1 rounded-lg flex items-center justify-center hover:bg-[#1a1a1a] group">
              <svg
                className="w-[18px] h-[18px] text-[#505050] group-hover:text-[#808080]"
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

          <div className="space-y-1">
            <TokenInput
              label="You pay"
              token={fromToken}
              amount={fromAmount}
              onAmountChange={handleFromAmountChange}
              tokens={TOKENS}
              onTokenSelect={setFromToken}
            />

            <div className="flex justify-center -my-3.5 relative z-10">
              <button
                onClick={handleSwapTokens}
                className="w-9 h-9 bg-[#181818] rounded-xl border-[3px] border-[#0c0c0c] flex items-center justify-center hover:bg-[#222222] group shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              >
                <svg
                  className="w-4 h-4 text-[#505050] group-hover:text-[#909090]"
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

          <button className="w-full mt-5 h-12 rounded-xl font-semibold text-[14px] bg-white text-black hover:bg-[#f5f5f5] shadow-[0_2px_12px_rgba(255,255,255,0.1),0_1px_3px_rgba(0,0,0,0.2)]">
            Swap
          </button>
        </div>
      </div>

      <div className="mt-3 mx-0.5 px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#151515]">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-[#505050]">Rate</span>
          <span className="text-[11px] text-[#808080] font-medium font-mono">
            1 {fromToken.symbol} = 2,000 {toToken.symbol}
          </span>
        </div>
        <div className="w-full h-px bg-[#181818] my-2.5" />
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-[#505050]">Network Fee</span>
          <span className="text-[11px] text-[#808080] font-medium font-mono">~$2.50</span>
        </div>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[11px] text-[#505050]">Slippage</span>
          <span className="text-[11px] text-[#808080] font-medium">0.5%</span>
        </div>
      </div>
    </div>
  );
}
