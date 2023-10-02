import {
  Request as ExpressRequest,
  Controller,
  Get,
  Headers,
  Ip,
  Post,
  Query,
} from '@nestjs/common';
import { RequestService } from '../services/request.service';
import { CreateRequestDto } from '../dto/create-request.dto';
import { Request } from '../schemas/request.schema';
import { Pagination } from 'request/dto/pagination.dto';

@Controller('/v1/requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Get()
  public async getRequests(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 50,
  ): Promise<Pagination<Request>> {
    return this.requestService.findAll(page, perPage);
  }

  @Post()
  public async createRequest(
    @Headers() headers,
    @Ip() ip,
    @ExpressRequest() req,
  ): Promise<Request> {
    return await this.requestService.create(
      new CreateRequestDto({
        agent: headers['user-agent'],
        host: headers.host,
        path: `${req.method} ${req.path}`,
        timestamp: new Date().toISOString(),
        ip: headers['x-forwarded-for'] ?? ip,
      }),
    );
  }
}
