import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('api/v2') //se utiliza para setear un prefijo antes de cada uno de los modulos. Ej: api/pokemon
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // }

      // estas dos maneras permiten transformar el tipo de dato en un dto
    })
  );
  await app.listen(process.env.PORT);
}
bootstrap();
