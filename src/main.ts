import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('Running on port:', process.env.PORT);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.use((req, res, next) => {
    console.log(`🔥 Swagger Request: ${req.method} ${req.originalUrl}`);
    console.log(`🔥 Headers:`, req.headers);
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the application')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  }); // Swagger available at /api

  await app.listen(process.env.PORT ?? 8080);
  console.log(
    `Server is running on http://localhost:${process.env.PORT ?? 8080}`,
  );
  console.log(
    `Swagger docs available at http://localhost:${process.env.PORT ?? 8080}/api`,
  );
}
bootstrap();
