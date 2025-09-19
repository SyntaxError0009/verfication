import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const entries = await prisma.contentEntry.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const { key, value } = (await request.json()) as { key: string; value: string };
  const upserted = await prisma.contentEntry.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
  return NextResponse.json({ entry: upserted });
}

