MyPlatform: AI builder for modern websites and POS systems, localized for Kurdistan.

## Getting Started

Environment:

1. Copy `.env.example` to `.env.local` and fill values.
2. Set `DATABASE_URL` to your PostgreSQL.
3. Run migrations and generate Prisma client:

```bash
npx prisma migrate dev --name init
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

Stripe:

- Set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and price IDs `STRIPE_PRICE_MONTHLY` and `STRIPE_PRICE_YEARLY`.

OpenAI:

- Set `OPENAI_API_KEY` for AI preview generation.
