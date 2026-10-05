import { appConfig } from "@/config/app";
import { Badge } from "@/components/ui/Badge";

export function AppHeader() {
  return (
    <header className="border-b border-navy-light/40 bg-navy-dark">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent font-bold text-navy-dark"
          >
            IT
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-white">
              {appConfig.appName}
            </p>
            <p className="truncate text-sm text-accent-light/90">
              Track and resolve work items
            </p>
          </div>
        </div>
        <Badge tone="accent">API ready</Badge>
      </div>
    </header>
  );
}
