import * as Sentry from "@sentry/tanstackstart-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import "./index.css";
import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";
import { orpc, queryClient } from "./utils/orpc";

export const getRouter = () => {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { orpc, queryClient },
    defaultPendingComponent: () => <Loader />,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  if (!router.isServer) {
    console.log("Initializing Sentry in router.tsx");
    console.log("dsn:", import.meta.env.VITE_SENTRY_DSN);
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,

      // Adds request headers and IP for users, for more info visit:
      // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
      sendDefaultPii: true,

      // send logs
      enableLogs: true,

      tracesSampleRate: 1.0,

      spotlight: process.env.NODE_ENV === "development",
      environment: process.env.NODE_ENV || "production",

      integrations: [
        Sentry.tanstackRouterBrowserTracingIntegration(router),
        Sentry.replayIntegration(),
        Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
        Sentry.feedbackIntegration({
          // Additional SDK configuration goes in here, for example:
          colorScheme: "system",
        }),
      ],

      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 1.0,
    });
  }

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
