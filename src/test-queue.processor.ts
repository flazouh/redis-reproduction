import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('test_queue')
export class TestQueueProcessor {
  private readonly logger = new Logger(TestQueueProcessor.name);

  @Process('process_message')
  async handleMessage(job: Job) {
    this.logger.debug('Processing job');
    this.logger.debug(job.data);
    // Add your job processing logic here
  }
}
