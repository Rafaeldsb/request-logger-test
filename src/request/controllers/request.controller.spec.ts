import { Test, TestingModule } from '@nestjs/testing';
import { RequestController } from './request.controller';
import { RequestService } from '../services/request.service';

describe('Request Controller', () => {
  let controller: RequestController;
  let service: RequestService;

  const mockRequest = {
    host: 'test.com',
    path: 'POST /v1/requests',
    agent: 'agent-test',
    ip: '0.0.0.0',
    timestamp: new Date('2023-09-28T00:00:00Z'),
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestController],
      providers: [
        {
          provide: RequestService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockRequest, mockRequest]),
            create: jest.fn().mockResolvedValue(mockRequest),
          },
        },
      ],
    }).compile();

    controller = module.get<RequestController>(RequestController);
    service = module.get<RequestService>(RequestService);
  });

  describe('create()', () => {
    it('should create a new request', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockRequest);

      await controller.createRequest(
        {
          host: 'test.com',
          'user-agent': 'agent-test',
        },
        '0.0.0.0',
        { path: '/v1/requests', method: 'POST' },
      );

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          host: 'test.com',
          path: 'POST /v1/requests',
          agent: 'agent-test',
          ip: '0.0.0.0',
        }),
      );
    });
  });

  describe('getRequests()', () => {
    it('should return an array of requests', async () => {
      expect(controller.getRequests()).resolves.toEqual([
        mockRequest,
        mockRequest,
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
