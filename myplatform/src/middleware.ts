import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Basic subdomain multi-tenant routing scaffold
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = new URL(request.url);

  // Ignore static assets and Next internals
  const pathname = url.pathname;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/webhooks") ||
    pathname.startsWith("/api/stripe") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const primaryDomain = process.env.PRIMARY_DOMAIN ?? "localhost:3000";
  if (!host.endsWith(primaryDomain)) {
    return NextResponse.next();
  }

  const subdomain = host.replace(`.${primaryDomain}`, "");

  if (subdomain && subdomain !== "www" && subdomain !== "localhost") {
    // Rewrite to site viewer route
    const rewriteUrl = new URL(`/s/${subdomain}${pathname}`, request.url);
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/webhooks|api/stripe).*)",
  ],
};

