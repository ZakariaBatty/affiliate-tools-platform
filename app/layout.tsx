import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { constructMetadata } from "@/lib/seo-config";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/provider/theme-provider";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Toaster } from "@/components/ui/toaster";
import ClientSessionProvider from "@/components/components/ClientSessionProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  console.log("Server Session:", session);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className={`min-h-screen bg-black font-sans antialiased ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ClientSessionProvider session={session}>
            <main className="flex-1">{children}</main>
            <Toaster />
          </ClientSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
