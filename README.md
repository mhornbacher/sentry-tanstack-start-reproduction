# sentry-reproduction

This is a Better-T-Stack project to demonstrate bugs in Sentry when using Tanstack Start.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

## Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/server/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:

```bash
pnpm run db:push
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
Use the Expo Go app to run the mobile application.
The API is running at [http://localhost:3000](http://localhost:3000).

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
