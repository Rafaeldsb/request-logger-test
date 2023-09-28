import * as Sentry from "@sentry/node";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ProfilingIntegration } from '@sentry/profiling-node';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { appConfig } from './config/app';

async function bootstrap() {

  const server = express();

  Sentry.init({
    dsn: appConfig.sentryDsn,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app: server }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
