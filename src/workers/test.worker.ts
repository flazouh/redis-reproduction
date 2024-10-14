import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('test_queue')
export class TestWorker extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(`Processing job ${job.id}`);
    console.log(job.data);
    // Process your job here
    return {};
  }
}
