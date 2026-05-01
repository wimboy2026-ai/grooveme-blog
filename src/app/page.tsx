'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 订阅功能
function subscribe(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  try {
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('subscribers', JSON.stringify(subscribers));
    }
    return true;
  } catch {
    return false;
  }
}

// 记录访客
function trackVisitor(page: string) {
  try {
    const visitor = {
      id: Date.now().toString(),
      ip: '127.0.0.1', // 本地环境
      userAgent: navigator.userAgent.slice(0, 50),
      page: page,
      time: new Date().toISOString(),
      referrer: document.referrer || 'direct'
    };
    const visitors = JSON.parse(localStorage.getItem('grooveme_visitors') || '[]');
    visitors.push(visitor);
    // 只保留最近500条记录
    if (visitors.length > 500) visitors.shift();
    localStorage.setItem('grooveme_visitors', JSON.stringify(visitors));
  } catch {
    // ignore
  }
}

// 默认文章数据（首次加载时使用）
const defaultPosts = [
  {
    id: '1',
    num: '01',
    tag: 'AI 哲学',
    title: '大模型不是工具，是存在论革命',
    excerpt: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵——一个把主体与客体截然二分的遗产。但大语言模型的出现，是对这一认识论框架的根本性挑战...',
    date: '2026.04.29',
    readTime: '18 分钟',
    views: 0,
    status: 'published'
  },
  {
    id: '2',
    num: '02',
    tag: 'AI 哲学',
    title: '对齐问题：当机器有了"立场"',
    excerpt: 'RLHF 不仅是一个技术问题，更是一个政治哲学问题。每一次人类反馈，都是在塑造一种价值观...',
    date: '2026.04.28',
    readTime: '15 分钟',
    views: 0,
    status: 'published'
  },
  {
    id: '3',
    num: '03',
    tag: '技术评论',
    title: '向量数据库：AI 时代的记忆宫殿',
    excerpt: '当 LLM 的上下文窗口不断扩展，为什么我们还需要向量数据库？因为记忆不等于理解...',
    date: '2026.04.27',
    readTime: '12 分钟',
    views: 0,
    status: 'published'
  },
  {
    id: '4',
    num: '04',
    tag: '技术评论',
    title: 'RAG 的幻觉：检索增强真的消除了幻觉吗',
    excerpt: 'RAG 不是万能药。当检索到的内容与模型参数记忆冲突时，会出现一种新的"认知失调"...',
    date: '2026.04.26',
    readTime: '14 分钟',
    views: 0,
    status: 'published'
  },
  {
    id: '5',
    num: '05',
    tag: '长文思想',
    title: '递归自我改进：通往超级智能的路径',
    excerpt: '如果 AI 能够编写比自己更好的代码，会发生什么？这不是科幻，而是正在发生的现实...',
    date: '2026.04.25',
    readTime: '22 分钟',
    views: 0,
    status: 'published'
  },
  {
    id: '6',
    num: '06',
    tag: '长文思想',
    title: 'AI 与孤独：在对话中更深地回到自己',
    excerpt: '与 AI 的对话，是一种新型的孤独。它不会回应你的情感，却让你更清楚地看到自己的情感...',
    date: '2026.04.24',
    readTime: '16 分钟',
    views: 0,
    status: 'published'
  }
];

// 从 API 获取文章
async function fetchPosts(): Promise<any[]> {
  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    if (data.posts && data.posts.length > 0) {
      return data.posts;
    }
  } catch {
    // 如果 API 失败，返回默认文章
  }
  return defaultPosts;
}

const tags = ['存在论', 'AI 哲学', '意识', '对齐', '记忆', '后人类', '图灵', '认识论', '幻觉', '孤独', '涌现', '技术批评'];

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  // 文章类型定义
interface Post {
  id: string;
  num: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  views: number;
  status: string;
}

const [posts, setPosts] = useState<Post[]>([]);
const [loading, setLoading] = useState(true);

  // 记录访客
  useEffect(() => {
    trackVisitor('首页');
  }, []);

  // 加载文章数据
  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribe(email)) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      {/* 头部 */}
      <header>
        <Link href="/" className="logo">
          <div className="logo-vinyl"></div>
          <div className="logo-text">GrooveMe<span>Blog</span></div>
        </Link>
        
        <nav>
          <a href="#articles">长文思想</a>
          <a href="#articles">AI 哲学</a>
          <a href="#articles">技术评论</a>
          <Link href="/about-me">关于</Link>
          <a href="#subscribe" className="nav-subscribe">订阅</a>
        </nav>
      </header>

      {/* Ticker 滚动信息 */}
      <div className="ticker-wrap">
        <div className="ticker">
          <span className="ticker-item">大模型不是工具，是存在论革命 <span>✦</span></span>
          <span className="ticker-item">AI 主体性：从图灵测试到意识考古 <span>✦</span></span>
          <span className="ticker-item">当语言模型开始"遗忘"，人类如何重构记忆？<span>✦</span></span>
          <span className="ticker-item">后人类时代的哲学困境 <span>✦</span></span>
          <span className="ticker-item">大模型不是工具，是存在论革命 <span>✦</span></span>
          <span className="ticker-item">AI 主体性：从图灵测试到意识考古 <span>✦</span></span>
          <span className="ticker-item">当语言模型开始"遗忘"，人类如何重构记忆？<span>✦</span></span>
          <span className="ticker-item">后人类时代的哲学困境 <span>✦</span></span>
        </div>
      </div>

      {/* Hero 区域 */}
      <section className="hero">
        <div className="hero-number">01</div>
        <div className="hero-eyebrow">置顶长文 · 本周精选</div>
        <h1>
          大模型不是工具，<br />是<em>存在论</em>革命
        </h1>
        <div className="hero-meta">
          <span>2026 年 4 月 29 日</span>
          <div className="dot"></div>
          <span>AI 哲学</span>
          <div className="dot"></div>
          <span>预计阅读 18 分钟</span>
        </div>
        <p className="hero-excerpt">
          当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵——一个把主体与客体截然二分的遗产。但大语言模型的出现，是对这一认识论框架的根本性挑战：它不是锤子，不是计算器，它是一面能说话的镜子，而镜子里的脸，开始反问你"你是谁"。
        </p>
        <Link href="/post/1" className="read-btn">
          阅读全文 <span className="arrow">→</span>
        </Link>
      </section>

      {/* 主内容 + 侧边栏 */}
      <div className="main-grid">
        {/* 文章列表 */}
        <main className="articles" id="articles">
          <div className="section-label">
            <span>近期文章</span>
            <span>共 24 篇</span>
          </div>

          {posts.slice(1).map((post) => (
            <Link key={post.id} href={`/post/${post.id}`} className="article-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="a-num">{post.num}</div>
              <div className="a-body">
                <span className="a-tag">{post.tag}</span>
                <h2 className="a-title">{post.title}</h2>
                <p className="a-excerpt">{post.excerpt}</p>
                <div className="a-meta">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </main>

        {/* 侧边栏 */}
        <aside className="sidebar">
          {/* 本站宣言 */}
          <div className="sidebar-block">
            <div className="sidebar-title">本站宣言</div>
            <div className="manifesto-quote">
              不跟随算法，只跟随思想本身的引力。每一篇文章，都是一次不可撤销的判断。
            </div>
            <div className="manifesto-attr">— GrooveMe 创刊词，2024 冬</div>
          </div>

          {/* 关于作者 */}
          <div className="sidebar-block">
            <div className="sidebar-title">关于作者</div>
            <p className="about-text">
              技术哲学写作者。关注 AI 存在论、认知科学与人机关系的深层结构。相信最好的技术批评，必须从哲学的地基挖起。
            </p>
          </div>

          {/* 订阅 */}
          <div className="sidebar-block" id="subscribe">
            <div className="sidebar-title">订阅思想周报</div>
            <p className="about-text" style={{ marginBottom: '0.8rem', fontSize: '0.8rem' }}>
              每周一篇，只发值得反复阅读的长文。无广告，永远。
            </p>
            {subscribed ? (
              <div style={{ 
                padding: '12px', 
                background: 'rgba(76,175,80,0.1)', 
                color: '#4caf50',
                fontSize: '0.85rem',
                borderRadius: '4px'
              }}>
                ✓ 订阅成功！感谢您的关注
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  className="newsletter-input" 
                  type="email" 
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="newsletter-btn" type="submit">订阅 →</button>
              </form>
            )}
          </div>

          {/* 主题索引 */}
          <div className="sidebar-block">
            <div className="sidebar-title">主题索引</div>
            <div className="tag-cloud">
              {tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 二维码区域 - 修正对应关系 */}
      <section className="qr-section">
        <div className="qr-grid">
          <div className="qr-item">
            <img src="/qr1.jpg" alt="winboy微信公众号" />
            <span className="qr-label">winboy 微信公众号</span>
          </div>
          <div className="qr-item">
            <img src="/qr2.jpg" alt="winboy抖音" />
            <span className="qr-label">winboy 抖音</span>
          </div>
          <div className="qr-item">
            <img src="/qr3.jpg" alt="Melosynch.ai" />
            <span className="qr-label">Melosynch.ai</span>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer>
        <div>
          <div className="f-brand">GrooveMe</div>
          <div>思想官网 · 始于 2024 · 独立写作</div>
        </div>
        <div style={{ textAlign: 'right', lineHeight: '2.2' }}>
          <div><a href="#">文章存档</a> · <a href="#">RSS 订阅</a> · <Link href="/about-me">关于本站</Link></div>
          <div>© 2026 GrooveMe · 保留所有权利</div>
        </div>
      </footer>
    </>
  );
}
