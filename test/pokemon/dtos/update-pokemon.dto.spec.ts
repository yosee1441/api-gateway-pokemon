import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { UpdatePokemonDto } from '@/pokemon/dtos/update-pokemon.dto';

describe('Pokemon DTO Validation in UpdatePokemonDto', () => {
  it('should fail if no fields are provided', async () => {
    const invalidDto = plainToInstance(UpdatePokemonDto, {});
    const errors = await validate(invalidDto);

    expect(errors).toHaveLength(0);
  });

  it('should validate successfully if valid fields are provided', async () => {
    const validDto = plainToInstance(UpdatePokemonDto, {
      name: 'Raichu',
      level: 20,
    });

    const errors = await validate(validDto);

    expect(errors).toHaveLength(0);
  });

  it('should fail if "name" is not a string', async () => {
    const dto = plainToInstance(UpdatePokemonDto, { name: 123 });
    const errors = await validate(dto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('name');
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail if "type" is not a string', async () => {
    const dto = plainToInstance(UpdatePokemonDto, { type: 123 });
    const errors = await validate(dto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('type');
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail if "level" is out of range', async () => {
    const dto = plainToInstance(UpdatePokemonDto, { level: 150 });
    const errors = await validate(dto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('level');
    expect(errors[0].constraints).toHaveProperty('max');
  });
});
