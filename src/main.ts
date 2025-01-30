import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const microservices = await app.connectMicroservice<MicroserviceOptions> (
    {
      transport: Transport.GRPC,
      options: {
        package: 'users',
        protoPath: [join(__dirname, 'auth-users.proto')]
      }
    }
  )
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
