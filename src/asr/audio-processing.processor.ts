import { Logger } from "@nestjs/common";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

export class AudioProcessingProcessor extends WorkerHost {
	private readonly logger = new Logger(AudioProcessingProcessor.name);


	async process(job: Job<any>) {

		this.logger.log(`Processing chunk ${job.id}`);
	}

}