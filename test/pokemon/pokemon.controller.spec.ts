import { Test, TestingModule } from '@nestjs/testing';
import {
  ClientProxy,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';

import { PokemonController } from '@/pokemon/pokemon.controller';
import { CreatePokemonDto, UpdatePokemonDto } from '@/pokemon/dtos';
import { envs } from '@/common/config';
import { POKEMON_SERVICE } from '@/utils';

const clientProxySendMock = (clientProxy, value) => {
  jest.spyOn(clientProxy, 'send').mockImplementationOnce(() => value);
};

describe('PokemonController', () => {
  let controller: PokemonController;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: POKEMON_SERVICE,
          useFactory: () => {
            clientProxy = ClientProxyFactory.create({
              transport: Transport.TCP,
              options: {
                host: envs.pokemonMicroserviceHost,
                port: envs.pokemonMicroservicePort,
              },
            });

            return clientProxy;
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  afterEach(() => {
    clientProxy.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create with correct parameters', async () => {
    const dto: CreatePokemonDto = {
      name: 'Pikachu',
      type: 'Electric',
      level: 10,
    };

    const newPokemon = {
      ...dto,
      id: 1,
    };

    clientProxySendMock(clientProxy, newPokemon);

    const result = await controller.create(dto);

    expect(result).toBe(newPokemon);
    expect(clientProxy.send).toHaveBeenCalledWith(
      { cmd: 'createPokemon' },
      dto,
    );
  });

  it('should call findAll with correct parameters', async () => {
    const findAllPokemonsResult = [];

    clientProxySendMock(clientProxy, findAllPokemonsResult);

    const result = await controller.findAll();

    expect(clientProxy.send).toHaveBeenCalledWith(
      { cmd: 'findAllPokemons' },
      {},
    );
    expect(result).toEqual(findAllPokemonsResult);
  });

  it('should call findOne with correct parameters', async () => {
    const pokemonId = '123';
    const findOnePokemonResult = { id: pokemonId, name: 'Pikachu' };

    clientProxySendMock(clientProxy, findOnePokemonResult);

    const result = await controller.findOne(pokemonId);

    expect(clientProxy.send).toHaveBeenCalledWith(
      { cmd: 'findOnePokemon' },
      { id: pokemonId },
    );
    expect(result).toEqual(findOnePokemonResult);
  });

  it('should call update with correct parameters', async () => {
    const pokemonId = '123';
    const updatePokemonDto: UpdatePokemonDto = { name: 'Raichu' };

    clientProxySendMock(clientProxy, updatePokemonDto);

    const result = await controller.update(pokemonId, updatePokemonDto);

    expect(clientProxy.send).toHaveBeenCalledWith(
      { cmd: 'updatePokemon' },
      { id: pokemonId, dto: updatePokemonDto },
    );
    expect(result).toEqual(updatePokemonDto);
  });

  it('should call remove with correct parameters', async () => {
    const pokemonId = '123';

    clientProxySendMock(clientProxy, pokemonId);
    await controller.remove(pokemonId);

    expect(clientProxy.send).toHaveBeenCalledWith(
      { cmd: 'removePokemon' },
      { id: pokemonId },
    );
  });
});
