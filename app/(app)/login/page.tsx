"use client";
import { FormEvent, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Logo from "@/components/custom/Logo";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarSrc: string;
};

type Stat = {
  value: string;
  label: string;
};

type LoginCalloutProps = {
  headline?: string;
  headlineMuted?: string;
  testimonial?: Testimonial;
  stat?: Stat;
};

const DEFAULT_TESTIMONIAL: Testimonial = {
  quote:
    "Metrics like brand mentions, impressions, and sentiment are hard to track - which is why Peec AI is so powerful: it shows how LLMs are framing our brand.",
  name: "Lily Ray",
  role: "VP SEO Strategy",
  company: "Amsive",
  avatarSrc: "/lily.avif",
};

const DEFAULT_STAT: Stat = {
  value: "+4.3×",
  label: "Increase in AI brand sentiment over 6 months",
};

/* ---------- Right pane ---------- */
function LoginCallout({
  headline = "See how AI",
  headlineMuted = "talks about your brand.",
  testimonial = DEFAULT_TESTIMONIAL,
  stat = DEFAULT_STAT,
}: LoginCalloutProps) {
  const words = testimonial.quote.split(" ");

  return (
    <aside
      aria-label="What customers say"
      className="relative flex h-full min-h-screen items-center overflow-hidden border-l border-neutral-200 bg-neutral-100 p-12 text-neutral-900 xl:p-16"
    >
      {/* Dot-matrix texture fading up from the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#d4d4d4_1px,transparent_1.3px)] bg-[size:9px_9px] [mask-image:linear-gradient(to_top,#000,transparent_45%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[560px] flex-col gap-3">
        <h2 className="mb-5 text-[clamp(28px,3vw,40px)] font-medium leading-[1.08] tracking-[-0.035em]">
          {headline} <span className="text-neutral-400">{headlineMuted}</span>
        </h2>

        {/* Testimonial card */}
        <figure className="m-0 rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)]">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-[13px] font-medium text-neutral-600">
              {testimonial.company}
            </span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-[22px] fill-neutral-200"
            >
              <path d="M10 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H5v2h1a4 4 0 0 0 4-4V7Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7Z" />
            </svg>
          </div>

          <blockquote className="m-0 text-[clamp(18px,1.6vw,22px)] font-medium leading-[1.42] tracking-[-0.012em]">
            {words.map((word, i) => (
              <span
                key={i}
                className="text-neutral-400 animate-reveal motion-reduce:animate-none motion-reduce:text-neutral-900"
                style={{ animationDelay: `${i * 45 + 200}ms` }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </blockquote>

          <figcaption className="mt-7 flex items-center gap-3">
            <Image
              src={testimonial.avatarSrc}
              alt=""
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{testimonial.name}</p>
              <p className="mt-0.5 text-sm text-neutral-500">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </figcaption>
        </figure>

        {/* Stat card with dot-matrix corner */}
        {stat && (
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 px-8 py-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#c7c7c7_1.2px,transparent_1.5px)] bg-[size:8px_8px] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_55%)]"
            />
            <p className="relative text-[clamp(48px,5vw,72px)] font-medium leading-none tracking-[-0.05em]">
              {stat.value}
            </p>
            <p className="relative mt-7 text-[15px] text-neutral-600">
              {stat.label}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

/* ---------- Page ---------- */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#171717] lg:grid lg:grid-cols-2">
      {/* Left: login form */}
      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-[clamp(3rem,10vw,9rem)] lg:py-12">
        <Logo />
        <div className="my-auto w-full max-w-[480px] py-16">
          <p className="mb-5 text-sm font-medium text-[#777]">Welcome back</p>
          <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Sign in to peec AI
          </h1>
          <p className="mt-4 text-base text-[#777]">
            Continue tracking how AI search sees your brand.
          </p>
          <form className="mt-9" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Work email
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubmitted(false);
                }}
                placeholder="name@company.com"
                className="h-12 min-w-0 flex-1 rounded-xl border border-[#d9d9d9] bg-white px-4 text-base outline-none transition placeholder:text-[#aaa] focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/10"
              />
              <button
                type="submit"
                className="h-12 rounded-xl bg-[#171717] px-5 text-sm font-semibold text-white transition hover:bg-[#333]"
              >
                Continue <ArrowUpRight className="ml-1 inline h-4 w-4" />
              </button>
            </div>
            {submitted && (
              <p className="mt-3 text-sm text-[#4a7c59]">
                Thanks — check your inbox to continue.
              </p>
            )}
          </form>
        </div>
        <footer className="flex items-center justify-between gap-4 border-t border-[#e6e6e2] pt-5 text-xs text-[#888]">
          <span>© 2026 peec AI</span>
          <div className="flex items-center gap-4">
            <a href="#privacy">Privacy</a>
            <button type="button">
              English <ChevronDown className="ml-1 inline h-3 w-3" />
            </button>
          </div>
        </footer>
      </section>

      {/* Right: marketing callout (desktop only) */}
      <section className="hidden lg:block">
        <LoginCallout />
      </section>
    </main>
  );
}
