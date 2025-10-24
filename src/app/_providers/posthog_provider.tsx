"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { env } from "~/env";

const SuspendedPostHogPageView = dynamic(() => import("./pageview-tracker"), {
  ssr: false,
});

export function PostHogProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!env.NEXT_PUBLIC_POSTHOG_KEY) return;

    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/relay-pt9f",
      ui_host: "https://us.posthog.com",
      capture_pageview: false,
    });
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PostHogProvider>
  );
}
