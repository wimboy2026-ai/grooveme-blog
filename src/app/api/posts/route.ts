import { NextResponse } from 'next/server';
import { kv, POSTS_KEY } from '@/lib/kv';

// 获取所有文章
async function getPosts(): Promise<any[]> {
  const data = await kv.get(POSTS_KEY);
  return data ? JSON.parse(data) : [];
}

// 保存所有文章
async function savePosts(posts: any[]): Promise<void> {
  await kv.set(POSTS_KEY, JSON.stringify(posts));
}

// GET - 获取所有文章
export async function GET() {
  const posts = await getPosts();
  return NextResponse.json({ posts });
}

// POST - 创建新文章
export async function POST(request: Request) {
  const data = await request.json();
  const posts = await getPosts();
  const newPost = {
    id: Date.now().toString(),
    ...data,
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.push(newPost);
  await savePosts(posts);
  return NextResponse.json(newPost);
}

// PUT - 更新文章
export async function PUT(request: Request) {
  const data = await request.json();
  const posts = await getPosts();
  const index = posts.findIndex((p: any) => p.id === data.id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...data, updatedAt: new Date().toISOString() };
    await savePosts(posts);
    return NextResponse.json(posts[index]);
  }
  return NextResponse.json({ error: 'Post not found' }, { status: 404 });
}

// DELETE - 删除文章
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    let posts = await getPosts();
    posts = posts.filter((p: any) => p.id !== id);
    await savePosts(posts);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'ID required' }, { status: 400 });
}
