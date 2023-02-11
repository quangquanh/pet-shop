import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

import { CachingService } from './caching.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const redis = config.get('redis');
        return {
          config: { url: redis.url },
        };
      },
    }),
  ],
  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
