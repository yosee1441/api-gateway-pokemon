import {
  Inject,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { POKEMON_SERVICE } from '@/utils';
import { CreatePokemonDto, UpdatePokemonDto } from './dtos';

@Controller('pokemon')
export class PokemonController {
  constructor(
    @Inject(POKEMON_SERVICE) private readonly userClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() dto: CreatePokemonDto) {
    return this.userClient.send({ cmd: 'createPokemon' }, dto);
  }

  @Get()
  findAll() {
    return this.userClient.send({ cmd: 'findAllPokemons' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userClient.send({ cmd: 'findOnePokemon' }, { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePokemonDto) {
    return this.userClient.send({ cmd: 'updatePokemon' }, { id, dto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userClient.send({ cmd: 'removePokemon' }, { id });
  }
}
