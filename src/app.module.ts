import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
const configModuleOptions = {
	isGlobal: true,
} as ConfigModuleOptions;
@Module({
	imports: [
		ConfigModule.forRoot(configModuleOptions),
		BullModule.forRoot({
			connection: {
				host: process.env.REDIS_HOST,
				port: Number.parseInt(process.env.REDIS_PORT as string),
				username: process.env.REDIS_USERNAME,
				password: process.env.REDIS_PASSWORD,
				family: Number.parseInt(process.env.REDIS_FAMILY as string),
			}
		}),
		BullModule.registerQueue({
			name: "audio-processing",

		}),
	],
})
export class AppModule { }
