// Upstash Redis 存储 - 优先使用 Redis，失败时回退内存
import { Redis } from '@upstash/redis';

// 内存存储作为备用
const memoryStore = new Map<string, string>();

// 延迟初始化 Redis 客户端
let redis: Redis | null = null;
let redisAvailable = false;

function initRedis(): boolean {
  if (redis) return redisAvailable;

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[KV] Redis 环境变量未配置，使用内存存储');
    return false;
  }

  try {
    redis = new Redis({ url, token });
    redisAvailable = true;
    console.log('[KV] Redis 客户端初始化成功');
  } catch (error) {
    console.error('[KV] Redis 初始化失败:', error);
    redisAvailable = false;
  }

  return redisAvailable;
}

// 文章数据键名
export const POSTS_KEY = 'grooveme:posts';
export const VIEWS_KEY = 'grooveme:views';
export const VISITORS_KEY = 'grooveme:visitors';

// 统一的 KV 存储接口 - 优先 Redis，失败时内存回退
export const kv = {
  async get(key: string): Promise<string | null> {
    // 尝试 Redis
    if (initRedis() && redis) {
      try {
        return await redis.get(key);
      } catch (error) {
        console.error('[KV] Redis get 失败，回退内存:', error);
      }
    }
    // 回退内存
    return memoryStore.get(key) || null;
  },

  async set(key: string, value: string): Promise<void> {
    // 同步保存到内存
    memoryStore.set(key, value);

    // 尝试 Redis
    if (initRedis() && redis) {
      try {
        await redis.set(key, value);
      } catch (error) {
        console.error('[KV] Redis set 失败:', error);
      }
    }
  },

  async del(key: string): Promise<void> {
    memoryStore.delete(key);
    
    if (initRedis() && redis) {
      try {
        await redis.del(key);
      } catch (error) {
        console.error('[KV] Redis del 失败:', error);
      }
    }
  }
};
