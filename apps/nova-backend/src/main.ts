import 'reflect-metadata';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('Nova api')
    .setDescription('Api description')
    .build();
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'User-Agent', // ← КРИТИЧНО для AI SDK
      'X-Requested-With',
      'Accept',
      'Accept-Language',
      'Accept-Encoding',
      'DNT',
      'Connection',
      'Upgrade-Insecure-Requests',
    ],
  });
  await app.listen(port);
}

bootstrap();
