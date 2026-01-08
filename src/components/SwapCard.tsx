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
    <div className="w-full max-w-[440px]">
      <div className="bg-zinc-900 rounded-3xl p-1.5 shadow-2xl shadow-black/60 border border-zinc-800/50">
        <div className="bg-zinc-900 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-zinc-400">Swap</h2>
            <button className="p-2 -mr-2 rounded-xl hover:bg-zinc-800 transition-colors group">
              <svg
                className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300"
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

          <div className="space-y-1.5">
            <TokenInput
              label="You pay"
              token={fromToken}
              amount={fromAmount}
              onAmountChange={handleFromAmountChange}
              tokens={TOKENS}
              onTokenSelect={setFromToken}
            />

            <div className="flex justify-center -my-4 relative z-10">
              <button
                onClick={handleSwapTokens}
                className="p-2.5 bg-zinc-800 rounded-xl border-4 border-zinc-900 hover:bg-zinc-700 active:scale-95 transition-all group shadow-lg"
              >
                <svg
                  className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors"
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

          <button className="w-full mt-5 py-4 rounded-2xl font-semibold text-sm transition-all bg-white text-zinc-900 hover:bg-zinc-100 active:scale-[0.98] shadow-sm">
            Swap
          </button>
        </div>
      </div>

      <div className="mt-4 px-3 space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Rate</span>
          <span className="text-zinc-300 font-medium">
            1 {fromToken.symbol} = 2,000 {toToken.symbol}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Network Fee</span>
          <span className="text-zinc-300 font-medium">~$2.50</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Slippage</span>
          <span className="text-zinc-300 font-medium">0.5%</span>
        </div>
      </div>
    </div>
  );
}
