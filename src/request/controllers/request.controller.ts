import { Request as ExpressRequest, Controller, Get, Headers, Ip, Post } from '@nestjs/common';
import { RequestService } from '../services/request.service';
import { CreateRequestDto } from '../dto/create-request.dto';
import { Request } from '../schemas/request.schema';
import { urlToHttpOptions } from 'url';


@Controller('/v1/requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Get()
  public async getRequests(): Promise<Request[]> {
    return this.requestService.findAll();
  }

  @Post()
  public async createRequest(@Headers() headers, @Ip() ip, @ExpressRequest() req): Promise<Request> {
    return await this.requestService.create(new CreateRequestDto({
      agent: headers['user-agent'],
      host: headers.host,
      path: `${req.method} ${req.path}`,
      timestamp: new Date().toISOString(),
      ip,
    }));
  }
}
