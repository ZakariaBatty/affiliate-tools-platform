"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

interface ClientSessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

export default function ClientSessionProvider({ children, session }: ClientSessionProviderProps) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
}
