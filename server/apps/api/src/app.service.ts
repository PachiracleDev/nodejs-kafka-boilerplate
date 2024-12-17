import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('HERO_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('hero.create.dragon');
    await this.client.connect();
  }

  async send() {
    const response = await firstValueFrom(
      this.client.send('hero.create.dragon', {
        message: 'Dragon is dead',
      }),
    );
    return response;
  }

  async emit() {
    const response = await firstValueFrom(
      this.client.emit('hero.kill.dragon', {
        message: 'Dragon is dead',
      }),
    );
    return response;
  }

  async emitBatch() {
    const response = await firstValueFrom(
      this.client.emitBatch('hero.kill.dragon', {
        messages: ['Dragon 1 is dead', 'Dragon 2 is dead'],
      }),
    );
    return response;
  }
}
