import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });

  // Configurar prefijo global de API
  app.setGlobalPrefix(process.env.API_PREFIX || 'api');

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar filtro global de excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Optimización Ferroviaria')
    .setDescription('API para resolver problemas de transporte (Método de Vogel) y optimización de carga (Problema de la Mochila)')
    .setVersion('1.0')
    .addTag('transport', 'Problema de Transporte - Método de Vogel')
    .addTag('cargo', 'Problema de Carga - Mochila 0/1')
    .addTag('optimization', 'Optimización Integrada')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}/${process.env.API_PREFIX || 'api'}`);
  console.log(`📚 Documentación Swagger en http://localhost:${port}/api/docs`);
}
bootstrap();
