import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('Running on port:', process.env.PORT);

  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // ✅ Allow cookies/JWT if needed
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
