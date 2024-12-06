import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';
import { CATALOG } from '@/utils';

export class CreatePokemonDto {
  @IsNotEmpty({
    context: {
      code: CATALOG.PO0001,
    },
  })
  @IsString({
    context: {
      code: CATALOG.PO0002,
    },
  })
  name: string;

  @IsString({
    context: {
      code: CATALOG.PO0003,
    },
  })
  type: string;

  @IsNumber(
    {},
    {
      context: {
        code: CATALOG.PO0004,
      },
    },
  )
  @Min(1, {
    context: {
      code: CATALOG.PO0005,
    },
  })
  @Max(100, {
    context: {
      code: CATALOG.PO0006,
    },
  })
  level: number;
}
