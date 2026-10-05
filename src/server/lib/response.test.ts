import { describe, expect, it } from "vitest";
import { badRequest, notFound, ok, serverError } from "./response";

describe("response helpers", () => {
  it("ok returns success payload", async () => {
    const response = ok({ status: "ok" }, 200);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      data: { status: "ok" },
    });
  });

  it("badRequest returns 400", async () => {
    const response = badRequest("Invalid input");
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Invalid input",
    });
  });

  it("notFound returns 404", async () => {
    const response = notFound("Missing");
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Missing",
    });
  });

  it("serverError returns 500", async () => {
    const response = serverError();
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Internal server error",
    });
  });
});
