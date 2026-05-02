import { kv } from '@vercel/kv';

// 存储 Key
const POSTS_KEY = "posts";

// 默认内置文章（兜底，永不丢失）
const DEFAULT_POSTS = [
  { id: '1', num: '01', tag: 'AI 哲学', title: '大模型不是工具，是存在论革命', excerpt: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵...', content: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵——一个把主体与客体截然二分的遗产。', date: '2026.04.29', readTime: '18 分钟', views: 1234, status: 'published', isBuiltIn: true },
];

// 获取文章（只读 Vercel KV，不读内存）
export async function getPosts() {
  const data = await kv.get(POSTS_KEY);
  if (data && Array.isArray(data)) return data;

  // 如果 KV 为空，初始化并写入默认文章
  await kv.set(POSTS_KEY, DEFAULT_POSTS);
  return DEFAULT_POSTS;
}

// 保存文章（强一致性：先读后写，绝不覆盖）
export async function savePost(newPost: any) {
  const posts = await getPosts();
  if (posts.some(p => p.id === newPost.id)) return posts;

  const updated = [...posts, newPost];
  await kv.set(POSTS_KEY, updated);
  return updated;
}

// 更新文章
export async function updatePost(updatedPost: any) {
  const posts = await getPosts();
  const index = posts.findIndex(p => p.id === updatedPost.id);
  if (index === -1) return posts;

  posts[index] = { ...posts[index], ...updatedPost };
  await kv.set(POSTS_KEY, posts);
  return posts;
}

// 删除文章
export async function deletePost(id: string) {
  const posts = await getPosts();
  const filtered = posts.filter(p => p.id !== id);
  await kv.set(POSTS_KEY, filtered);
  return filtered;
}

// 兼容旧代码导出
export { POSTS_KEY };
export const VIEWS_KEY = "views";
export const VISITORS_KEY = "visitors";
