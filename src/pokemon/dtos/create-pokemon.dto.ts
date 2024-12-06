import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  @Min(1)
  level: number;
}
