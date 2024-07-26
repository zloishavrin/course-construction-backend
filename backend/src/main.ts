import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.BACKEND_PORT || 3000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
  }
  catch(error) {
    console.log(error);
  }
}
bootstrap();