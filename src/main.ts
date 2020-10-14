import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Api Noname')
    .setDescription('Noname Aplication')
    .setVersion('1.0')
    .build();
  const swaggerCustomOptions = {
    swaggerOptions: { docExpansion: "none" }
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions);
  await app.listen(3000);
}
bootstrap();
