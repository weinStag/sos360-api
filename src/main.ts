import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth/auth.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5432', //adicionar URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true
  });
  app.use(new AuthMiddleware().use);  // Aplique o middleware globalmente

  await app.listen(3000);
}
bootstrap();
