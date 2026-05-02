import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

// 生成静态参数
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PageProps) {
  // 服务端直接读取本地 Markdown 文件
  const { id } = await params;
  const post = getPostBySlug(id);
  const allPosts = getAllPosts();
  const nextPost = allPosts.find(p => parseInt(p.num) === parseInt(post?.num || '0') + 1);
  const prevPost = allPosts.find(p => parseInt(p.num) === parseInt(post?.num || '0') - 1);

  if (!post) {
    return (
      <>
        <header>
          <Link href="/" className="logo">
            <div className="logo-vinyl"></div>
            <div className="logo-text">GrooveMe<span>Blog</span></div>
          </Link>
          <nav>
            <Link href="/#articles">长文思想</Link>
            <Link href="/#articles">AI 哲学</Link>
            <Link href="/#articles">技术评论</Link>
            <Link href="/about-me">关于</Link>
            <Link href="/#subscribe" className="nav-subscribe">订阅</Link>
          </nav>
        </header>
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>文章未找到</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>该文章不存在或已被移除</p>
          <Link href="/" className="read-btn">
            <span className="arrow">←</span> 返回首页
          </Link>
        </main>
      </>
    );
  }

  // 将内容转换为段落（按行分割）
  const paragraphs = post.content.split('\n').filter(p => p.trim());

  return (
    <>
      {/* 头部 */}
      <header>
        <Link href="/" className="logo">
          <div className="logo-vinyl"></div>
          <div className="logo-text">GrooveMe<span>Blog</span></div>
        </Link>
        
        <nav>
          <Link href="/#articles">长文思想</Link>
          <Link href="/#articles">AI 哲学</Link>
          <Link href="/#articles">技术评论</Link>
          <Link href="/about-me">关于</Link>
          <Link href="/#subscribe" className="nav-subscribe">订阅</Link>
        </nav>
      </header>

      {/* Ticker */}
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

      {/* 文章主体 */}
      <article style={{ maxWidth: '780px', margin: '0 auto', padding: '4rem 2.5rem' }}>
        {/* 文章头部信息 */}
        <div className="hero-eyebrow">{post.tag} · 第 {post.num} 期</div>
        
        <h1 style={{ 
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem'
        }}>
          {post.title}
        </h1>
        
        <div className="hero-meta" style={{ marginBottom: '3rem' }}>
          <span>{post.date}</span>
          <div className="dot"></div>
          <span>{post.tag}</span>
          <div className="dot"></div>
          <span>预计阅读 {post.readTime}</span>
        </div>

        {/* 文章内容 */}
        <div style={{ 
          fontFamily: 'Noto Serif SC, Georgia, serif',
          fontSize: '1.1rem',
          lineHeight: 2,
          color: 'var(--ink2)'
        }}>
          {paragraphs.map((para: string, idx: number) => {
            // 检测是否是标题（以 ## 开头）
            if (para.startsWith('## ')) {
              return (
                <h2 key={idx} style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginTop: '3rem',
                  marginBottom: '1.5rem',
                  color: 'var(--ink)'
                }}>
                  {para.replace('## ', '')}
                </h2>
              );
            }
            return (
              <p key={idx} style={{ marginBottom: '1.8rem' }}>
                {para}
              </p>
            );
          })}
        </div>

        {/* 返回按钮 */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--paper2)' }}>
          <Link href="/" className="read-btn">
            <span className="arrow">←</span> 返回文章列表
          </Link>
        </div>
      </article>

      {/* 页脚 */}
      <footer>
        <div>
          <div className="f-brand">GrooveMe</div>
          <div>思想官网 · 始于 2024 · 独立写作</div>
        </div>
        <div style={{ textAlign: 'right', lineHeight: '2.2' }}>
          <div><a href="#">文章存档</a> · <a href="#">RSS 订阅</a> · <a href="/about-me">关于本站</a></div>
          <div>© 2026 GrooveMe · 保留所有权利</div>
        </div>
      </footer>
    </>
  );
}
