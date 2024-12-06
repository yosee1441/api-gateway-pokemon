import { HttpExceptionFilter } from '@/common/exeptions/http-exception.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  it('should format HttpException correctly', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockHost = {
      switchToHttp: jest.fn(() => ({
        getResponse: () => mockResponse,
      })),
    } as unknown as ArgumentsHost;

    const exception = new HttpException(
      { message: 'Validation failed' },
      HttpStatus.BAD_REQUEST,
    );

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: [],
      notifications: ['Validation failed'],
    });
  });

  it('should handle non-HttpException errors correctly', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockHost = {
      switchToHttp: jest.fn(() => ({
        getResponse: () => mockResponse,
      })),
    } as unknown as ArgumentsHost;

    const exception = new Error('Unknown error');

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: [],
      notifications: ['Unknown error'],
    });
  });

  it('should handle exceptions with array messages correctly', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockHost = {
      switchToHttp: jest.fn(() => ({
        getResponse: () => mockResponse,
      })),
    } as unknown as ArgumentsHost;

    const exception = new HttpException(
      { message: ['Error 1', 'Error 2'] },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: [],
      notifications: ['Error 1', 'Error 2'],
    });
  });

  it('should handle exceptions with no message correctly', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockHost = {
      switchToHttp: jest.fn(() => ({
        getResponse: () => mockResponse,
      })),
    } as unknown as ArgumentsHost;

    const exception = new HttpException(
      'Internal server error',
      HttpStatus.NOT_FOUND,
    );

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: [],
      notifications: ['Internal server error'],
    });
  });
});
