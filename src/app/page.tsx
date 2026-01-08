"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SwapCard from "@/components/SwapCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      <main className="flex flex-col items-center justify-center px-4 py-16">
        <SwapCard />
      </main>
    </div>
  );
}
