import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from './config/app';
import { RequestModule } from './request/request.module';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(appConfig.mongoDbUrl),
    RequestModule,
    RavenModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor(),
    }
  ]
})
export class AppModule { }
