import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  num: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  content: string;
  readTime: string;
  views: number;
  status: string;
  isBuiltIn: boolean;
}

export function getAllPosts(): Post[] {
  // 如果目录不存在，返回空数组
  if (!fs.existsSync(postsDir)) {
    console.warn('[Posts] 目录不存在:', postsDir);
    return [];
  }

  const filenames = fs.readdirSync(postsDir);

  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map((filename, index) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      // 生成编号（01, 02, 03...）
      const num = String(index + 1).padStart(2, '0');

      return {
        slug: filename.replace('.md', ''),
        num: data.num || num,
        title: data.title || filename.replace('.md', ''),
        date: data.date || '2026.01.01',
        tag: data.tag || '未分类',
        excerpt: data.excerpt || content.slice(0, 100).replace(/[#*`]/g, '') + '...',
        content: content,
        readTime: data.readTime || `${Math.ceil(content.length / 500)} 分钟`,
        views: data.views || 0,
        status: data.status || 'published',
        isBuiltIn: data.isBuiltIn !== false, // 默认为true
      };
    })
    .sort((a, b) => {
      // 按编号排序
      return parseInt(a.num) - parseInt(b.num);
    });

  console.log(`[Posts] 成功读取 ${posts.length} 篇文章`);
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug) || null;
}
