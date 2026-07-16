import { PricingTable } from "@clerk/clerk-react";

export default function PricingScreen() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-20 top-24 h-96 w-96 rounded-full bg-violet-500/20 blur-[140px]" />
        <div className="absolute right-20 bottom-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
      </div>

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24">
        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-300">
          Pricing
        </span>

        <h1 className="mt-6 text-center text-5xl font-black md:text-6xl">
          Invest in Your Career
        </h1>

        <p className="mt-5 max-w-3xl text-center text-lg leading-8 text-zinc-400">
          Whether you're preparing your first resume or practicing interviews,
          Real Mentor AI gives you everything you need to land your dream job.
        </p>

        <div className="mt-16 w-full max-w-6xl rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-300/70 dark:bg-zinc-900/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <PricingTable />
        </div>
      </section>
    </main>
  );
}