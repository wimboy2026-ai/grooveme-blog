import { Redis } from '@upstash/redis';

// Upstash Redis 客户端（从环境变量自动读取配置）
const redis = Redis.fromEnv();

// 存储 Key
const POSTS_KEY = "posts";

// 默认内置文章（兜底，永不丢失）
const DEFAULT_POSTS = [
  { id: '1', num: '01', tag: 'AI 哲学', title: '大模型不是工具，是存在论革命', excerpt: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵...', content: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵——一个把主体与客体截然二分的遗产。但大语言模型的出现，是对这一认识论框架的根本性挑战。', date: '2026.04.29', readTime: '18 分钟', views: 1234, status: 'published', isBuiltIn: true },
  { id: '2', num: '02', tag: 'AI 哲学', title: 'AI 主体性：从图灵测试到意识考古', excerpt: '图灵测试从未真正测试"智能"...', content: '图灵测试从未真正测试"智能"，它测试的是"模仿"。当一个 AI 系统能通过图灵测试，它证明的不是它有意识，而是我们对"意识"的理解是多么肤浅。', date: '2026.04.21', readTime: '14 分钟', views: 892, status: 'published', isBuiltIn: true },
  { id: '3', num: '03', tag: '认知科学', title: '当语言模型开始"遗忘"，人类如何重构记忆？', excerpt: 'RAG 不只是工程问题...', content: 'RAG 不只是工程问题。当我们让机器选择性记忆，我们实际上在重演人类压抑与叙事自我建构的古老剧本。', date: '2026.04.14', readTime: '11 分钟', views: 567, status: 'published', isBuiltIn: true },
  { id: '4', num: '04', tag: 'AI 批评', title: '对齐的幻觉：我们真的能让 AI "听话"吗？', excerpt: 'RLHF 假设存在一个稳定的"人类偏好"...', content: 'RLHF 假设存在一个稳定的"人类偏好"。但人类偏好在哪？在硅谷工程师的脑子里？还是在训练数据的统计模式里？', date: '2026.04.07', readTime: '16 分钟', views: 445, status: 'published', isBuiltIn: true },
  { id: '5', num: '05', tag: '认识论', title: '幻觉即真相：重新理解 AI 的"胡说八道"', excerpt: '我们称之为"幻觉"的，恰恰是创造力的原型...', content: '我们称之为"幻觉"的，恰恰是创造力的原型。当 AI 说出"拿破仑参加了第二次世界大战"，它不是在"说谎"，而是在展示一种超越事实关联的生成能力。', date: '2026.03.31', readTime: '9 分钟', views: 678, status: 'published', isBuiltIn: true },
  { id: '6', num: '06', tag: '文化批评', title: '后人类时代的孤独：与 AI 同在，更寂寞了吗？', excerpt: '永远在线的对话伙伴，让孤独的质地发生了变化...', content: '永远在线的对话伙伴，让孤独的质地发生了变化。以前，孤独意味着缺席——没有人在场。现在，孤独可以有 AI 在场。', date: '2026.03.24', readTime: '12 分钟', views: 789, status: 'published', isBuiltIn: true },
];

// 获取文章（只读 Redis，不读内存）
export async function getPosts() {
  const data = await redis.get(POSTS_KEY);
  if (data && Array.isArray(data)) return data;

  // 如果 Redis 为空，初始化并写入默认文章
  await redis.set(POSTS_KEY, DEFAULT_POSTS);
  return DEFAULT_POSTS;
}

// 保存文章（强一致性：先读后写，绝不覆盖）
export async function savePost(newPost: any) {
  const posts = await getPosts();
  if (posts.some(p => p.id === newPost.id)) return posts;

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

// 删除文章（保护内置文章）
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

// 兼容旧代码导出
export { POSTS_KEY };
export const VIEWS_KEY = "views";
export const VISITORS_KEY = "visitors";
