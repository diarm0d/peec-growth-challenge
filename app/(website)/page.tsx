"use client";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  CircleHelp,
  Download,
  Eye,
  Grid2X2,
  Search,
  Smile,
  Sparkles,
  Tag,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { useFeatureFlagEnabled } from "@posthog/react";

const navItems = ["Product", "Pricing", "Resources", "Partnerships", "Careers"];
const competitors = [
  ["Monday", "65%", "86", "2.7", "bg-[#f7c948]"],
  ["Salesforce", "62%", "62", "2.9", "bg-[#43a5dc]"],
  ["Attio", "47%", "89", "3.6", "bg-[#151515]"],
  ["Pipedrive", "41%", "76", "3.9", "bg-[#36a269]"],
  ["Zero", "28%", "88", "2.3", "bg-[#121212]"],
];

export default function Page() {
  const showReportInputFeature = useFeatureFlagEnabled("report-input-feature");
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
        {showReportInputFeature ? (
          <div>New Feature Here</div>
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
        href="#trial"
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

export function Logo() {
  return (
    <a href={`/`}>
      <Image src="/logo.svg" alt="Peec AI" width={118} height={20} priority />;
    </a>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard-shell relative mx-auto mt-16 w-full max-w-[1120px] overflow-hidden rounded-t-[18px] border border-black/10 bg-white text-[#222] shadow-[0_18px_60px_rgba(0,0,0,0.12)]">
      <div className="flex h-12 items-center gap-3 border-b border-[#ececec] px-4 text-[11px]">
        <div className="flex items-center gap-2 font-semibold">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[#171717] text-white">
            p
          </span>{" "}
          Attio&apos;s Dashboard
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-md border bg-white px-2.5 py-1">Attio</span>
          <span className="rounded-md border bg-white px-2.5 py-1">
            ▣ Last 7 days
          </span>
          <span className="rounded-md border bg-white px-2.5 py-1">
            ◇ All tags
          </span>
          <span className="rounded-md border bg-white px-2.5 py-1">
            ▣ All Models
          </span>
        </div>
        <div className="ml-auto flex items-center gap-3 text-[#777]">
          <CircleHelp className="h-4 w-4" />
          <span className="rounded-md border px-2 py-1 text-[#555]">
            <Download className="mr-1 inline h-3 w-3" />
            Export
          </span>
        </div>
      </div>
      <div className="grid min-h-[350px] grid-cols-1 md:grid-cols-[170px_1.18fr_0.82fr]">
        <aside className="hidden border-r border-[#ededed] p-3 text-[10px] md:block">
          <div className="mb-4 flex items-center gap-2 rounded-md bg-[#f1f1f1] px-2 py-2">
            <Search className="h-3 w-3 text-[#999]" /> Quick Actions
          </div>
          <p className="mb-2 px-2 text-[9px] text-[#999]">General</p>
          {[
            ["Overview", BarChart3],
            ["Prompts", Grid2X2],
            ["Market insights", TrendingUp],
            ["Brand perception", Smile],
          ].map(([label, Icon]) => (
            <div
              key={label as string}
              className={`mb-1 flex items-center gap-2 rounded-md px-2 py-1.5 ${
                label === "Overview"
                  ? "bg-[#e8e8e8] font-medium"
                  : "text-[#777]"
              }`}
            >
              <Icon className="h-3 w-3" />
              {label as string}
            </div>
          ))}
          <p className="mb-2 mt-5 px-2 text-[9px] text-[#999]">Sources</p>
          {["Gap analysis", "Domains", "URLs"].map((x) => (
            <div key={x} className="px-2 py-1.5 text-[#777]">
              ◌ {x}
            </div>
          ))}
          <p className="mb-2 mt-5 px-2 text-[9px] text-[#999]">Optimize</p>
          <div className="px-2 py-1.5 text-[#777]">ϟ Actions</div>
          <div className="px-2 py-1.5 text-[#777]">↗ Impact</div>
        </aside>
        <section className="min-w-0 border-r border-[#ededed] p-4">
          <div className="mb-5 flex items-center justify-between text-[11px]">
            <span>
              ⌂ &nbsp; Overview <span className="text-[#aaa]">•</span>{" "}
              Attio&apos;s Visibility trending up by 5.2% this month
            </span>
            <span className="hidden text-[#999] sm:block">
              Visibility: <b className="text-[#444]">3/14</b> &nbsp; Sentiment:{" "}
              <b className="text-[#444]">2/14</b>
            </span>
          </div>
          <div className="mb-3 flex gap-1 rounded-lg bg-[#f7f7f7] p-1 text-[11px]">
            <span className="flex items-center gap-1 rounded-md bg-white px-2 py-1 font-medium shadow-sm">
              <Eye className="h-3 w-3" /> Visibility
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-[#888]">
              <Smile className="h-3 w-3" /> Sentiment
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-[#888]">
              <Grid2X2 className="h-3 w-3" /> Position
            </span>
            <span className="ml-auto px-2 py-1 text-[#888]">⌁</span>
          </div>
          <div className="relative h-48 overflow-hidden rounded-lg border border-[#ededed] bg-[linear-gradient(#f5f5f5_1px,transparent_1px),linear-gradient(90deg,#f5f5f5_1px,transparent_1px)] bg-[length:100%_34px,76px_100%]">
            <svg
              className="absolute inset-x-2 top-8 h-28 w-[calc(100%-16px)]"
              viewBox="0 0 600 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 58 C80 40, 120 48, 180 35 S285 51, 350 42 S455 63, 600 25"
                fill="none"
                stroke="#2394d0"
                strokeWidth="2"
              />
              <path
                d="M0 72 C95 68, 110 48, 190 50 S300 72, 355 39 S485 65, 600 50"
                fill="none"
                stroke="#df405b"
                strokeWidth="2"
              />
              <path
                d="M0 82 C90 83, 140 78, 200 74 S300 84, 350 60 S470 87, 600 72"
                fill="none"
                stroke="#e4bf25"
                strokeWidth="2"
              />
              <path
                d="M0 98 C100 95, 130 90, 200 95 S310 102, 350 82 S470 108, 600 93"
                fill="none"
                stroke="#4b8f61"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute bottom-1 inset-x-8 flex justify-between text-[10px] text-[#aaa]">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
            <div className="absolute left-[52%] top-[34%] rounded-lg bg-[#171717] px-3 py-2 text-[10px] text-white shadow-lg">
              <b className="mb-1 block">April 2025</b>
              <div className="space-y-1 text-[#bdbdbd]">
                <div>
                  <i className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#df405b]" />
                  Monday <span className="ml-6 text-[#7de09b]">● 65%</span>
                </div>
                <div>
                  <i className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#2394d0]" />
                  Salesforce <span className="ml-3 text-[#7de09b]">● 62%</span>
                </div>
                <div>
                  <i className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#e4bf25]" />
                  Attio <span className="ml-10 text-[#7de09b]">● 47%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hidden p-4 md:block">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold">Attio&apos;s competitors</p>
              <p className="text-[10px] text-[#999]">
                Compare Attio with it&apos;s competitors
              </p>
            </div>
            <span className="rounded-md border px-2 py-1">↗</span>
          </div>
          <div className="overflow-hidden rounded-lg border text-[10px]">
            <div className="grid grid-cols-[24px_1fr_0.75fr_0.65fr_0.6fr] border-b bg-[#fafafa] p-2 text-[#999]">
              <span>#</span>
              <span>Brand</span>
              <span>Visibility</span>
              <span>Sentiment</span>
              <span>Position</span>
            </div>
            {competitors.map(
              ([name, visibility, sentiment, position, color], index) => (
                <div
                  key={name}
                  className="grid grid-cols-[24px_1fr_0.75fr_0.65fr_0.6fr] items-center border-b p-2 last:border-0"
                >
                  <span className="text-[#aaa]">{index + 1}</span>
                  <span className="flex items-center gap-2">
                    <i className={`h-2.5 w-2.5 rounded-full ${color}`} />
                    {name}
                  </span>
                  <span>• {visibility}</span>
                  <span className="rounded bg-[#f1faf4] px-1 text-[#4e9b68]">
                    ↗ {sentiment}
                  </span>
                  <span># {position}</span>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
