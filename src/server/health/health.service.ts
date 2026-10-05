import type { HealthStatus } from "@/types/health";

export function getHealthStatus(): HealthStatus {
  return {
    status: "ok",
    service: "issue-tracker-api",
  };
}
