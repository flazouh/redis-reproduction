import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

export class TestQueueProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(`Processing job ${job.id}`);
    console.log(job.data);

    return {};
  }
}