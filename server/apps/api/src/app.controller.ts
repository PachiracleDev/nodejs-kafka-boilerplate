import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('send')
  getHello() {
    return this.appService.send();
  }

  @Get('emit')
  getEmit() {
    return this.appService.emit();
  }

  @Get('emitBatch')
  getEmitBatch() {
    return this.appService.emitBatch();
  }
}
