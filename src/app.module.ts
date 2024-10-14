import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { TestQueueProcessor } from './test-queue.processor';
const configModuleOptions = {
	isGlobal: true,
} as ConfigModuleOptions;
@Module({
  imports: [
		BullModule.registerQueue({
			name: "test_queue",
      connection: {
        host: process.env.REDIS_HOST,
				port: Number.parseInt(process.env.REDIS_PORT as string),
				username: process.env.REDIS_USERNAME,
				password: process.env.REDIS_PASSWORD,
				family: Number.parseInt(process.env.REDIS_FAMILY as string),
      }
		}),
		ConfigModule.forRoot(configModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService, TestQueueProcessor],
})
export class AppModule {}
