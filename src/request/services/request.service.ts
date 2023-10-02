import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Request } from '../schemas/request.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRequestDto } from '../dto/create-request.dto';
import { Pagination } from 'request/dto/pagination.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private readonly requestModel: Model<Request>,
  ) {}

  public async create(data: CreateRequestDto): Promise<Request> {
    return await this.requestModel.create(data);
  }

  public async findAll(
    page: number,
    perPage: number,
  ): Promise<Pagination<Request>> {
    const skip = (page - 1) * perPage;

    const [data, totalItems] = await Promise.all([
      this.requestModel
        .find()
        .sort({ timestamp: 'desc' })
        .skip(skip)
        .limit(perPage)
        .exec(),
      this.requestModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    return {
      totalItems,
      currentPage: +page,
      totalPages,
      data,
    };
  }
}
