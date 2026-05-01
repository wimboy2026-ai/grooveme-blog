// Upstash Redis 存储
// Vercel KV 已迁移到 Upstash Redis
// 免费额度：每天 10,000 请求

import { Redis } from '@upstash/redis';

// 创建 Upstash Redis 客户端
const getRedisClient = () => {
  // 使用环境变量连接 Upstash Redis
  // Vercel 会自动提供这些变量当连接 Redis 集成后
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  
  if (!url || !token) {
    console.warn('Upstash Redis 环境变量未配置，使用内存存储');
    return null;
  }
  
  return new Redis({ url, token });
};

// 内存存储作为备用
class MemoryStore {
  private store: Map<string, string> = new Map();

  async get(key: string): Promise<string | null> {
    return this.store.get(key) || null;
  }

  async set(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  async keys(pattern: string): Promise<string[]> {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return Array.from(this.store.keys()).filter(k => regex.test(k));
  }
}

// 统一的 KV 存储接口
class KVStore {
  private client: Redis | null = null;
  private memoryStore: MemoryStore;

  constructor() {
    this.client = getRedisClient();
    this.memoryStore = new MemoryStore();
  }

  async get(key: string): Promise<string | null> {
    try {
      if (this.client) {
        return await this.client.get(key);
      }
    } catch (error) {
      console.error('KV get error:', error);
    }
    return this.memoryStore.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    try {
      if (this.client) {
        await this.client.set(key, value);
        return;
      }
    } catch (error) {
      console.error('KV set error:', error);
    }
    return this.memoryStore.set(key, value);
  }

  async del(key: string): Promise<void> {
    try {
      if (this.client) {
        await this.client.del(key);
        return;
      }
    } catch (error) {
      console.error('KV del error:', error);
    }
    return this.memoryStore.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    try {
      if (this.client) {
        return await this.client.keys(pattern);
      }
    } catch (error) {
      console.error('KV keys error:', error);
    }
    return this.memoryStore.keys(pattern);
  }
}

export const kv = new KVStore();

// 文章数据键名
export const POSTS_KEY = 'grooveme:posts';
export const VIEWS_KEY = 'grooveme:views';
export const VISITORS_KEY = 'grooveme:visitors';
