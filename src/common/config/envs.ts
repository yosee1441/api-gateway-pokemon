import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST: string;
  POKEMON_MICROSERVICE_HOST: string;
  POKEMON_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    HOST: joi.string().required(),
    POKEMON_MICROSERVICE_HOST: joi.string().required(),
    POKEMON_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  host: envVars.HOST,
  pokemonMicroserviceHost: envVars.POKEMON_MICROSERVICE_HOST,
  pokemonMicroservicePort: envVars.POKEMON_MICROSERVICE_PORT,
};
