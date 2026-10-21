import { useState, type SyntheticEvent } from "react";
import posthog from "posthog-js";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ReportForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setStatus("submitting");
    posthog.capture("start_analyse_brand");

    try {
      //   // TODO: point this at your real endpoint
      //   const res = await fetch("/api/report", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email: value }),
      //   });
      //   if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      posthog.capture("report_requested");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="lg:w-[650px] mt-9 mb-2 grid grid-cols-3 items-center gap-2 text-center animate-in fade-in duration-300"
      >
        <div className="col-span-2">
          <p className="text-lg font-semibold text-foreground">
            Track your brands AI visibility improvements.
          </p>
          <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            Your report will arrive within 10 minutes.
          </p>
        </div>
        <Link
          href="/login"
          onClick={() => posthog.capture("start_self_serve_post_report")}
          className="h-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-lg font-semibold text-background transition hover:-translate-y-0.5 hover:opacity-85"
        >
          Start Free Trial <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="lg:w-[650px] lg:h-14 mt-9 mb-2 flex flex-col gap-3 sm:flex-row"
      >
        <Input
          type="email"
          name="email"
          autoComplete="email"
          required
          size={56}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          disabled={submitting}
          aria-invalid={!!error}
          aria-describedby={error ? "report-form-error" : undefined}
          className="h-full px-6 py-3 text-lg bg-white focus-visible:ring-0"
          placeholder="Enter your work email"
        />
        <Button
          type="submit"
          disabled={submitting}
          className="h-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-lg text-background transition hover:-translate-y-0.5 hover:opacity-85 disabled:pointer-events-none disabled:opacity-70"
        >
          {submitting ? (
            <>
              Analyzing <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Analyze my brand <Sparkles className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {error && (
        <p
          id="report-form-error"
          role="alert"
          className="mb-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <div>
        <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          * Marketers report a <span className="shimmer">23% increase</span> in
          brand visibility within the first four weeks
        </p>
      </div>
    </>
  );
}
