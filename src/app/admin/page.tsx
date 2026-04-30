'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AUTH_KEY = 'grooveme_admin_auth';

// 文章数据类型
interface Post {
  id: string;
  num: string;
  tag: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  views: number;
  status: 'published' | 'draft';
}

// 访客记录类型
interface Visitor {
  id: string;
  ip: string;
  userAgent: string;
  page: string;
  time: string;
  referrer?: string;
}

// 默认文章数据
const defaultPosts: Post[] = [
  {
    id: '1',
    num: '01',
    tag: 'AI 哲学',
    title: '大模型不是工具，是存在论革命',
    excerpt: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵...',
    content: '',
    date: '2026.04.29',
    readTime: '18 分钟',
    views: 1234,
    status: 'published'
  },
  {
    id: '2',
    num: '02',
    tag: 'AI 哲学',
    title: 'AI 主体性：从图灵测试到意识考古',
    excerpt: '图灵测试从未真正测试"智能"...',
    content: '',
    date: '2026.04.21',
    readTime: '14 分钟',
    views: 892,
    status: 'published'
  },
  {
    id: '3',
    num: '03',
    tag: '认知科学',
    title: '当语言模型开始"遗忘"，人类如何重构记忆？',
    excerpt: 'RAG 不只是工程问题...',
    content: '',
    date: '2026.04.14',
    readTime: '11 分钟',
    views: 567,
    status: 'published'
  },
  {
    id: '4',
    num: '04',
    tag: 'AI 批评',
    title: '对齐的幻觉：我们真的能让 AI "听话"吗？',
    excerpt: 'RLHF 假设存在一个稳定的"人类偏好"...',
    content: '',
    date: '2026.04.07',
    readTime: '16 分钟',
    views: 445,
    status: 'published'
  },
  {
    id: '5',
    num: '05',
    tag: '认识论',
    title: '幻觉即真相：重新理解 AI 的"胡说八道"',
    excerpt: '我们称之为"幻觉"的，恰恰是创造力的原型...',
    content: '',
    date: '2026.03.31',
    readTime: '9 分钟',
    views: 678,
    status: 'published'
  },
  {
    id: '6',
    num: '06',
    tag: '文化批评',
    title: '后人类时代的孤独：与 AI 同在，更寂寞了吗？',
    excerpt: '永远在线的对话伙伴，让孤独的质地发生了变化...',
    content: '',
    date: '2026.03.24',
    readTime: '12 分钟',
    views: 789,
    status: 'published'
  }
];

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'posts' | 'stats' | 'visitors'>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [totalViews, setTotalViews] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // 权限检查
  useEffect(() => {
    const isAuth = localStorage.getItem(AUTH_KEY);
    if (isAuth !== 'true') {
      router.push('/admin/login');
    }
  }, [router]);

  // 加载数据
  useEffect(() => {
    // 加载文章
    const savedPosts = localStorage.getItem('grooveme_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(defaultPosts);
      localStorage.setItem('grooveme_posts', JSON.stringify(defaultPosts));
    }

    // 加载访客记录
    const savedVisitors = localStorage.getItem('grooveme_visitors');
    if (savedVisitors) {
      const v = JSON.parse(savedVisitors);
      setVisitors(v);
      setTodayVisitors(v.filter((x: Visitor) => {
        const visitDate = new Date(x.time);
        const today = new Date();
        return visitDate.toDateString() === today.toDateString();
      }).length);
    }

    // 计算总阅读量
    const views = localStorage.getItem('article_views');
    if (views) {
      const viewsData: Record<string, number> = JSON.parse(views);
      const total = Object.values(viewsData).reduce((a, b) => a + b, 0);
      setTotalViews(total);
    }
  }, []);

  // 保存文章
  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem('grooveme_posts', JSON.stringify(newPosts));
  };

  // 登出
  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    router.push('/admin/login');
  };

  // 删除文章
  const deletePost = (id: string) => {
    if (confirm('确定要删除这篇文章吗？')) {
      const newPosts = posts.filter(p => p.id !== id);
      savePosts(newPosts);
    }
  };

  // 保存编辑
  const saveEdit = () => {
    if (!editingPost) return;
    
    const newPosts = posts.map(p => 
      p.id === editingPost.id ? editingPost : p
    );
    
    // 如果是新文章
    if (!posts.find(p => p.id === editingPost.id)) {
      newPosts.unshift(editingPost);
    }
    
    savePosts(newPosts);
    setShowEditor(false);
    setEditingPost(null);
  };

  // 创建新文章
  const createNewPost = () => {
    const newId = String(posts.length + 1);
    const newPost: Post = {
      id: newId,
      num: newId.padStart(2, '0'),
      tag: '未分类',
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      readTime: '10 分钟',
      views: 0,
      status: 'draft'
    };
    setEditingPost(newPost);
    setShowEditor(true);
  };

  // 过滤文章
  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 统计图表数据
  const statsData = posts.map(p => ({
    name: p.title.slice(0, 10) + '...',
    views: p.views,
    tag: p.tag
  }));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* 管理头部 */}
      <header style={{ background: 'var(--groove)', borderBottom: '3px solid var(--accent)' }}>
        <div className="logo" style={{ color: '#fff' }}>
          <div className="logo-vinyl"></div>
          <div className="logo-text">GrooveMe<span>Admin</span></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
            管理员已登录
          </span>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', textDecoration: 'none' }}>
            查看网站
          </Link>
          <button 
            onClick={handleLogout}
            style={{
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              fontSize: '0.7rem',
              cursor: 'pointer',
              fontFamily: 'Space Mono, monospace'
            }}
          >
            退出登录
          </button>
        </div>
      </header>

      {/* 管理内容 */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 72px)' }}>
        {/* 侧边栏 */}
        <aside style={{
          background: '#fff',
          borderRight: '1px solid var(--paper2)',
          padding: '1.5rem'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('posts')}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                border: 'none',
                background: activeTab === 'posts' ? 'var(--paper2)' : 'transparent',
                cursor: 'pointer',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>📝</span> 文章管理
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                border: 'none',
                background: activeTab === 'stats' ? 'var(--paper2)' : 'transparent',
                cursor: 'pointer',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>📊</span> 数据统计
            </button>
            <button
              onClick={() => setActiveTab('visitors')}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                border: 'none',
                background: activeTab === 'visitors' ? 'var(--paper2)' : 'transparent',
                cursor: 'pointer',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>👥</span> 访客信息
            </button>
          </nav>

          {/* 快捷统计 */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--paper2)' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>
              概览
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--ink)' }}>{posts.length}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>文章总数</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent)' }}>{totalViews.toLocaleString()}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>总阅读量</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--ink)' }}>{todayVisitors}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>今日访客</div>
              </div>
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main style={{ padding: '2rem' }}>
          {/* 文章管理 */}
          {activeTab === 'posts' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>文章管理</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="搜索文章..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid var(--paper2)',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.8rem',
                      width: '200px'
                    }}
                  />
                  <button
                    onClick={createNewPost}
                    style={{
                      background: 'var(--accent)',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      fontFamily: 'Space Mono, monospace'
                    }}
                  >
                    + 新建文章
                  </button>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--paper2)' }}>
                {/* 表头 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 2fr 100px 120px 80px 100px 120px',
                  padding: '12px 16px',
                  background: 'var(--paper2)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)'
                }}>
                  <span>编号</span>
                  <span>标题</span>
                  <span>分类</span>
                  <span>日期</span>
                  <span>阅读</span>
                  <span>状态</span>
                  <span>操作</span>
                </div>

                {/* 文章列表 */}
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 2fr 100px 120px 80px 100px 120px',
                      padding: '16px',
                      borderTop: '1px solid var(--paper2)',
                      alignItems: 'center',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span style={{ color: 'var(--muted)', fontWeight: 700 }}>{post.num}</span>
                    <span style={{ fontWeight: 500 }}>{post.title}</span>
                    <span style={{ color: 'var(--muted)' }}>{post.tag}</span>
                    <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{post.date}</span>
                    <span style={{ fontWeight: 700 }}>{post.views.toLocaleString()}</span>
                    <span>
                      <span style={{
                        padding: '4px 8px',
                        fontSize: '0.65rem',
                        background: post.status === 'published' ? 'rgba(76,175,80,0.1)' : 'rgba(200,65,15,0.1)',
                        color: post.status === 'published' ? '#4caf50' : 'var(--accent)'
                      }}>
                        {post.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </span>
                    <span style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setShowEditor(true);
                        }}
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.7rem',
                          border: '1px solid var(--paper2)',
                          background: '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.7rem',
                          border: '1px solid var(--accent)',
                          background: '#fff',
                          color: 'var(--accent)',
                          cursor: 'pointer'
                        }}
                      >
                        删除
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 数据统计 */}
          {activeTab === 'stats' && (
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>文章热度统计</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid var(--paper2)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)' }}>{totalViews.toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>总阅读量</div>
                </div>
                <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid var(--paper2)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--ink)' }}>{posts.filter(p => p.status === 'published').length}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>已发布</div>
                </div>
                <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid var(--paper2)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--ink2)' }}>
                    {posts.length > 0 ? Math.round(totalViews / posts.length) : 0}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>平均阅读</div>
                </div>
              </div>

              {/* 文章阅读量排行 */}
              <div style={{ background: '#fff', border: '1px solid var(--paper2)', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>阅读量排行</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[...posts].sort((a, b) => b.views - a.views).map((post, index) => (
                    <div key={post.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--muted)', width: '30px' }}>
                        {index + 1}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>{post.title}</div>
                        <div style={{ 
                          height: '8px', 
                          background: 'var(--paper2)', 
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${posts.length > 0 ? (post.views / Math.max(...posts.map(p => p.views))) * 100 : 0}%`,
                            background: index < 3 ? 'var(--accent)' : 'var(--muted)',
                            borderRadius: '4px'
                          }} />
                        </div>
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{post.views.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 访客信息 */}
          {activeTab === 'visitors' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>访客信息</h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                  今日访客: <strong style={{ color: 'var(--accent)' }}>{todayVisitors}</strong> 人
                </span>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--paper2)' }}>
                {/* 表头 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 2fr 150px 100px',
                  padding: '12px 16px',
                  background: 'var(--paper2)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)'
                }}>
                  <span>访问时间</span>
                  <span>页面</span>
                  <span>设备信息</span>
                  <span>IP</span>
                </div>

                {/* 访客列表 */}
                {visitors.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted)' }}>
                    暂无访客记录（数据会在用户访问网站时自动收集）
                  </div>
                ) : (
                  [...visitors].reverse().slice(0, 50).map((visitor) => (
                    <div
                      key={visitor.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '180px 2fr 150px 100px',
                        padding: '12px 16px',
                        borderTop: '1px solid var(--paper2)',
                        alignItems: 'center',
                        fontSize: '0.75rem'
                      }}
                    >
                      <span style={{ fontFamily: 'Space Mono, monospace' }}>
                        {new Date(visitor.time).toLocaleString('zh-CN')}
                      </span>
                      <span>{visitor.page}</span>
                      <span style={{ color: 'var(--muted)' }}>
                        {visitor.userAgent.slice(0, 20)}...
                      </span>
                      <span style={{ fontFamily: 'Space Mono, monospace', color: 'var(--muted)' }}>
                        {visitor.ip}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 文章编辑器弹窗 */}
      {showEditor && editingPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              {editingPost.id && posts.find(p => p.id === editingPost.id) ? '编辑文章' : '新建文章'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  标题
                </label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid var(--paper2)',
                    fontSize: '1rem',
                    marginTop: '4px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    分类
                  </label>
                  <input
                    type="text"
                    value={editingPost.tag}
                    onChange={(e) => setEditingPost({...editingPost, tag: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--paper2)',
                      fontSize: '0.9rem',
                      marginTop: '4px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    阅读时间
                  </label>
                  <input
                    type="text"
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({...editingPost, readTime: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--paper2)',
                      fontSize: '0.9rem',
                      marginTop: '4px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    状态
                  </label>
                  <select
                    value={editingPost.status}
                    onChange={(e) => setEditingPost({...editingPost, status: e.target.value as 'published' | 'draft'})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--paper2)',
                      fontSize: '0.9rem',
                      marginTop: '4px'
                    }}
                  >
                    <option value="draft">草稿</option>
                    <option value="published">已发布</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  摘要
                </label>
                <textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid var(--paper2)',
                    fontSize: '0.9rem',
                    marginTop: '4px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  正文内容
                </label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  rows={10}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid var(--paper2)',
                    fontSize: '0.9rem',
                    marginTop: '4px',
                    resize: 'vertical',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowEditor(false);
                  setEditingPost(null);
                }}
                style={{
                  padding: '10px 20px',
                  border: '1px solid var(--paper2)',
                  background: '#fff',
                  cursor: 'pointer',
                  fontFamily: 'Space Mono, monospace'
                }}
              >
                取消
              </button>
              <button
                onClick={saveEdit}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  background: 'var(--accent)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: 'Space Mono, monospace'
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
