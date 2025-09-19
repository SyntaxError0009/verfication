// This file augments next-auth types.

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role?: string;
    };
  }
}

