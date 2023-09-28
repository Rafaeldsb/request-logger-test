export class CreateRequestDto {
  public readonly path: string;
  public readonly ip: string;
  public readonly agent: string;
  public readonly host: string;
  public readonly timestamp: string;

  constructor(data: CreateRequestDto) {
    Object.assign(this, data);
  }
}
