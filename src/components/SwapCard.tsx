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
    // Mock exchange rate
    const numValue = parseFloat(value) || 0;
    if (fromToken.symbol === "ETH") {
      setToAmount((numValue * 2000).toFixed(2));
    } else {
      setToAmount((numValue / 2000).toFixed(6));
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-800 rounded-3xl p-4 shadow-xl border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Swap</h2>
        <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      <TokenInput
        label="You pay"
        token={fromToken}
        amount={fromAmount}
        onAmountChange={handleFromAmountChange}
        tokens={TOKENS}
        onTokenSelect={setFromToken}
      />

      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={handleSwapTokens}
          className="p-2 bg-slate-700 rounded-xl border-4 border-slate-800 hover:bg-slate-600 transition-colors"
        >
          <svg
            className="w-5 h-5 text-slate-300"
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

      <button className="w-full mt-4 py-4 rounded-2xl font-semibold text-lg transition-all bg-green-500 hover:bg-green-600 text-white">
        Swap
      </button>

      <div className="mt-4 p-3 bg-slate-700/50 rounded-xl">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Rate</span>
          <span className="text-white">
            1 {fromToken.symbol} = 2,000 {toToken.symbol}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-slate-400">Network Fee</span>
          <span className="text-white">~$2.50</span>
        </div>
      </div>
    </div>
  );
}
