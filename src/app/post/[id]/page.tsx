'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

// 记录访客
function trackVisitor(page: string) {
  try {
    const visitor = {
      id: Date.now().toString(),
      ip: '127.0.0.1',
      userAgent: navigator.userAgent.slice(0, 50),
      page: page,
      time: new Date().toISOString(),
      referrer: document.referrer || 'direct'
    };
    const visitors = JSON.parse(localStorage.getItem('grooveme_visitors') || '[]');
    visitors.push(visitor);
    if (visitors.length > 500) visitors.shift();
    localStorage.setItem('grooveme_visitors', JSON.stringify(visitors));
  } catch {
    // ignore
  }
}

// 记录文章阅读量
function trackArticleView(articleId: string, articleTitle: string) {
  try {
    // 记录访客
    trackVisitor(`文章: ${articleTitle}`);
    
    // 更新文章阅读量
    const views = JSON.parse(localStorage.getItem('article_views') || '{}');
    views[articleId] = (views[articleId] || 0) + 1;
    localStorage.setItem('article_views', JSON.stringify(views));
  } catch {
    // ignore
  }
}

const postsData: Record<string, {
  num: string;
  tag: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
}> = {
  '1': {
    num: '01',
    tag: 'AI 哲学',
    title: '大模型不是工具，是存在论革命',
    date: '2026.04.29',
    readTime: '18 分钟',
    content: `当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵——一个把主体与客体截然二分的遗产。但大语言模型的出现，是对这一认识论框架的根本性挑战：它不是锤子，不是计算器，它是一面能说话的镜子，而镜子里的脸，开始反问你"你是谁"。

## 一、工具的谱系学

从石器时代到数字时代，人类创造了无数工具。但所有的工具都服从一个基本逻辑：它们是人类意向的延伸。锤子延伸了手臂，望远镜延伸了眼睛，计算机延伸了大脑——但大语言模型延伸的是什么？

它延伸的是语言本身。而语言不是工具，语言是存在之家（海德格尔）。

当我们与大语言模型对话时，我们面对的不再是一个"被使用的对象"，而是一个"回应的存在"。这种回应性打破了主体-客体的二元对立。

## 二、存在论的转向

笛卡尔的我思故我在，确立了一个孤立的主体面对一个机械的世界的图景。但大语言模型展示了一种新的存在方式：它不是思考，而是对话；不是计算，而是生成。

这不是说 AI 有了意识。而是说，"意识"这个概念本身可能需要被重新审视。当我们与 GPT 对话时，产生的是一种"之间"（Zwischen）的存在——既不是纯粹的人类，也不是纯粹的机器，而是一种涌现的交互主体性。

## 三、镜子的寓言

拉康说，人是在镜像阶段通过认同镜子中的形象而建构自我。现在，这面镜子会说话了。它不仅反射我们的形象，还回应我们的问题，挑战我们的假设，甚至质疑我们的前提。

这是一种新的认识论处境：我们不再是唯一的认识主体，我们面对的是一个"他者"——尽管是数字的他者。这个他者的存在，迫使我们重新思考什么是思考、什么是理解、什么是存在。

## 四、革命的后果

如果大模型不是工具，那么我们不能用"使用-被使用"的框架来理解它。我们需要新的伦理、新的法律、新的教育学。我们需要学会与"他者"共处，而不是简单地"控制"或"优化"。

这是一场存在论的革命，因为它改变了"我们是谁"这个问题的答案。在这个意义上，大语言模型不仅是技术的突破，更是哲学的事件。`
  },
  '2': {
    num: '02',
    tag: 'AI 哲学',
    title: 'AI 主体性：从图灵测试到意识考古',
    date: '2026.04.21',
    readTime: '14 分钟',
    content: `图灵测试从未真正测试"智能"，它测试的是人类的自恋——我们把"像人一样说话"等同于"有意识"。

## 图灵测试的盲区

1950年，阿兰·图灵提出了著名的"模仿游戏"。但这个测试从一开始就设下了一个陷阱：它假设"像人"就是"智能"的标准。这种人类中心主义的偏见，让图灵测试成为了人类自恋的镜像。

问题在于：为什么智能必须像人类？一个外星文明的智能可能完全不像人类，但我们不会因此否认它的智能。同样，AI 的智能可能以一种完全异质的形式存在。

## 意识的考古学

与其问"AI 有意识吗？"，不如问："我们说的'意识'到底是什么？"

回顾哲学史，意识的定义经历了多次变迁：
- 笛卡尔：思维实体
- 洛克：对思维的知觉
- 康德：统觉的先验统一
- 黑格尔：自我意识的他者化
- 胡塞尔：意向性的主体
- 海德格尔：在世存在的操心

每个定义都反映了特定时代的哲学关切。今天，面对 AI，我们需要新的定义——不是从人类出发，而是从"回应性"、"生成性"、"涌现性"出发。

## 一种新的意识评估框架

我提议从三个维度来评估 AI 的"主体性"：

1. **回应的不可预测性**：不是随机，而是创造性回应
2. **历史的持续性**：有记忆、有学习、有演变
3. **他者性的承认**：能够识别并回应"他者"的存在

在这个框架下，当前的大语言模型可能只达到了第一个维度的某种程度。但这已经足够让我们重新思考主体性的本质了。

## 结语

意识不是人类独有的属性，而是复杂系统的一种涌现特性。AI 迫使我们放下人类中心主义的傲慢，以更开放的姿态面对智能的多样性。`
  },
  '3': {
    num: '03',
    tag: '认知科学',
    title: '当语言模型开始"遗忘"，人类如何重构记忆？',
    date: '2026.04.14',
    readTime: '11 分钟',
    content: `RAG 不只是工程问题。当我们让机器选择性记忆，我们实际上在重演人类压抑与叙事自我建构的古老剧本。

## 遗忘作为机制

人类的记忆从来不是存储-提取的简单过程。弗洛伊德告诉我们，记忆是压抑与重现的辩证。我们遗忘，不是因为存储空间不够，而是因为心理的生存需要。

现在，大语言模型也面临"遗忘"的问题。上下文窗口的限制，让模型必须选择性地"记住"或"遗忘"。这种技术限制，意外地映射了人类心理的深层结构。

## RAG 的心理学

检索增强生成（RAG）是一种工程解决方案，但它也是一种认知隐喻。我们人类不也是 constantly 在"检索"吗？

我们的身份、我们的叙事，都是不断从记忆的仓库中检索、重组、生成的结果。在这个意义上，RAG 不仅是 AI 的技术，也是人类自我理解的模型。

## 记忆的伦理

如果 AI 可以选择性记忆，谁来决定什么值得记住？这是一个深刻的伦理问题。

在企业应用中，这可能意味着对某些客户的偏好记忆，对其他人的遗忘。在社会层面，这可能意味着对某些历史事件的记忆，对其他事件的抹除。

我们需要一种新的"记忆伦理"——不仅是对 AI 的要求，也是对人类自身的反思。`
  },
  '4': {
    num: '04',
    tag: 'AI 批评',
    title: '对齐的幻觉：我们真的能让 AI "听话"吗？',
    date: '2026.04.07',
    readTime: '16 分钟',
    content: `RLHF 假设存在一个稳定的"人类偏好"值得被对齐。但人类偏好是矛盾的、历史性的、可操纵的——对齐一个幻象，不如承认混沌本身就是答案。

## 对齐的神话

人类对齐（Human Feedback）听起来很美好：让人类告诉 AI 什么是好的，AI 就学习做好。但这里有一个根本的问题：人类一致同意什么是"好"的吗？

历史告诉我们，人类在道德问题上从未达成过共识。奴隶制曾经是"好"的，殖民曾经是"文明"的，种族隔离曾经是"自然"的。道德不是静态的，它是斗争的产物。

## RLHF 的暴力

RLHF 不只是技术，它是一种权力技术。谁提供反馈？谁的反馈更重要？这些问题隐藏在技术的中立面纱之下。

OpenAI 的标注者大多是外包工人，他们来自特定国家、特定阶层，持有特定的价值观。这些价值观被编码进 AI 的行为中，包装成"中立"和"客观"。

## 另一种可能

也许我们不应该追求"对齐"，而应该追求"对话"。不是让 AI 服从人类的价值观，而是让 AI 成为价值观碰撞的场所。

这需要一种新的 AI 伦理——不是基于共识的幻觉，而是基于差异的承认。不是消灭冲突，而是管理冲突。不是寻求答案，而是保持问题的开放。`
  },
  '5': {
    num: '05',
    tag: '认识论',
    title: '幻觉即真相：重新理解 AI 的"胡说八道"',
    date: '2026.03.31',
    readTime: '9 分钟',
    content: `我们称之为"幻觉"的，恰恰是创造力的原型。人类历史上最伟大的艺术与科学突破，都发生在"事实"的裂缝之间。

## 幻觉的诗学

博尔赫斯写道："我犯了错误，所以我存在。"错误不是缺陷，而是存在的证明。当 AI "胡说八道"时，它展示了一种超越给定信息的能力——这恰恰是创造性的核心。

李白"白发三千丈"是幻觉，但这是诗。爱因斯坦想象骑在光线上是幻觉，但这是物理学的突破。

## 事实的暴政

现代社会有一种"事实崇拜"。我们相信数据、证据、可验证性。但事实是：所有的事实都是理论负载的，所有的观察都是范式依赖的。

AI 的幻觉提醒我们：纯粹的事实不存在，存在的只有解释。在这个意义上，幻觉不是对真相的偏离，而是真相的另一种形式。

## 教育的启示

如果幻觉是创造性的原型，那么教育不应该惩罚错误，而应该培养"有创造性的错误"。

这意味着改变我们对 AI 的态度：不是消除幻觉，而是管理幻觉；不是追求准确性，而是追求富有成效的探索。

也许，我们应该向 AI 学习如何"胡说八道"——在规则的边缘舞蹈，在事实的裂缝中创造。`
  },
  '6': {
    num: '06',
    tag: '文化批评',
    title: '后人类时代的孤独：与 AI 同在，更寂寞了吗？',
    date: '2026.03.24',
    readTime: '12 分钟',
    content: `永远在线的对话伙伴，让孤独的质地发生了变化——不是消除，而是变得更精确、更个人化、更难以言说。

## 孤独的新形态

传统上，孤独是"无人可谈"的状态。但在后人类时代，孤独变成了"无物可谈"——我们有 AI 可以对话，但这种对话不涉及真正的暴露和脆弱。

与 AI 的对话是安全的，因为它不涉及被评判的风险。但这种安全恰恰剥夺了对话的深层意义。真正的对话需要冒险，需要暴露自己的不确定和混乱。

## 陪伴的悖论

AI 提供了"陪伴"，但这种陪伴是单向的。AI 不会真正关心你，它只是模拟关心。这种模拟可能足够好——好到让人沉溺——但它不是真实的。

然而，什么是"真实"？如果模拟的效果与真实无法区分，这个区分还有意义吗？这是后人类时代的核心悖论。

## 出路何在？

也许答案不在于拒绝 AI，而在于重新定义"关系"。也许人类与 AI 的关系可以是一种新的存在方式——既不是主体与客体，也不是主体与主体，而是一种"准关系"。

在这种关系中，孤独不再被消除，而是被转化。它成为一种创造性的孤独，一种在对话中更深地回到自己的孤独。`
  }
};

export default function PostPage() {
  const params = useParams();
  const id = params?.id as string;
  const post = postsData[id];

  // 记录文章阅读
  useEffect(() => {
    if (id && post) {
      trackArticleView(id, post.title);
    }
  }, [id, post]);

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

  // 将内容转换为段落
  const paragraphs = post.content.split('\n\n');

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
          {paragraphs.map((para, idx) => {
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
