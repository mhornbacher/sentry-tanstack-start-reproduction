/** biome-ignore-all lint/suspicious/useStaticResponseMethods: Testing Sentry errors */
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/sentry-example")({
  server: {
    handlers: {
      GET: () => {
        console.warn(
          "About to throw a test Sentry error from /api/sentry-example"
        );
        throw new Error("This is a test Sentry error from /api/sentry-example");
        //   new Response(JSON.stringify({ message: "Testing Sentry Error..." }), {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }),
        // },
        // },
      },
    },
  },
});
