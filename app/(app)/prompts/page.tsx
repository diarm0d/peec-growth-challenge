"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Filter,
  HelpCircle,
  Plus,
  Search,
  Sparkles,
  X,
  HatGlasses,
} from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const prompts = [
  "Compare the durability of Nike basketballs versus Spalding for outdoor court play.",
  "Compare professional-grade volleyballs vs recreational versions.",
  "I need a durable backpack for my daily commute and gym gear, any suggestions?",
  "Describe the construction differences between training footballs and match-day balls.",
  "Top-rated sports bras for high-impact activities.",
  "Compare materials used in professional versus entry-level footballs.",
  "What are the best basketballs for outdoor play?",
];

export default function PromptsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [generatePrompts, setGeneratePrompts] = useState(false);
  const [addPrompts, setAddPrompts] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#fbfbfb] text-[#191919]">
      <header className="flex h-[74px] items-center justify-between border-b border-[#e6e6e6] bg-white px-6 lg:px-9">
        <div className="flex items-center gap-3 text-[22px] font-semibold">
          <a href={`/`}>
            <Image
              src="/logo.svg"
              alt="Peec AI"
              width={118}
              height={20}
              priority
            />
          </a>{" "}
          | Prompts
        </div>
        <div className="flex gap-2">
          <Button className="px-4 py-2 text-sm font-medium">
            <HatGlasses className="mr-1 inline h-4 w-4" />
            Agent
          </Button>
          <Button className="px-4 py-2 text-sm font-medium">
            <HelpCircle className="mr-1 inline h-4 w-4" />
            Help
          </Button>
        </div>
      </header>
      <div className="flex flex-wrap gap-2 border-b border-[#e6e6e6] bg-white px-6 py-3 lg:px-9">
        <Button className="flex control">
          ▦ &nbsp; Nike <ChevronDown />
        </Button>
        <Button className="flex control">
          <CalendarDays /> All time <ChevronDown />
        </Button>
        <Button className="flex control">
          <Filter /> All filters <ChevronDown />
        </Button>
      </div>
      <div className="flex">
        <aside className="hidden w-[300px] shrink-0 border-r border-[#e6e6e6] bg-white lg:block">
          <div className="flex items-center justify-between border-b p-7 text-xl font-semibold">
            Topics
          </div>
          <div className="flex items-center justify-between border-b px-8 py-5">
            New topic <Plus className="h-5 w-5 text-[#888]" />
          </div>
          <div className="m-4 rounded-xl bg-[#f1f1f1] px-3 py-2 font-medium">
            All topics <span className="float-right text-[#888]">80</span>
          </div>
          <div className="space-y-4 px-8 text-lg">
            <p>
              Sports equipment{" "}
              <span className="float-right text-[#888]">60</span>
            </p>
            <p>
              Performance apparel{" "}
              <span className="float-right text-[#888]">20</span>
            </p>
          </div>
        </aside>
        <section className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-4 lg:px-7">
            <div className="flex gap-6 text-lg">
              <span className="border-b-2 border-black pb-4 font-medium">
                Active
              </span>
              <span className="text-[#999]">Suggested</span>
              <span className="text-[#999]">Archived</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  posthog.capture("generate_prompts");
                  setModalOpen(true);
                  setGeneratePrompts(true);
                }}
                className="border border-[#e4e4e4] bg-white px-4 py-2 text-[#222] shadow-sm"
              >
                <Sparkles className="mr-2 inline h-4 w-4" />
                Generate prompts
              </Button>
              <Button
                onClick={() => {
                  posthog.capture("add_prompts");
                  setModalOpen(true);
                  setAddPrompts(true);
                }}
                className="bg-[#171717] px-4 py-2 text-white"
              >
                <Plus className="mr-1 inline h-4 w-4" />
                Add prompt
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-5 overflow-hidden border-b bg-white px-6 py-4">
            <div className="flex min-w-[260px] items-center gap-2 rounded-xl border px-4 py-2 text-[#999]">
              <Search className="h-5 w-5" />
              Search
            </div>
            <span className="whitespace-nowrap text-[#888]">
              Share of voice <b className="text-black">79%</b>
            </span>
            <span className="whitespace-nowrap text-[#888]">
              Visibility <b className="text-black">37%</b>
            </span>
            <span className="whitespace-nowrap text-[#888]">
              Sentiment <b className="text-black">64</b>
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-left">
              <thead className="bg-[#f7f7f7] text-[#888]">
                <tr>
                  <th className="w-12 p-4"></th>
                  <th className="p-4">Prompt ↕</th>
                  <th className="p-4">Visibility ↕</th>
                  <th className="p-4">SoV ↕</th>
                  <th className="p-4">Sentiment ↕</th>
                  <th className="p-4">Position ↕</th>
                </tr>
              </thead>
              <tbody>
                {prompts.map((prompt, i) => (
                  <tr
                    key={prompt}
                    className="border-t border-[#e8e8e8] bg-white"
                  >
                    <td className="p-5">
                      <span className="block h-5 w-5 rounded-md border" />
                    </td>
                    <td className="max-w-[430px] p-5 text-lg leading-6">
                      {prompt}
                    </td>
                    <td className="p-5">
                      {i === 0 ? "100%" : i === 4 ? "11%" : "0%"} &nbsp;−
                    </td>
                    <td className="p-5">{i === 0 ? "100%" : "0%"} &nbsp;−</td>
                    <td className="p-5">{i === 0 ? "● 60" : "−"}</td>
                    <td className="p-5">{i === 0 ? "# 1.1" : "−"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 z-10 grid place-items-center bg-black/25 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-2xl">
            {generatePrompts && (
              <>
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      You've hit your 80-prompt limit
                    </h2>
                    <p className="mt-2 text-sm text-[#777]">
                      You&apos;re tracking <b>80 prompts</b>, but you have tried
                      to acitvate <b>30 more</b>. A larger plan tracks more
                      prompts and unlocks more:
                    </p>
                  </div>
                  <Button
                    className="border-none bg-white px-4 py-2 text-[#222] text-sm"
                    onClick={() => {
                      setModalOpen(false);
                      setAddPrompts(false);
                      setGeneratePrompts(false);
                      posthog.capture("prompts_cap_close");
                    }}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4 text-[#999]" />
                  </Button>
                </div>
                <div className="mt-6 text-sm font-semibold">
                  Total prompts tracking{" "}
                  <span className="float-right">80 / 80</span>
                </div>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-4 flex-1 rounded-sm ${
                        i < 40 ? "bg-orange-500" : "bg-[#eee]"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-orange-500">0 prompts left</p>
                <div className="mt-5 flex justify-end gap-2">
                  <Button
                    onClick={() => {
                      setModalOpen(false);
                      setAddPrompts(false);
                      setGeneratePrompts(false);
                      posthog.capture("prompts_cap_close");
                    }}
                    className="rounded-lg border border-[#e4e4e4] bg-white px-4 py-2 text-[#222] shadow-sm text-sm"
                  >
                    Maybe later
                  </Button>
                  <Button
                    onClick={() => {
                      setModalOpen(false);
                      setAddPrompts(false);
                      setGeneratePrompts(false);
                      posthog.capture("prompts_cap_start_upgrade");
                      router.push("#upgrade-plan");
                    }}
                    className="rounded-lg bg-[#171717] px-3 py-2 text-sm text-white"
                  >
                    See plans
                  </Button>
                </div>
              </>
            )}
            {addPrompts && (
              <>
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg">
                      You've hit your <b>80-prompt limit</b>
                    </h2>
                    <p className="mt-2 text-sm text-orange-500">
                      0 prompts left
                    </p>
                    <div className="w-full border-t border-[#e8e8e8] mt-4" />
                    <div className="flex items-center mt-4">
                      <h2 className="text-lg flex items-center font-semibold">
                        Suggested prompt report{" "}
                        <Sparkles className="ml-2 h-4 w-4" />
                      </h2>
                    </div>
                    <p className="mt-2 text-md text-[#777]">
                      You&apos;re suggested prompts has <b>60 new prompts</b> to
                      help improve your brand&apos;s visibility:
                    </p>
                    <ul>
                      <li className="mt-2 text-sm text-[#777]">
                        • 18 prompts with commercial & transactional intent
                      </li>
                      <li className="mt-2 text-sm text-[#777]">
                        • 7 prompts with high relative search volume
                      </li>
                      <li className="mt-2 text-sm text-[#777]">
                        • 5 new topics relevant to your brand
                      </li>
                    </ul>
                    <h3 className="mt-2 text-md text-[#777]">
                      Upgrade to <b>track 100+ more prompts</b> and stay ahead
                      of competitors.
                    </h3>
                  </div>
                  <Button
                    className="border-none bg-white px-1 py-1 text-[#222] text-sm"
                    onClick={() => {
                      setModalOpen(false);
                      setAddPrompts(false);
                      setGeneratePrompts(false);
                      posthog.capture("prompts_cap_close");
                    }}
                    aria-label="Close"
                  >
                    <X className="h-2 w-2 text-[#999]" />
                  </Button>
                </div>
                <div className="mt-5 flex justify-between gap-2">
                  <Button
                    onClick={() => {
                      setModalOpen(false);
                      setAddPrompts(false);
                      setGeneratePrompts(false);
                      posthog.capture("prompts_cap_explore_suggested");
                      router.push("#suggested");
                    }}
                    className="rounded-lg border border-[#e4e4e4] bg-white px-4 py-2 text-[#222] shadow-sm text-sm"
                  >
                    Explore suggested
                  </Button>
                  <Button
                    onClick={() => {
                      setModalOpen(false);
                      setAddPrompts(false);
                      setGeneratePrompts(false);
                      posthog.capture("prompts_cap_start_upgrade");
                      router.push("#upgrade-plan");
                    }}
                    className="rounded-lg bg-[#171717] px-3 py-2 text-sm text-white"
                  >
                    Upgrade for more prompts
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
