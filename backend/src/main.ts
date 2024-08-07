import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { credentials: true, origin: process.env.CLIENT_URL } });
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
