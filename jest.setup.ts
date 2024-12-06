// import '@nestjs/microservices';

// jest.mock('@nestjs/microservices', () => {
//   return {
//     ClientProxy: jest.fn().mockImplementation(() => ({
//       send: jest.fn(),
//     })),
//   };
// });

jest.mock('@/common/config', () => ({
  envs: {
    port: 3000,
    host: 'localhost',
    pokemonMicroserviceHost: 'localhost',
    pokemonMicroservicePort: '3001',
  },
}));
