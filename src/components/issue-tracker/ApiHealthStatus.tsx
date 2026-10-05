"use client";

import { Badge } from "@/components/ui/Badge";
import { fetchHealthStatus } from "@/services/health.api";
import type { HealthStatus } from "@/types/health";
import { useEffect, useState } from "react";

type LoadState =
  | { kind: "loading" }
  | { kind: "ok"; data: HealthStatus }
  | { kind: "error"; message: string };

export function ApiHealthStatus() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetchHealthStatus()
      .then((data) => {
        if (!cancelled) {
          setState({ kind: "ok", data });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : "Unable to reach API";
          setState({ kind: "error", message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.kind === "loading") {
    return (
      <section className="rounded-xl border border-navy-light/30 bg-navy-dark/60 p-4 sm:p-5">
        <p className="text-sm text-white/70">Checking API connection…</p>
      </section>
    );
  }

  if (state.kind === "error") {
    return (
      <section className="rounded-xl border border-red-400/40 bg-navy-dark/60 p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-red-300">API offline</p>
            <p className="text-sm text-white/70">{state.message}</p>
          </div>
          <Badge tone="navy">GET /api/health</Badge>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-accent/30 bg-navy-dark/60 p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">API connected</p>
          <p className="text-sm text-white/80">
            {state.data.service} · status {state.data.status}
          </p>
        </div>
        <Badge tone="accent">GET /api/health</Badge>
      </div>
    </section>
  );
}
