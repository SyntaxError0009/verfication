import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, name, password } = (await request.json()) as {
    email: string;
    name?: string;
    password: string;
  };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email in use" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, name, hashedPassword: hashed } });
  return NextResponse.json({ ok: true });
}

