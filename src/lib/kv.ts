// Vercel KV 兼容的内存存储（开发环境）
// 生产环境请使用 Vercel KV: https://vercel.com/docs/storage/vercel-kv

class KVStore {
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

export const kv = new KVStore();

// 文章数据键名
export const POSTS_KEY = 'grooveme:posts';
export const VIEWS_KEY = 'grooveme:views';
export const VISITORS_KEY = 'grooveme:visitors';
