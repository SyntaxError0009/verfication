import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const locale = String(formData.get("locale") ?? "en");
  const res = NextResponse.redirect(new URL(request.headers.get("referer") ?? "/", request.url));
  res.cookies.set("LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}

