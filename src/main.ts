import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { RpcCustomExceptionFilter, envs, ResponseInterceptor } from './common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API Gateway for all microservices')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(envs.port);

  logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
