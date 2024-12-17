import { Controller } from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  KafkaRetriableException,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class ServiceController {
  @EventPattern('hero.kill.dragon')
  async handleKillDragon(@Payload() message, @Ctx() context: KafkaContext) {
    console.log('Mensaje recibido:', message);
  }

  @MessagePattern('hero.create.dragon') // Escucha el tópico
  handleCreateDragon(@Payload() message): string {
    console.log('Mensaje recibido:', message);
    return 'Dragon successfully created!'; // Envía una respuesta
  }
}
