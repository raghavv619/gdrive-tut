import posthog from 'posthog-js'
import { env } from '~/env';

posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/relay-pt9f",
  ui_host: 'https://us.posthog.com'
})