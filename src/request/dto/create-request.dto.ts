import { IsIP } from 'class-validator';

export class CreateRequestDto {
  public readonly path: string;
  public readonly ip: string;
  public readonly agent: string;
  public readonly host: string;
  public readonly timestamp: Date;

  constructor(data: CreateRequestDto) {
    Object.assign(this, data);
  }
}