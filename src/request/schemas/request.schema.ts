import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RequestDocment = HydratedDocument<Request>;

@Schema()
export class Request {
  @Prop()
  path: string;

  @Prop()
  ip: string;

  @Prop()
  agent: string;

  @Prop()
  host: string;

  @Prop()
  timestamp: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
