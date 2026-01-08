"use client";

import Header from "@/components/Header";
import SwapCard from "@/components/SwapCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <main className="flex flex-col items-center justify-center px-4 pt-20 pb-16">
        <SwapCard />
      </main>
    </div>
  );
}
