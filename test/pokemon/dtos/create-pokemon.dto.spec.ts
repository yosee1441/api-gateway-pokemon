import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CreatePokemonDto } from '@/pokemon/dtos/create-pokemon.dto';

describe('Pokemon DTO Validation in CreatePokemonDto', () => {
  it('should fail if required fields are missing', async () => {
    const invalidDto = plainToInstance(CreatePokemonDto, {});
    const errors = await validate(invalidDto);

    expect(errors).toHaveLength(3);
    expect(errors.map((e) => e.property)).toEqual(
      expect.arrayContaining(['name', 'type', 'level']),
    );
  });

  it('should validate successfully if all fields are valid', async () => {
    const validDto = plainToInstance(CreatePokemonDto, {
      name: 'Pikachu',
      type: 'Electric',
      level: 10,
    });

    const errors = await validate(validDto);

    expect(errors).toHaveLength(0);
  });

  it('should fail if level is not a positive number', async () => {
    const invalidDto = plainToInstance(CreatePokemonDto, {
      name: 'Pikachu',
      type: 'Electric',
      level: -5,
    });

    const errors = await validate(invalidDto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('level');
    expect(errors[0].constraints).toHaveProperty('min');
  });
});
