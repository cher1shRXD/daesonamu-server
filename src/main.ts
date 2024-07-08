import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'
import { setupSwagger } from './util/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig : { port:number } = config.get('server');
  setupSwagger(app);
  await app.listen(serverConfig.port);
}
bootstrap();
