import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectQueue('test_queue') private testQueue: Queue
  ) {}


  async addJobToQueue(data: any): Promise<void> {
    this.logger.log(`Adding job to queue: ${data}`);
    await this.testQueue.add('process_message', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
    this.logger.log(`Job added to queue: ${data}`);
  }
}
