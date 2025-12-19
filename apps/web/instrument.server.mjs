import * as Sentry from "@sentry/tanstackstart-react";

console.log("Initializing Sentry in instrument.server.mjs");
console.log("dsn:", process.env.VITE_SENTRY_DSN);

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,

  // enable logging
  enableLogs: true,

  tracesSampleRate: 1.0,

  integrations: [
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  spotlight: process.env.NODE_ENV === "development",
  environment: process.env.NODE_ENV || "production",
});
