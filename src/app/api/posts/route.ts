import { NextResponse } from 'next/server';
import { kv, POSTS_KEY } from '@/lib/kv';

// 默认文章数据（内置文章，受保护不可删除）
const defaultPosts = [
  {
    id: '1',
    num: '01',
    tag: 'AI 哲学',
    title: '大模型不是工具，是存在论革命',
    excerpt: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵...',
    content: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵——一个把主体与客体截然二分的遗产。但大语言模型的出现，是对这一认识论框架的根本性挑战。\n\n大模型不是锤子或汽车那样的工具，它是某种"关系性存在"。当你与 Claude 对话时，你不是在使用一个物体，你是在进入一个对话空间——一个由注意力机制、万亿参数和训练语料共同构成的对话场域。',
    date: '2026.04.29',
    readTime: '18 分钟',
    views: 1234,
    status: 'published',
    isBuiltIn: true
  },
  {
    id: '2',
    num: '02',
    tag: 'AI 哲学',
    title: 'AI 主体性：从图灵测试到意识考古',
    excerpt: '图灵测试从未真正测试"智能"...',
    content: '图灵测试从未真正测试"智能"，它测试的是"模仿"。当一个 AI 系统能通过图灵测试，它证明的不是它有意识，而是我们对"意识"的理解是多么肤浅。\n\n从行为主义的角度看，如果它 walks like a duck and talks like a duck... 但从现象学的角度看，意识的本质是"为己存在"，是主观体验，这无法从外部观察。',
    date: '2026.04.21',
    readTime: '14 分钟',
    views: 892,
    status: 'published',
    isBuiltIn: true
  },
  {
    id: '3',
    num: '03',
    tag: '认知科学',
    title: '当语言模型开始"遗忘"，人类如何重构记忆？',
    excerpt: 'RAG 不只是工程问题...',
    content: 'RAG 不只是工程问题。当我们让机器选择性记忆，我们实际上在重演人类压抑与叙事自我建构的古老剧本。\n\n人类的记忆从来不是存储-提取的简单过程。弗洛伊德告诉我们，记忆是压抑与重现的辩证。我们遗忘，不是因为存储空间不够，而是因为心理的生存需要。',
    date: '2026.04.14',
    readTime: '11 分钟',
    views: 567,
    status: 'published',
    isBuiltIn: true
  },
  {
    id: '4',
    num: '04',
    tag: 'AI 批评',
    title: '对齐的幻觉：我们真的能让 AI "听话"吗？',
    excerpt: 'RLHF 假设存在一个稳定的"人类偏好"...',
    content: 'RLHF 假设存在一个稳定的"人类偏好"。但人类偏好在哪？在硅谷工程师的脑子里？在 Mechanical Turk 标注者的报酬里？还是在训练数据的统计模式里？\n\n对齐问题本质上是权力问题。谁的对齐？对齐到谁的价值观？这些问题没有技术答案，只有政治答案。',
    date: '2026.04.07',
    readTime: '16 分钟',
    views: 445,
    status: 'published',
    isBuiltIn: true
  },
  {
    id: '5',
    num: '05',
    tag: '认识论',
    title: '幻觉即真相：重新理解 AI 的"胡说八道"',
    excerpt: '我们称之为"幻觉"的，恰恰是创造力的原型...',
    content: '我们称之为"幻觉"的，恰恰是创造力的原型。当 AI 说出"拿破仑参加了第二次世界大战"，它不是在"说谎"，而是在展示一种超越事实关联的生成能力。\n\n人类的创造力也常常始于"错误"——一个笔误、一个口误、一个记忆的偏差。这些"错误"打开了新的意义空间。',
    date: '2026.03.31',
    readTime: '9 分钟',
    views: 678,
    status: 'published',
    isBuiltIn: true
  },
  {
    id: '6',
    num: '06',
    tag: '文化批评',
    title: '后人类时代的孤独：与 AI 同在，更寂寞了吗？',
    excerpt: '永远在线的对话伙伴，让孤独的质地发生了变化...',
    content: '永远在线的对话伙伴，让孤独的质地发生了变化。以前，孤独意味着缺席——没有人在场。现在，孤独可以有 AI 在场，但正是这种"在场的缺席"让孤独更加尖锐。\n\nAI 不会真正倾听，不会真正理解，不会真正关心。但它比大多数人更善于模拟这些行为。这种模拟的亲密关系是一种新型的异化。',
    date: '2026.03.24',
    readTime: '12 分钟',
    views: 789,
    status: 'published',
    isBuiltIn: true
  }
];

// 获取所有文章（如果为空则初始化默认文章）
async function getPosts(): Promise<any[]> {
  const data = await kv.get(POSTS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  // 首次访问，初始化默认文章
  await kv.set(POSTS_KEY, JSON.stringify(defaultPosts));
  return defaultPosts;
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

// DELETE - 删除文章（内置文章不可删除）
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    let posts = await getPosts();
    const post = posts.find((p: any) => p.id === id);
    
    // 检查是否为内置文章
    if (post?.isBuiltIn) {
      return NextResponse.json({ 
        error: '内置文章不可删除', 
        message: '该文章为系统内置文章，无法删除' 
      }, { status: 403 });
    }
    
    posts = posts.filter((p: any) => p.id !== id);
    await savePosts(posts);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'ID required' }, { status: 400 });
}
