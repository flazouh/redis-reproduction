import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('add-message')
  async addMessage(@Body('message') message: string) {
    const result = await this.appService.addJobToQueue(message);
    return { success: true, queueLength: result };
  }
}
