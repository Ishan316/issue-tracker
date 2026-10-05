import { ApiHealthStatus } from "@/components/issue-tracker/ApiHealthStatus";
import { HomeHero } from "@/components/issue-tracker/HomeHero";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <HomeHero />
      <ApiHealthStatus />
    </div>
  );
}
