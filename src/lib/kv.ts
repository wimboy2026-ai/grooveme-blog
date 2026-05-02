import { Redis } from '@upstash/redis';

// 全局 Redis 客户端
const redis = Redis.fromEnv();
export const POSTS_KEY = "posts";

// 默认文章兜底
const DEFAULT_POSTS = [
  { id: '1', num: '01', tag: 'AI 哲学', title: '大模型不是工具，是存在论革命', excerpt: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵...', content: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵——一个把主体与客体截然二分的遗产。', date: '2026.04.29', readTime: '18 分钟', views: 1234, status: 'published', isBuiltIn: true },
  { id: '2', num: '02', tag: 'AI 哲学', title: 'AI 主体性：从图灵测试到意识考古', excerpt: '图灵测试从未真正测试"智能"...', content: '图灵测试从未真正测试"智能"，它测试的是"模仿"。', date: '2026.04.21', readTime: '14 分钟', views: 892, status: 'published', isBuiltIn: true },
  { id: '3', num: '03', tag: '认知科学', title: '当语言模型开始"遗忘"，人类如何重构记忆？', excerpt: 'RAG 不只是工程问题...', content: 'RAG 不只是工程问题。', date: '2026.04.14', readTime: '11 分钟', views: 567, status: 'published', isBuiltIn: true },
];

// 获取文章列表
export async function getPosts() {
  const data = await redis.get(POSTS_KEY);
  if (data && Array.isArray(data)) return data;

  // 如果 Redis 为空，初始化并写入默认文章
  await redis.set(POSTS_KEY, DEFAULT_POSTS);
  return DEFAULT_POSTS;
}

// 保存/新建文章（追加模式，绝不覆盖）
export async function savePost(newPost: any) {
  const posts = await getPosts();

  // 防重复
  if (posts.some(p => p.id === newPost.id)) {
    return posts;
  }

  const updated = [...posts, newPost];
  await redis.set(POSTS_KEY, updated);
  return updated;
}

// 更新文章
export async function updatePost(updatedPost: any) {
  const posts = await getPosts();
  const index = posts.findIndex(p => p.id === updatedPost.id);

  if (index === -1) return posts;

  posts[index] = { ...posts[index], ...updatedPost };
  await redis.set(POSTS_KEY, posts);
  return posts;
}

// 删除文章
export async function deletePost(id: string) {
  const posts = await getPosts();
  const post = posts.find(p => p.id === id);

  if (post?.isBuiltIn) {
    throw new Error("内置文章不可删除");
  }

  const filtered = posts.filter(p => p.id !== id);
  await redis.set(POSTS_KEY, filtered);
  return filtered;
}

// 兼容旧代码
export const kv = {
  get: (key: string) => redis.get(key),
  set: (key: string, value: any) => redis.set(key, value),
  del: (key: string) => redis.del(key),
};

export const VIEWS_KEY = "views";
export const VISITORS_KEY = "visitors";
