'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 管理员密码 - 建议修改为您自己的密码
const ADMIN_PASSWORD = 'GrooveMe2024!Admin';
const AUTH_KEY = 'grooveme_admin_auth';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 检查是否已登录
  useEffect(() => {
    const isAuth = localStorage.getItem(AUTH_KEY);
    if (isAuth === 'true') {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 模拟网络延迟
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem('admin_login_time', new Date().toISOString());
        router.push('/admin');
      } else {
        setError('密码错误，请重试');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--paper)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 头部 */}
      <header>
        <Link href="/" className="logo">
          <div className="logo-vinyl"></div>
          <div className="logo-text">GrooveMe<span>Blog</span></div>
        </Link>
        <nav>
          <Link href="/">返回首页</Link>
        </nav>
      </header>

      {/* 登录区域 */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: '#fff',
          padding: '3rem',
          border: '1px solid var(--paper2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.5rem',
              fontWeight: 900,
              marginBottom: '0.5rem'
            }}>
              管理后台
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--muted)',
              letterSpacing: '0.1em'
            }}>
              ADMINISTRATOR ONLY
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(200,65,15,0.1)',
              color: 'var(--accent)',
              padding: '12px',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '0.5rem'
              }}>
                管理密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入管理员密码"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--paper2)',
                  fontSize: '1rem',
                  fontFamily: 'Space Mono, monospace',
                  outline: 'none',
                  background: 'var(--paper)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--paper2)';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? 'var(--muted)' : 'var(--groove)',
                color: '#fff',
                border: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Space Mono, monospace'
              }}
            >
              {loading ? '验证中...' : '进入管理后台'}
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--paper2)',
            fontSize: '0.7rem',
            color: 'var(--muted)',
            textAlign: 'center',
            lineHeight: 1.8
          }}>
            <p>此页面仅限系统管理员访问</p>
            <p>未经授权的访问将被记录</p>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer>
        <div>
          <div className="f-brand">GrooveMe</div>
          <div>管理后台 · 严格权限控制</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>© 2026 GrooveMe · 保留所有权利</div>
        </div>
      </footer>
    </div>
  );
}
