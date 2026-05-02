// Upstash Redis 存储 - 强制使用 Redis，不回退内存！！
import { Redis } from '@upstash/redis';

// 延迟初始化 Redis 客户端（避免构建时检查）
let redis: Redis | null = null;

function getRedis(): Redis {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error('UPSTASH_REDIS_REST_URL 和 UPSTASH_REDIS_REST_TOKEN 环境变量必须配置！请检查 Vercel Environment Variables。');
  }

  redis = new Redis({ url, token });
  return redis;
}

// 文章数据键名
export const POSTS_KEY = 'grooveme:posts';
export const VIEWS_KEY = 'grooveme:views';
export const VISITORS_KEY = 'grooveme:visitors';

// 统一的 KV 存储接口 - 只使用 Redis！！
export const kv = {
  async get(key: string): Promise<string | null> {
    return getRedis().get(key);
  },

  async set(key: string, value: string): Promise<void> {
    await getRedis().set(key, value);
  },

  async del(key: string): Promise<void> {
    await getRedis().del(key);
  }
};
