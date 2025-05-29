import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades não decoradas
    forbidNonWhitelisted: true, // Rejeita requisições com propriedades não decoradas
    transform: true, // Transforma tipos automaticamente
  }));

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        frameSrc: ["'none'"], // Bloqueia todos os iframes
        objectSrc: ["'none'"], // Bloqueia objetos (Flash, etc.)
        frameAncestors: ["'none'"] // Prevenção contra clickjacking
      },
    },
    referrerPolicy: { policy: "no-referrer" }
  }));

  const config = new DocumentBuilder()
    .setTitle('API de finanças pessoais')
    .setDescription('O Finans é uma api de controle de finanças pessoais, com gerenciamento de gastos, saldos e categorias.')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3004);
  Logger.log(`Servidor rodando em http://localhost:${process.env.PORT ?? 3004}`);
}
bootstrap();