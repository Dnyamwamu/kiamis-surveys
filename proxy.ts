import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter for demo purposes
// In production, use Redis or a similar store
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests per minute

export function proxy(request: NextRequest) {
  const ip = (request as any).ip ?? "127.0.0.1";
  const now = Date.now();

  // Basic Rate Limiting for sensitive routes
  if (request.nextUrl.pathname.startsWith("/api") || request.nextUrl.pathname.startsWith("/login")) {
    const rateData = rateLimitMap.get(ip) ?? { count: 0, lastReset: now };

    if (now - rateData.lastReset > RATE_LIMIT_WINDOW_MS) {
      rateData.count = 1;
      rateData.lastReset = now;
    } else {
      rateData.count++;
    }

    rateLimitMap.set(ip, rateData);

    if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
  }

  const response = NextResponse.next();

  // Security Headers
  // Content Security Policy (CSP)
  // Note: Adjust according to your external assets (Leaflet, etc.)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.tile.openstreetmap.org https://cdnjs.cloudflare.com;
    style-src 'self' 'unsafe-inline' https://*.tile.openstreetmap.org https://fonts.googleapis.com https://cdnjs.cloudflare.com;
    img-src 'self' data: blob: https://*.tile.openstreetmap.org https://raw.githubusercontent.com https://server.arcgisonline.com https://*.tile.opentopomap.org https://*.tile.openstreetmap.fr;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.kalro.org;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s{2,}/g, " ").trim();

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=*, interest-cohort=()");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
