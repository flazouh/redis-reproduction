import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestQueueProcessor } from './test-queue.processor';
import { BullModule } from '@nestjs/bull';
const configModuleOptions = {
	isGlobal: true,
} as ConfigModuleOptions;
@Module({
  imports: [
		BullModule.registerQueue({
			name: "test_queue",
		}),
		ConfigModule.forRoot(configModuleOptions),
    RedisModule.forRoot({
			readyLog: true,
			config: {
				host: process.env.REDIS_HOST,
				port: Number.parseInt(process.env.REDIS_PORT as string),
				username: process.env.REDIS_USERNAME,
				password: process.env.REDIS_PASSWORD,
				family: Number.parseInt(process.env.REDIS_FAMILY as string),
			},
		}),
  ],
  controllers: [AppController],
  providers: [AppService, TestQueueProcessor],
})
export class AppModule {}
