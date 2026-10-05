import { Button } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section className="rounded-2xl border border-navy-light/30 bg-navy p-6 sm:p-10">
      <p className="mb-3 text-sm font-medium uppercase tracking-wide text-accent">
        Issue Tracker
      </p>
      <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
        Your project is ready to build on
      </h1>
      <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
        Next.js, TypeScript, and Tailwind are configured with a navy and yellow
        theme, modular folders, and a mobile-first layout. Add issue workflows
        when you are ready.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button">Create issue (coming soon)</Button>
        <Button type="button" variant="ghost">
          View board (coming soon)
        </Button>
      </div>
    </section>
  );
}
