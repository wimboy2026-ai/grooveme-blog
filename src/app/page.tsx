import Link from 'next/link';
import { getAllPosts, Post } from '@/lib/posts';

const tags = ['存在论', 'AI 哲学', '意识', '对齐', '记忆', '后人类', '图灵', '认识论', '幻觉', '孤独', '涌现', '技术批评'];

export default function HomePage() {
  // 服务端直接读取本地 Markdown 文件
  const posts: Post[] = getAllPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

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
        </div>
      </div>

      {/* Hero 区域 - 显示第一篇文章 */}
      {featuredPost && (
        <section className="hero">
          <div className="hero-number">{featuredPost.num}</div>
          <div className="hero-eyebrow">置顶长文 · 本周精选</div>
          <h1>
            {featuredPost.title.split('，')[0]}，<br />{featuredPost.title.split('，')[1] || '深度思考'}
          </h1>
          <div className="hero-meta">
            <span>{featuredPost.date}</span>
            <div className="dot"></div>
            <span>{featuredPost.tag}</span>
            <div className="dot"></div>
            <span>预计阅读 {featuredPost.readTime}</span>
          </div>
          <p className="hero-excerpt">{featuredPost.excerpt}</p>
          <Link href={`/post/${featuredPost.slug}`} className="read-btn">
            阅读全文 <span className="arrow">→</span>
          </Link>
        </section>
      )}

      {/* 主内容 + 侧边栏 */}
      <div className="main-grid">
        {/* 文章列表 */}
        <main className="articles" id="articles">
          <div className="section-label">
            <span>近期文章</span>
            <span>共 {posts.length} 篇</span>
          </div>

          {otherPosts.map((post) => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="article-card" style={{ textDecoration: 'none', color: 'inherit' }}>
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
            <form className="newsletter-form" action="#" method="POST">
              <input
                className="newsletter-input"
                type="email"
                name="email"
                placeholder="your@email.com"
                required
              />
              <button className="newsletter-btn" type="submit">订阅 →</button>
            </form>
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
