import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './utils/logger.middleware';
import santizer from 'express-mongo-sanitize';
import { HttpExceptionFilter } from 'http-exception.filters';

async function bootstrap() {
  const logger = new Logger('boostrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.enableCors({
  //   credentials: true,
  //   origin: '*',
  // });

  app.useGlobalPipes(new ValidationPipe());

  // app.use(helmet());
  //app.use(santizer());

  const port = process.env.SERVER_PORT || 6000;
  app.useGlobalFilters(new HttpExceptionFilter(new LoggerMiddleware()));
  await app.listen(port, async () => {
    logger.log(
      `The server is running on ${port} port: http://localhost:${port}/api`,
    );
  });
}

bootstrap();
