# sentry-reproduction

This is a Better-T-Stack project to demonstrate bugs in Sentry when using Tanstack Start.

## Reproduction Steps

1. Install the dependencies and set your environment:
    ```bash
    pnpm install
    cp .env.example .env
    ```
2. Start the related services (Postgres and Spotlight):
    ```bash
    pnpm run services:start
    pnpm run db:push # migrate database
    ```
3. Navigate to the `apps/web` directory and copy the example environment file:
    ```bash
    cd apps/web
    cp .env.example .env
    ```
4. Update the `.env` file with your Sentry DSN
5. Start the development server (within `apps/web`):
    ```bash
    pnpm run dev
    ```

## Project Structure

```
sentry-reproduction/
├── apps/
│   ├── web/         # Application (React + TanStack Start + Better-Auth + Hono)
│   └── native/      # Mobile application (React Native, Expo)
├── packages/
│   ├── api/         # API layer / business logic
│   ├── auth/        # Authentication configuration & logic
│   └── db/          # Database schema & queries
```

## Available Scripts

-   `pnpm run dev`: Start all applications in development mode
-   `pnpm run build`: Build all applications
-   `pnpm run dev:web`: Start only the web application
-   `pnpm run dev:server`: Start only the server
-   `pnpm run check-types`: Check TypeScript types across all apps
-   `pnpm run dev:native`: Start the React Native/Expo development server
-   `pnpm run db:push`: Push schema changes to database
-   `pnpm run db:studio`: Open database studio UI
-   `pnpm run check`: Run Biome formatting and linting
