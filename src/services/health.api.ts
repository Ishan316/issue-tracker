import { appConfig } from "@/config/app";
import type { HealthStatus } from "@/types/health";
import type { ApiResponse } from "@/types/api";

export async function fetchHealthStatus(): Promise<HealthStatus> {
  const response = await fetch(`${appConfig.apiBaseUrl}/health`, {
    cache: "no-store",
  });

  const json = (await response.json()) as ApiResponse<HealthStatus>;

  if (!response.ok || !json.success) {
    const message = json.success ? "Health check failed" : json.error;
    throw new Error(message);
  }

  return json.data;
}
