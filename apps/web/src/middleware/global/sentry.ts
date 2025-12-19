import * as Sentry from "@sentry/tanstackstart-react";
import { createMiddleware } from "@tanstack/react-start";

// TODO: Translate
const message =
  "An unexpected error occured on our servers. Our engineering team has been automatically notified and will be working on a fix as soon as possible. Please be patient and try again later.";

/** Global error handling middleware. Cleans the response to the user and records an exception in Sentry */
export const sentryMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    try {
      return await next();
    } catch (err) {
      // 1) report to Sentry
      Sentry.captureException(err, { level: "fatal" });

      // 2) customize the HTTP response
      const isApi = new URL(request.url).pathname.startsWith("/api/");
      if (isApi) {
        return new Response(JSON.stringify({ message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      // For non-API requests you can return HTML, redirect, etc.
      return new Response(message, { status: 500 });
    }
  }
);
