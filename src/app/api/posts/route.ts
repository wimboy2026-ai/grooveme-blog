import { NextResponse } from 'next/server';
import { getPosts, savePost, updatePost, deletePost } from '@/lib/kv';

// GET - 获取所有文章
export async function GET() {
  try {
    console.log('[API] GET /api/posts - 开始调用 getPosts');
    const posts = await getPosts();
    console.log('[API] GET /api/posts - 成功返回', posts.length, '篇文章');
    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('[API] GET /api/posts - 错误:', error);
    return NextResponse.json(
      { error: '获取文章失败', details: error.message },
      { status: 500 }
    );
  }
}

// POST - 创建新文章（使用强一致性 savePost）
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newPost = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      ...data,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 使用 kv.ts 中的 savePost（强一致性：先读后写）
    const posts = await savePost(newPost);

    return NextResponse.json(newPost);
  } catch (error: any) {
    console.error('[API] POST /api/posts - 错误:', error);
    return NextResponse.json(
      { error: '创建文章失败', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - 更新文章
export async function PUT(request: Request) {
  const data = await request.json();

  const updated = await updatePost(data);
  const post = updated.find((p: any) => p.id === data.id);

  if (post) {
    return NextResponse.json(post);
  }
  return NextResponse.json({ error: 'Post not found' }, { status: 404 });
}

// DELETE - 删除文章
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  try {
    await deletePost(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
