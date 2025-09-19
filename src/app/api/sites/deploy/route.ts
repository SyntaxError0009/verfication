import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type DeployBody = {
  userId: string;
  name: string;
  schema: unknown;
};

export async function POST(request: Request) {
  const { userId, name, schema } = (await request.json()) as DeployBody;

  // Very simplified: create site, assign random subdomain, create one page with schema
  const subdomain = `${Math.random().toString(36).slice(2, 8)}`;
  await prisma.site.create({
    data: {
      ownerId: userId,
      name,
      subdomain,
      status: "ACTIVE",
      pages: {
        create: [
          {
            name: "Home",
            slug: "index",
            content: (schema as object) ?? {},
            order: 0,
          },
        ],
      },
    },
  });

  return NextResponse.json({ url: `https://${subdomain}.${process.env.PRIMARY_DOMAIN ?? "localhost:3000"}` });
}

