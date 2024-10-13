import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {

  constructor(
    @InjectQueue('test_queue') private testQueue: Queue
  ) {}


  async addJobToQueue(data: any): Promise<void> {
    await this.testQueue.add('process_message', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
  }
}
