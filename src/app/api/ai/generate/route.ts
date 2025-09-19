import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, type, locale } = body as {
      prompt: string;
      type: "site" | "system";
      locale: string;
    };

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 },
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const system =
      type === "system"
        ? "You are an expert product designer and full-stack system analyst creating POS/inventory/invoicing systems."
        : "You are an expert brand web designer creating premium, modern, minimal, mobile-first sites.";

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: `Locale: ${locale}. Create a JSON schema for pages and components with copy in the requested languages, minimalistic premium style, with navigation, hero, features, pricing, and contact for websites; or entities, tables, and UI flows for systems. User request: ${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content ?? "{}";

    return NextResponse.json({ schema: content });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unknown error" },
      { status: 500 },
    );
  }
}

