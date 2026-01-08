"use client";

import Header from "@/components/Header";
import SwapCard from "@/components/SwapCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <SwapCard />
      </main>
    </div>
  );
}
