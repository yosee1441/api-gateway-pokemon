import { validationExceptionFactory } from '@/common/exeptions/validation-exception.factory';
import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

describe('validationExceptionFactory', () => {
  it('should return a BadRequestException with the correct messages and codes', () => {
    const errors: ValidationError[] = [
      {
        property: 'name',
        constraints: { isNotEmpty: 'name should not be empty' },
        contexts: { isNotEmpty: { code: 'PO0001' } },
      },
    ];

    const exception = validationExceptionFactory(errors);

    expect(exception).toBeInstanceOf(BadRequestException);
    expect(exception.getResponse()).toEqual({
      error: 'Bad Request',
      message: [{ message: 'name should not be empty', code: 'PO0001' }],
      statusCode: 400,
    });
  });
});
