import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseInterceptor],
    }).compile();

    interceptor = module.get<ResponseInterceptor<any>>(ResponseInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should transform response to match the format { data, notifications }', async () => {
    const mockData = { key: 'value' };

    const mockContext = {} as ExecutionContext;
    const mockCallHandler = {
      handle: () => of(mockData),
    } as CallHandler;

    const result = await interceptor
      .intercept(mockContext, mockCallHandler)
      .toPromise();

    expect(result).toEqual({
      data: mockData,
      notifications: [],
    });
  });
});
