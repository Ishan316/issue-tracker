import { badRequest, notFound, serverError } from "@/server/lib/response";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    if (error.statusCode === 400) {
      return badRequest(error.message);
    }

    if (error.statusCode === 404) {
      return notFound(error.message);
    }

    return serverError(error.message);
  }

  console.error(error);
  return serverError();
}
