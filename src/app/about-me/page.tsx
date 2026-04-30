'use client';

import Link from 'next/link';

export default function AboutPage() {
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
          <span className="ticker-item">Based on the Kinetic Trajectory Tensor <span>✦</span></span>
          <span className="ticker-item">The future is a multidimensional fluid space <span>✦</span></span>
          <span className="ticker-item">Shaped by biology, entanglement, consciousness and entropy <span>✦</span></span>
          <span className="ticker-item">Can we transcend dimensions, reshape causality, and redefine reality? <span>✦</span></span>
          <span className="ticker-item">Based on the Kinetic Trajectory Tensor <span>✦</span></span>
          <span className="ticker-item">The future is a multidimensional fluid space <span>✦</span></span>
          <span className="ticker-item">Shaped by biology, entanglement, consciousness and entropy <span>✦</span></span>
          <span className="ticker-item">Can we transcend dimensions, reshape causality, and redefine reality? <span>✦</span></span>
        </div>
      </div>

      {/* 主体 */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2.5rem' }}>
        <div className="hero-eyebrow">关于作者</div>
        <h1 style={{ marginBottom: '3rem' }}>
          思想与<em>存在</em>
        </h1>
        
        {/* 照片 + 文字 双栏 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
          marginBottom: '4rem'
        }}>
          {/* 照片 */}
          <div style={{
            position: 'relative',
            aspectRatio: '3/4',
            background: 'var(--paper2)',
            overflow: 'hidden',
            borderRadius: '4px'
          }}>
            <img
              src="/profile.jpg"
              alt="Profile"
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* 文字内容 */}
          <div>
            <div className="manifesto-quote" style={{ marginBottom: '2rem' }}>
              Based on the Kinetic Trajectory Tensor, the future is a multidimensional fluid space, shaped by biology, entanglement, consciousness and entropy.
            </div>
            
            <p className="about-text" style={{ marginBottom: '1.5rem' }}>
              Humans have long been lost in the uncertainty of the future. We speculate and predict, yet trapped in inherent chaos.
            </p>
            
            <p className="about-text" style={{ 
              marginBottom: '1.5rem',
              fontSize: '1rem',
              color: 'var(--ink)',
              fontWeight: 700
            }}>
              Is uncertainty the ultimate code of existence? Can we transcend dimensions, reshape causality, and redefine reality?
            </p>

            <p className="about-text" style={{ marginBottom: '1.5rem' }}>
              Based on the Kinetic Trajectory Tensor, the future is a multidimensional fluid space, shaped by biology, entanglement, consciousness and entropy.
            </p>

            <div style={{ marginTop: '3rem' }}>
              <Link href="/" className="read-btn">
                <span className="arrow">←</span> 返回首页
              </Link>
            </div>
          </div>
        </div>

        {/* 联系信息 */}
        <div style={{ 
          borderTop: '1px solid var(--paper2)',
          paddingTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '0.7rem', 
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '1rem'
            }}>联系</h3>
            <p className="about-text">hello@grooveme.blog</p>
          </div>
          <div>
            <h3 style={{ 
              fontSize: '0.7rem', 
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '1rem'
            }}>位置</h3>
            <p className="about-text">中国 · 深圳</p>
          </div>
          <div>
            <h3 style={{ 
              fontSize: '0.7rem', 
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '1rem'
            }}>更新</h3>
            <p className="about-text">每周二更新</p>
          </div>
        </div>
      </main>

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
