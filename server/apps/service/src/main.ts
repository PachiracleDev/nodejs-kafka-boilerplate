import { NestFactory } from '@nestjs/core';
import { ServiceModule } from './service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ServiceModule);

  // Kafka consumer setup
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:29092'], // Replace with your Kafka broker URL
      },
      consumer: {
        groupId: 'service-consumer',
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
