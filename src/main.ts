import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  const port = config.get('app.port') || 3000;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('API de Star Wars')
    .setVersion('1.0')
    .addTag('starwars')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // app.setGlobalPrefix('v1/');

  app.enableCors({ origin: '*' });
  await app.listen(port);
}
bootstrap();
