import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Request } from '../schemas/request.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRequestDto } from '../dto/create-request.dto';

@Injectable()
export class RequestService {
  constructor(@InjectModel(Request.name) private readonly requestModel: Model<Request>) { }

  public async create(data: CreateRequestDto): Promise<Request> {
    return await this.requestModel.create(data);
  }

  public async findAll(): Promise<Request[]> {
    return await this.requestModel.find().sort({ timestamp: 'desc' }).exec();
  }
}