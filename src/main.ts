import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.enableCors();
  app.setGlobalPrefix('api');

  const swaggerconfig = new DocumentBuilder()
    .setTitle('Beinsa scores API')
    .setDescription('API for music scores rendering CRUD')
    .setVersion('1.0')
    .addTag('scores')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerconfig);
  SwaggerModule.setup('/', app, document);

  await app.listen(8000);
}
bootstrap();
