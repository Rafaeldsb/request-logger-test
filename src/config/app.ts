export const appConfig = {
  mongoDbUrl: process.env.MONGODB_URL,
  sentryDsn: process.env.SENTRY_DSN,
} as const;