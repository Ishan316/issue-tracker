import { describe, expect, it, vi } from "vitest";
import { AppError, handleApiError } from "./errors";

describe("handleApiError", () => {
  it("maps AppError 400 to bad request", async () => {
    const response = handleApiError(new AppError(400, "Bad payload"));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Bad payload",
    });
  });

  it("maps AppError 404 to not found", async () => {
    const response = handleApiError(new AppError(404, "Missing issue"));
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Missing issue",
    });
  });

  it("maps unknown AppError status to server error", async () => {
    const response = handleApiError(new AppError(503, "Unavailable"));
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Unavailable",
    });
  });

  it("maps unknown errors to generic server error", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const response = handleApiError(new Error("Unexpected"));
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Internal server error",
    });
    errorSpy.mockRestore();
  });
});
