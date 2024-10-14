import { Module } from "@nestjs/common";

import { ASRService } from "./asr.service";
import { AutomaticSpeechRecognitionController } from "./asr.controller";
import { AudioProcessingProcessor } from "./audio-processing.processor";
import { BullModule } from "@nestjs/bullmq";

@Module({
	controllers: [AutomaticSpeechRecognitionController],
	providers: [
		ASRService,
		AudioProcessingProcessor,
	],
})
export class ASRModule { }
