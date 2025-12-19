import { auth } from "@sentry-reproduction/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(cloneRequest(request)),
      POST: ({ request }) => auth.handler(cloneRequest(request)),
    },
  },
});

// fix incompatible request from undici on Node.js runtimes
// required for request.clone() to work properly when expo contacts the api
function cloneRequest(request: Request) {
  // Rebuild into a fresh native Request instance (fixes Proxy/wrapper issues)
  // return new Request(req.url, req);

  const cleanRequest = new Request(request.url, {
    method: request.method,
    headers: request.headers,
    // Passing the body as a stream requires 'duplex: half' in modern Node
    body: request.body,
    // @ts-expect-error - duplex is required for Node.js fetch but not in standard TS types yet
    duplex: "half",
  });
  return cleanRequest;
}
