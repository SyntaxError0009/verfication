import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!secret || !stripeSecret) {
    return NextResponse.json({ ok: true });
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  const stripe = new Stripe(stripeSecret);
  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const stripeSubscriptionId = sub.id;
        const stripeCustomerId = sub.customer as string;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId },
          data: {
            status: sub.status === "active" ? "ACTIVE" : sub.status === "past_due" ? "PAST_DUE" : sub.status === "canceled" ? "CANCELED" : "INACTIVE",
            currentPeriodEnd: (sub as unknown as { current_period_end?: number }).current_period_end
              ? new Date(((sub as unknown as { current_period_end?: number }).current_period_end as number) * 1000)
              : null,
            stripeCustomerId,
          },
        });
        break;
      }
      default:
        break;
    }
  } catch (e) {
    const message = (e as Error).message;
    // swallow to avoid noisy logs in dev
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

