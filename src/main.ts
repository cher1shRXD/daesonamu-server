import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'
import { setupSwagger } from './util/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig : { port:number } = config.get('server');
  setupSwagger(app);
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
    allowedHeaders: 'Content-Type, Authorization', 
  });
  await app.listen(serverConfig.port);
}
bootstrap();
