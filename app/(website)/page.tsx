"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Eye,
  Grid2X2,
  Smile,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";
import ReportForm from "@/components/forms/ReportForm";
import Logo from "@/components/custom/Logo";
import DashboardPreview from "@/components/custom/DashboardPreview";
import posthog from "posthog-js";
import { useFeatureFlagVariantKey } from "posthog-js/react";
import { useHydrated } from "../hooks/use-hydrated";

const navItems = ["Product", "Pricing", "Resources", "Partnerships", "Careers"];

export default function Page() {
  const hydrated = useHydrated()
  const selfServeVariant = useFeatureFlagVariantKey("new-self-serve-flow");


  useEffect(() => {
    if (selfServeVariant !== undefined) {
      posthog.capture("$feature_flag_called", {
        $feature_flag: "new-self-serve-flow",
        $feature_flag_response: selfServeVariant,
      });
    }
  }, [selfServeVariant]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition-colors hover:text-foreground"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-85"
            href="/prompts"
            onClick={() => posthog.capture("login_event")}
          >
            Login
          </a>
        </div>
      </header>
      <section className="relative mx-auto flex max-w-[1200px] flex-col items-center px-5 pt-16 text-center lg:px-8 lg:pt-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#ee5365]" /> We are hiring{" "}
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
        </div>
        <h1 className="max-w-4xl text-balance text-[clamp(3.35rem,7vw,6.4rem)] font-semibold leading-[0.93] tracking-[-0.075em]">
          AI search analytics{" "}
          <span className="text-muted-foreground">for marketing teams</span>
        </h1>
        <p className="mt-7 max-w-[650px] text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Track, analyze, and improve brand performance on AI search platforms
          through key metrics like{" "}
          <span className="metric-pill">
            <Eye className="h-3.5 w-3.5" />
            Visibility
          </span>
          ,{" "}
          <span className="metric-pill">
            <Grid2X2 className="h-3.5 w-3.5" />
            Position
          </span>
          , and{" "}
          <span className="metric-pill">
            <Smile className="h-3.5 w-3.5" />
            Sentiment
          </span>
        </p>
        {hydrated && selfServeVariant === "test" ? (
          <ReportForm />
        ) : (
          <SalesButtons />
        )}
        <DashboardPreview />
      </section>
      <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-5 py-10 text-xs text-muted-foreground">
        <Tag className="h-4 w-4" /> Trusted by forward-thinking marketing teams{" "}
        <ChevronDown className="h-3 w-3" />
      </div>
    </main>
  );
}

export function SalesButtons() {
  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
      <Link
        href="#sales"
        onClick={() => posthog.capture("start_sales_process")}
        className={
          "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-foreground"
        }
      >
        <Sparkles className="h-4 w-4" /> Talk to Sales
      </Link>
      <Link
        href="/login"
        onClick={() => posthog.capture("start_self_serve")}
        className={
          "inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:opacity-85"
        }
      >
        Start Free Trial <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
