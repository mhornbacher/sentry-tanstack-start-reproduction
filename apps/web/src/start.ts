// src/start.ts
import { createStart } from "@tanstack/react-start";
import { sentryMiddleware } from "./middleware/global/sentry";

export const startInstance = createStart(() => ({
  requestMiddleware: [sentryMiddleware],
}));
