import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './config/app.config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupApp(app);
  setupSwagger(app);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📖 Swagger docs available at http://localhost:${port}/api`);
}

bootstrap();
