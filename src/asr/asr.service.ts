import fs from "node:fs";
import { Readable } from "node:stream";

import { Injectable, Logger } from "@nestjs/common";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
@Injectable()
export class ASRService {
	private readonly logger = new Logger(ASRService.name);

	constructor(
		@InjectQueue("audio-processing") private audioProcessingQueue: Queue,
	) { }

	async addJobToQueue(data: any): Promise<void> {
		this.logger.log(`Adding job to queue: ${JSON.stringify(data)}`);
		await this.audioProcessingQueue.add('process_message', data, {
			attempts: 3,
			backoff: {
				type: 'exponential',
				delay: 1000,
			},
		});
		this.logger.log(`Job added to queue: ${JSON.stringify(data)}`);
	}


}
export function streamToBuffer(readable: Readable): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const chunks: Buffer[] = [];
		readable.on("data", (chunk) => chunks.push(chunk));
		readable.on("end", () => resolve(Buffer.concat(chunks)));
		readable.on("error", (error) => reject(error));
	});
}
