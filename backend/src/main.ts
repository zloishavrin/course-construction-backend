import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.BACKEND_PORT || 3000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Course Construction')
      .setDescription('Описание API конструктора курсов')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        description: 'Аутентификация по Bearer-токену',
        name: 'authorization',
        in: 'header',
        bearerFormat: 'JWT',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
  }
  catch(error) {
    console.log(error);
  }
}
bootstrap();