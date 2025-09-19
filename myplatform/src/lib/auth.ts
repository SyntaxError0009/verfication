import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.hashedPassword) return null;
        const valid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!valid) return null;
        return { id: user.id, email: user.email ?? undefined, name: user.name ?? undefined } as { id: string; email?: string; name?: string };
      },
    }),
  ],
  pages: {},
  debug: false,
};

// v5 handler will be used in API route directly

