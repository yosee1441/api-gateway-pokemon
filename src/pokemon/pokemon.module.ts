import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PokemonController } from './pokemon.controller';
import { POKEMON_SERVICE } from '@/utils';
import { envs } from '@/common/config';

@Module({
  controllers: [PokemonController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: POKEMON_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.pokemonMicroserviceHost,
          port: envs.pokemonMicroservicePort,
        },
      },
    ]),
  ],
})
export class PokemonModule {}
