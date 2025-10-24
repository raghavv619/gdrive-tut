"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { useUser } from "@clerk/nextjs";

export default function PostHogPageView(): null {
  const posthog = usePostHog();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (user?.id) {
      posthog.identify(user.id, {
        email: user.emailAddresses[0]?.emailAddress,
      });
    } else {
      posthog.reset();
    }
  }, [posthog, user, isLoaded]);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !posthog) return;

    let url = window.location.origin + pathname;
    const params = searchParams.toString();
    if (params) url += `?${params}`;

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, posthog]);

  return null;
}
