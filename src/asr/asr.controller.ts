import { Controller, Post, Body, Logger } from "@nestjs/common";
import { ASRService } from "./asr.service";

@Controller("asr")
export class AutomaticSpeechRecognitionController {
	private readonly logger = new Logger(AutomaticSpeechRecognitionController.name);
	constructor(private readonly asrService: ASRService) { }

	@Post("transcribe")
	async getTranscription(@Body() payload: any) {
		this.logger.log(`Transcribing audio for ${payload.url} with platform ${payload.platform}`);
	}
}
