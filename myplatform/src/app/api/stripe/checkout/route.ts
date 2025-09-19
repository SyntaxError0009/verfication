import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { plan = "pro_monthly", userId } = (await request.json().catch(() => ({}))) as {
    plan: string;
    userId?: string;
  };

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  if (!stripeKey) return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });

  const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });

  let customerId: string | undefined;
  if (userId) {
    const sub = await prisma.subscription.findFirst({ where: { userId } });
    customerId = sub?.stripeCustomerId ?? undefined;
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [
      {
        price: plan === "pro_yearly" ? process.env.STRIPE_PRICE_YEARLY : process.env.STRIPE_PRICE_MONTHLY,
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/success`,
    cancel_url: `${appUrl}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}

