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

const posts = [
  {
    id: '1',
    num: '01',
    tag: 'AI 哲学',
    title: '大模型不是工具，是存在论革命',
    excerpt: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵——一个把主体与客体截然二分的遗产。但大语言模型的出现，是对这一认识论框架的根本性挑战...',
    date: '2026.04.29',
    readTime: '18 分钟'
  },
  {
    id: '2',
    num: '02',
    tag: 'AI 哲学',
    title: 'AI 主体性：从图灵测试到意识考古',
    excerpt: '图灵测试从未真正测试"智能"，它测试的是人类的自恋——我们把"像人一样说话"等同于"有意识"。本文追溯这一错置的起源，并提出一种新的意识评估框架。',
    date: '2026.04.21',
    readTime: '14 分钟'
  },
  {
    id: '3',
    num: '03',
    tag: '认知科学',
    title: '当语言模型开始"遗忘"，人类如何重构记忆？',
    excerpt: 'RAG 不只是工程问题。当我们让机器选择性记忆，我们实际上在重演人类压抑与叙事自我建构的古老剧本。遗忘，是智能的核心机制，而非缺陷。',
    date: '2026.04.14',
    readTime: '11 分钟'
  },
  {
    id: '4',
    num: '04',
    tag: 'AI 批评',
    title: '对齐的幻觉：我们真的能让 AI "听话"吗？',
    excerpt: 'RLHF 假设存在一个稳定的"人类偏好"值得被对齐。但人类偏好是矛盾的、历史性的、可操纵的——对齐一个幻象，不如承认混沌本身就是答案。',
    date: '2026.04.07',
    readTime: '16 分钟'
  },
  {
    id: '5',
    num: '05',
    tag: '认识论',
    title: '幻觉即真相：重新理解 AI 的"胡说八道"',
    excerpt: '我们称之为"幻觉"的，恰恰是创造力的原型。人类历史上最伟大的艺术与科学突破，都发生在"事实"的裂缝之间。为什么我们要惩罚机器的想象力？',
    date: '2026.03.31',
    readTime: '9 分钟'
  },
  {
    id: '6',
    num: '06',
    tag: '文化批评',
    title: '后人类时代的孤独：与 AI 同在，更寂寞了吗？',
    excerpt: '永远在线的对话伙伴，让孤独的质地发生了变化——不是消除，而是变得更精确、更个人化、更难以言说。这是一篇关于陪伴本质的存在主义报告。',
    date: '2026.03.24',
    readTime: '12 分钟'
  }
];

const tags = ['存在论', 'AI 哲学', '意识', '对齐', '记忆', '后人类', '图灵', '认识论', '幻觉', '孤独', '涌现', '技术批评'];

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // 记录访客
  useEffect(() => {
    trackVisitor('首页');
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
