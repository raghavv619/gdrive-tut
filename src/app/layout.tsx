import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProviderWrapper } from "./_providers/posthog_provider";

export const metadata: Metadata = {
  title: "Raghav's Google-Drive",
  description: "Google Drive Clone Project!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${geist.variable}`}>
      <body>
      <PostHogProviderWrapper>{children}
        </PostHogProviderWrapper>
      </body>
    </html>
    </ClerkProvider>
  );
}
