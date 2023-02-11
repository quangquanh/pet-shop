import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class CachingService {
  constructor(@InjectRedis() private readonly cache: Redis) {}

  async get(key: string) {
    return await this.cache.get(key);
  }

  async getListKey(key: string) {
    return await this.cache.keys(key);
  }

  async set(key: string, value: string) {
    await this.cache.set(key, value);
  }

  async setTtl(key: string, value: string, ttl: number) {
    await this.cache.set(key, value, 'EX', ttl);
  }

  async del(key: string) {
    await this.cache.del(key);
  }
}
