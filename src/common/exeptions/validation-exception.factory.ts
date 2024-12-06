import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function validationExceptionFactory(
  errors: ValidationError[],
): BadRequestException {
  const messages = errors.map((error) => {
    const constraints = error.constraints || {};
    const contextEntries = Object.entries(constraints).map(([key, message]) => {
      const code = error.contexts?.[key]?.code || 'UNKNOWN_ERROR';
      return {
        message,
        code,
      };
    });
    return contextEntries;
  });

  return new BadRequestException(messages.flat());
}
