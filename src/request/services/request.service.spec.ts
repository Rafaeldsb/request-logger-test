import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Request } from '../schemas/request.schema';
import { RequestService } from './request.service';

const mockRequest = {
  host: 'test.com',
  path: 'POST /v1/requests',
  agent: 'agent-test',
  ip: '0.0.0.0',
  timestamp: new Date('2023-09-28T00:00:00Z'),
  _id: 'a id',
};

describe('RequestService', () => {
  let service: RequestService;
  let model: Model<Request>;

  const requestsMock = [mockRequest, mockRequest];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestService,
        {
          provide: getModelToken(Request.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockRequest),
            constructor: jest.fn().mockResolvedValue(mockRequest),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RequestService>(RequestService);
    model = module.get<Model<Request>>(getModelToken(Request.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all requests', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(requestsMock),
        }),
      }),
    } as any);
    const requests = await service.findAll();
    expect(requests).toEqual(requests);
  });

  it('should insert a new request', async () => {
    jest.spyOn(model, 'create').mockResolvedValue(mockRequest as any);
    const newRequest = await service.create({
      host: 'test.com',
      path: 'POST /v1/requests',
      agent: 'agent-test',
      ip: '0.0.0.0',
      timestamp: '2023-09-28T00:00:00Z',
    });
    expect(newRequest).toEqual(mockRequest);
  });
});
