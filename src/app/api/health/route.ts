import { handleApiError } from "@/server/lib/errors";
import { ok } from "@/server/lib/response";
import { getHealthStatus } from "@/server/health/health.service";

export async function GET() {
  try {
    return ok(getHealthStatus());
  } catch (error) {
    return handleApiError(error);
  }
}
