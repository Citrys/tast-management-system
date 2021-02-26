import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serviceConfig = config.get('server');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || serviceConfig.port;
  await app.listen(port);
  logger.log(`Application started on port: ${port}`);
}
bootstrap();
