import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:3000", "https://hemanthbabu648.com"];

export function withCors(
  handler: (req: NextRequest) => Promise<NextResponse> | NextResponse
) {
  return async (req: NextRequest) => {
    const origin = req.headers.get("origin") || "";
    const isAllowed = allowedOrigins.includes(origin);

    // Handle preflight
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": isAllowed ? origin : "",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Actual request
    const response = await handler(req);

    response.headers.set(
      "Access-Control-Allow-Origin",
      isAllowed ? origin : ""
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  };
}
