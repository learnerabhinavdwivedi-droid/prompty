'use client';

import { useId, useState } from 'react';

const DEFAULT_TOKENS_PER_DAY = 50_000;
const MIN_TOKENS_PER_DAY = 1_000;
const MAX_TOKENS_PER_DAY = 1_000_000;
const STEP = 1_000;
const COMPRESSION_RATE = 0.22;
const GPT_4O_INPUT_COST_PER_MILLION = 5;
const DAYS_PER_MONTH = 30;
const ADVANCED_MONTHLY_PRICE = 5;

const integerFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function sanitizeTokensPerDay(value) {
  if (!Number.isFinite(value)) {
    return DEFAULT_TOKENS_PER_DAY;
  }

  return Math.min(
    MAX_TOKENS_PER_DAY,
    Math.max(MIN_TOKENS_PER_DAY, Math.round(value / STEP) * STEP),
  );
}

export default function SavingsCalculator() {
  const inputId = useId();
  const [tokensPerDay, setTokensPerDay] = useState(DEFAULT_TOKENS_PER_DAY);
  const safeTokensPerDay = sanitizeTokensPerDay(tokensPerDay);

  const tokensSavedPerDay = Math.round(safeTokensPerDay * COMPRESSION_RATE);
  const monthlyCost =
    (safeTokensPerDay / 1_000_000) * GPT_4O_INPUT_COST_PER_MILLION * DAYS_PER_MONTH;
  const monthlySavings = monthlyCost * COMPRESSION_RATE;
  const paybackDays = monthlySavings > 0
    ? Math.ceil((ADVANCED_MONTHLY_PRICE / monthlySavings) * DAYS_PER_MONTH)
    : null;

  return (
    <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.05)]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7]/15 blur-[90px] pointer-events-none" />
      <div className="flex flex-col gap-10 relative z-10">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-widest text-[#a855f7] mb-3">
            ROI Calculator
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Calculate your savings
          </h2>
          <p className="mt-3 text-base text-[#888888] font-semibold">
            Based on GPT-4o input pricing at $5 per 1M tokens and an average 22% compression rate.
          </p>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <label htmlFor={inputId} className="block text-sm font-bold text-white mb-4 text-center">
            Daily upstream token volume
          </label>
          <div className="rounded-2xl border border-white/10 bg-black/40 px-6 py-5 shadow-inner">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <input
                id={inputId}
                type="range"
                min={MIN_TOKENS_PER_DAY}
                max={MAX_TOKENS_PER_DAY}
                step={STEP}
                value={safeTokensPerDay}
                onChange={(event) => setTokensPerDay(sanitizeTokensPerDay(Number(event.target.value)))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#a855f7]"
              />
              <div className="relative w-full sm:w-48 shrink-0">
                <input
                  type="number"
                  min={MIN_TOKENS_PER_DAY}
                  max={MAX_TOKENS_PER_DAY}
                  step={STEP}
                  value={safeTokensPerDay}
                  onChange={(event) => {
                    setTokensPerDay(sanitizeTokensPerDay(Number(event.target.value)));
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right text-base font-bold text-white focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 focus:outline-none transition-all"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs font-semibold text-[#666666]">
              <span>{integerFormatter.format(MIN_TOKENS_PER_DAY)}</span>
              <span>{integerFormatter.format(MAX_TOKENS_PER_DAY)}+</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#a855f7]/30 bg-gradient-to-r from-[#a855f7]/15 to-transparent px-6 py-5 text-center text-sm text-[#e0e0e0] font-semibold max-w-3xl mx-auto w-full">
          You send about{' '}
          <span className="font-bold text-white">
            {integerFormatter.format(safeTokensPerDay)} tokens/day
          </span>
          {' '}and save about{' '}
          <span className="font-bold text-[#a855f7]">
            {integerFormatter.format(tokensSavedPerDay)} tokens/day
          </span>
          , worth about{' '}
          <span className="font-bold text-[#a855f7] text-lg mx-1">
            {currencyFormatter.format(monthlySavings)}/month
          </span>
          {' '}on your LLM bill.
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-center hover:bg-white/[0.07] transition-all">
            <p className="text-xs font-bold uppercase tracking-wider text-[#888888]">Tokens saved</p>
            <p className="mt-3 text-4xl font-black text-[#a855f7] tracking-tighter">
              {integerFormatter.format(tokensSavedPerDay)}
            </p>
            <p className="mt-2 text-xs font-medium text-[#666666]">Per day at 22% average compression</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-center hover:bg-white/[0.07] transition-all">
            <p className="text-xs font-bold uppercase tracking-wider text-[#888888]">Monthly API cost</p>
            <p className="mt-3 text-4xl font-black text-white tracking-tighter">
              {currencyFormatter.format(monthlyCost)}
            </p>
            <p className="mt-2 text-xs font-medium text-[#666666]">Before Prompty compression</p>
          </div>

          <div className="rounded-2xl border border-[#a855f7]/30 bg-[#a855f7]/10 px-6 py-6 text-center hover:bg-[#a855f7]/15 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a855f7]/20 blur-[50px] pointer-events-none" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#a855f7]">Advanced payback</p>
            <p className="mt-3 text-4xl font-black text-white tracking-tighter relative z-10">
              {paybackDays === null ? 'N/A' : `${paybackDays} days`}
            </p>
            <p className="mt-2 text-xs font-semibold text-[#888888] relative z-10">
              {paybackDays === null
                ? 'Requires a positive monthly savings estimate'
                : `${currencyFormatter.format(monthlySavings)} saved per month`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
