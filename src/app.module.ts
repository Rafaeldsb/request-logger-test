import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from './config/app';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    MongooseModule.forRoot(appConfig.mongoDbUrl),
    RequestModule,
  ],
})
export class AppModule { }
