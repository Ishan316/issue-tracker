import { describe, expect, it } from "vitest";
import { getHealthStatus } from "./health.service";

describe("getHealthStatus", () => {
  it("returns ok status for issue-tracker-api", () => {
    expect(getHealthStatus()).toEqual({
      status: "ok",
      service: "issue-tracker-api",
    });
  });
});
