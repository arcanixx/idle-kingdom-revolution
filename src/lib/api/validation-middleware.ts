import { NextRequest, NextResponse } from "next/server";
import { ZodSchema, ZodError } from "zod";
import type { ValidationErrorResponse } from "@/lib/validation/schemas";
import { logger } from "@/lib/logger";

export async function validateRequest<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<
  | { success: true; data: T }
  | { success: false; response: NextResponse<ValidationErrorResponse> }
> {
  if (request.method === "GET" || request.method === "HEAD") {
    return { success: true, data: {} as T };
  }

  try {
    const body = await request.json();
    const parsed = schema.parse(body);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.errors.map((err) => ({
        field: err.path.join(".") || "unknown",
        message: err.message,
      }));
      logger.warn("Validation failed", "lib/api/validation-middleware.ts", "validateRequest", { details, method: request.method, url: request.url });
      return {
        success: false,
        response: NextResponse.json(
          { error: "Validation failed", details },
          { status: 400 }
        ),
      };
    }
    logger.warn("Invalid request body (JSON parse error)", "lib/api/validation-middleware.ts", "validateRequest", { method: request.method, url: request.url });
    return {
      success: false,
      response: NextResponse.json(
        { error: "Invalid request body", details: [{ field: "body", message: "Could not parse JSON" }] },
        { status: 400 }
      ),
    };
  }
}

export function validateQuery<T>(
  request: NextRequest,
  schema: ZodSchema<T>
):
  | { success: true; data: T }
  | { success: false; response: NextResponse<ValidationErrorResponse> } {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const parsed = schema.parse(params);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.errors.map((err) => ({
        field: err.path.join(".") || "unknown",
        message: err.message,
      }));
      logger.warn("Query validation failed", "lib/api/validation-middleware.ts", "validateQuery", { details, url: request.url });
      return {
        success: false,
        response: NextResponse.json(
          { error: "Invalid query parameters", details },
          { status: 400 }
        ),
      };
    }
    return {
      success: false,
      response: NextResponse.json(
        { error: "Invalid query parameters", details: [{ field: "query", message: "Could not parse parameters" }] },
        { status: 400 }
      ),
    };
  }
}

export async function withErrorHandler<T>(
  handler: () => Promise<NextResponse<T>>,
  route: string = "unknown"
): Promise<NextResponse<T | { error: string }>> {
  try {
    return await handler();
  } catch (error) {
    logger.error("API Error", "lib/api/validation-middleware.ts", `withErrorHandler:${route}`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function withValidatedRequest<T, R>(
  request: NextRequest,
  schema: ZodSchema<T>,
  handler: (data: T) => Promise<NextResponse<R>>,
  route: string = "unknown"
): Promise<NextResponse<R | ValidationErrorResponse | { error: string }>> {
  const validation = await validateRequest(request, schema);
  if (!validation.success) {
    return validation.response as NextResponse<ValidationErrorResponse>;
  }
  return withErrorHandler(() => handler(validation.data), route);
}
