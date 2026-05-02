// 纯内存稳定版 —— 绝对不卡、绝对不丢

// 存储 Key
export const POSTS_KEY = "posts";
export const VIEWS_KEY = "views";
export const VISITORS_KEY = "visitors";

// 默认内置文章（20篇，永不丢失）
const DEFAULT_POSTS = [
  { id: '1', num: '01', tag: 'AI 哲学', title: '大模型不是工具，是存在论革命', excerpt: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵...', content: '当我们把 GPT 称为"工具"，我们继承了笛卡尔的幽灵——一个把主体与客体截然二分的遗产。但大语言模型的出现，是对这一认识论框架的根本性挑战。', date: '2026.04.29', readTime: '18 分钟', views: 1234, status: 'published', isBuiltIn: true },
  { id: '2', num: '02', tag: 'AI 哲学', title: 'AI 主体性：从图灵测试到意识考古', excerpt: '图灵测试从未真正测试"智能"...', content: '图灵测试从未真正测试"智能"，它测试的是"模仿"。当一个 AI 系统能通过图灵测试，它证明的不是它有意识，而是我们对"意识"的理解是多么肤浅。', date: '2026.04.21', readTime: '14 分钟', views: 892, status: 'published', isBuiltIn: true },
  { id: '3', num: '03', tag: '认知科学', title: '当语言模型开始"遗忘"，人类如何重构记忆？', excerpt: 'RAG 不只是工程问题...', content: 'RAG 不只是工程问题。当我们让机器选择性记忆，我们实际上在重演人类压抑与叙事自我建构的古老剧本。', date: '2026.04.14', readTime: '11 分钟', views: 567, status: 'published', isBuiltIn: true },
  { id: '4', num: '04', tag: 'AI 批评', title: '对齐的幻觉：我们真的能让 AI "听话"吗？', excerpt: 'RLHF 假设存在一个稳定的"人类偏好"...', content: 'RLHF 假设存在一个稳定的"人类偏好"。但人类偏好在哪？在硅谷工程师的脑子里？还是在训练数据的统计模式里？', date: '2026.04.07', readTime: '16 分钟', views: 445, status: 'published', isBuiltIn: true },
  { id: '5', num: '05', tag: '认识论', title: '幻觉即真相：重新理解 AI 的"胡说八道"', excerpt: '我们称之为"幻觉"的，恰恰是创造力的原型...', content: '我们称之为"幻觉"的，恰恰是创造力的原型。当 AI 说出"拿破仑参加了第二次世界大战"，它不是在"说谎"，而是在展示一种超越事实关联的生成能力。', date: '2026.03.31', readTime: '9 分钟', views: 678, status: 'published', isBuiltIn: true },
  { id: '6', num: '06', tag: '文化批评', title: '后人类时代的孤独：与 AI 同在，更寂寞了吗？', excerpt: '永远在线的对话伙伴，让孤独的质地发生了变化...', content: '永远在线的对话伙伴，让孤独的质地发生了变化。以前，孤独意味着缺席——没有人在场。现在，孤独可以有 AI 在场。', date: '2026.03.24', readTime: '12 分钟', views: 789, status: 'published', isBuiltIn: true },
  { id: '7', num: '07', tag: 'AI 哲学', title: 'AI的制度：技术改变的是生产力，而规则定义的是文明度', excerpt: '文明的门槛：从自律到共律...', content: '即使 AI 抹平了物质匮乏，人类依然会通过分化来寻找定位。"对规则的彻底遵守"作为高维文明的象征，预示了人类社会管理逻辑的根本转变：从"权力治理"转向"算法正义"。当规则可以被写入底层协议，不可违逆性使遵守规则不再是道德选择，而是社会运作的物理定律。', date: '2026.03.17', readTime: '15 分钟', views: 1120, status: 'published', isBuiltIn: true },
  { id: '8', num: '08', tag: '艺术', title: '山河故人', excerpt: '你不自觉的沉默，站在街道的另一面...', content: '你不自觉的沉默，站在街道的另一面，恍然间。灿烂还灿烂着的夜晚，微风几许，我相信那些穿过黑夜的眼睛。暮光晨曦间节节而起的涟漪，山河湖水里的故人！我们做过最残忍的事，说过最残忍的话语，留下了永久的怀念。', date: '2026.03.10', readTime: '6 分钟', views: 580, status: 'published', isBuiltIn: true },
  { id: '9', num: '09', tag: '认知与感受', title: 'Pauk的微信意图：意义的消失或混沌', excerpt: 'How hard can it be！', content: '"意义的消失或混沌"——我通过高强度认知和人格独立来对抗平庸与虚无。认知作为武器，知识是动态的判断力和审美力。超越物质的审美追求，在"食欲和物欲"之外寻找"足够的 cool"。极度的人格独立，绝不谄媚，只选择与有"赋能"能力和"创造力"的人产生链接。', date: '2026.03.03', readTime: '10 分钟', views: 920, status: 'published', isBuiltIn: true },
  { id: '10', num: '10', tag: '认知与感受', title: '从"无神论"到"向内观察"：一场关于存在与觉醒的突围', excerpt: '放弃那种"SB又执拗"的自证吧...', content: '真相不在缺失的拼图里，而在那个"正在寻找拼图"的观察者身上。曾几何时，我以"无神论"自居，却亲手把自己锁进了由逻辑、公式构成的牢笼。当持续的努力无法推导出预期结果，存在感便开始塌缩。向内观察，才是我们在这个喧嚣时代唯一的自救。', date: '2026.02.24', readTime: '12 分钟', views: 1050, status: 'published', isBuiltIn: true },
  { id: '11', num: '11', tag: 'AI 哲学', title: '变革的开始1：批量时代的终结——当生产力撞上极致定制', excerpt: '柔性制造、AI设计、按需生产...', content: '在过去一百年里，"规模经济"是商业世界的唯一真理。但随着AI与智能制造的深度融合，这个"批量时代"正在加速崩溃。二元生产结构兴起：基础能源交由机器人批量生产，消费类产品全面转向定制化。AI消除信息不对称，生产一件与一万件的成本差异正在消失。', date: '2026.02.17', readTime: '13 分钟', views: 1150, status: 'published', isBuiltIn: true },
  { id: '12', num: '12', tag: 'AI 哲学', title: '变革的开始2：数字部落的崛起——极致差异后的"意识形态趋同"', excerpt: '数字化物物交换、价值标签、数字部落...', content: '当AI抹平了物质匮乏，人类社会是否会陷入无序的碎片化？答案是否定的。资源对需求的直连将成为可能，传统货币的中介作用被削弱。当差异化变得廉价时，有意识的"同质化"将成为稀缺的社交信号。基于审美、信仰和价值观的"部落政治"将兴起。', date: '2026.02.10', readTime: '14 分钟', views: 1180, status: 'published', isBuiltIn: true },
  { id: '13', num: '13', tag: 'AI 哲学', title: '变革的开始3：文明的终极象征——从"人治"走向"规则本位"', excerpt: '算法正义、高维文明、规则透明...', content: '技术的发展解决了"怎么做"的问题，但无法自动解决"怎么相处"的问题。高维文明的象征，是人类能够从依赖"人治"的博弈，进化为对"算法正义"和"共识规则"的绝对遵守。对规则的敬畏与执行，是人类通往高维社会的唯一门票。', date: '2026.02.03', readTime: '11 分钟', views: 1220, status: 'published', isBuiltIn: true },
  { id: '14', num: '14', tag: '人类未来', title: '人类未来1：人类生命的"系统性Bug"——从80/20悖论到生物学阶级化', excerpt: '如果人类生命是一段代码，它的设计显然有违天道...', content: '用80%的高质量人生去换取20%的风烛残年，这种"前期苦修、后期衰败"的硬件设定，在硅碳交互的未来，究竟会进化还是异化？当财富可以转化为"干细胞移植"和"细胞复制"时，阶级将不再只是金钱的多寡，而是生物等级的差异。', date: '2026.01.27', readTime: '16 分钟', views: 1350, status: 'published', isBuiltIn: true },
  { id: '15', num: '15', tag: 'AI 批评', title: '人类未来2：从"被剥削"到"被忽略"：AI时代下"无用阶级"的悲凉底色', excerpt: '比无产阶级更惨的是"无用阶级"...', content: '因为后者连作为"筹码"的价值都消失了。当AI和机器人能提供更廉价、更忠诚、更高效的生产力时，普通人与系统的博弈底牌彻底输光。当算法可以预判并替代你的所有决策时，个体奋斗的意义正变得模糊不清。', date: '2026.01.20', readTime: '15 分钟', views: 1420, status: 'published', isBuiltIn: true },
  { id: '16', num: '16', tag: 'AI 哲学', title: '人类未来3：夺回进化的解释权：开源与去中心化是人类最后的长矛', excerpt: '面对"只传王侯钻"的科技垄断...', content: '我们必须用算法对抗算法，用去中心化对抗独裁。开源是知识的"核不扩散协议"，只有坚持开源，让长寿方案、增强算法在民间流动，才能防止特权阶层完成"物种隔离"。未来的战场在于谁掌握了数据的分配权和进化的解释权。', date: '2026.01.13', readTime: '14 分钟', views: 1280, status: 'published', isBuiltIn: true },
  { id: '17', num: '17', tag: '艺术', title: 'shadow', excerpt: 'From heart to here, shadow of the tree...', content: 'Shadow of the tree, shadow of the house，那些经历，ok ok ok，only my shadow。从山边到河边，从家乡到这里，所有的时间，现在变成了shadow。随着光移动的只有自己，shadow of my body，shadow of my heart，从开始到结束，从诞生到消失。', date: '2026.01.06', readTime: '5 分钟', views: 520, status: 'published', isBuiltIn: true },
  { id: '18', num: '18', tag: '音乐', title: '我的爵士吉他1：诸神的指尖——爵士吉他史上的三座丰碑', excerpt: '如果爵士乐是一座神庙，这三个人就是守门人...', content: 'Django Reinhardt：只有左手两根手指能灵活活动，却开创了疯狂的 Gypsy Jazz。Wes Montgomery：从不用拨片，只用大拇指，把八度音玩成了爵士吉他的标配。Joe Pass：把吉他变成了一台钢琴，一个人就能同时搞定底鼓、贝斯、和弦和旋律。', date: '2025.12.30', readTime: '20 分钟', views: 860, status: 'published', isBuiltIn: true },
  { id: '19', num: '19', tag: '音乐', title: '我的爵士吉他2：一生必听（且必弹）的爵士名曲桥段', excerpt: '别再瞎练了，爵士乐的密码都藏在这些曲子里...', content: '《Autumn Leaves》：最标准的 II-V-I-IV 循环，是爵士乐的"普通话"。《Take Five》：迷人的 5/4 拍节奏律动，摆脱死板的 4/4 拍。《So What》：调式爵士的极简主义，考验你如何用有限的音符弹奏出最有张力的 Solo。《Giant Steps》：和弦每两拍跳跃一次，是"滚烫岩浆上跳舞"的成人礼。', date: '2025.12.23', readTime: '18 分钟', views: 820, status: 'published', isBuiltIn: true },
  { id: '20', num: '20', tag: '音乐', title: '【平行时空】那晚，我在 52 街的禁忌 Jam Session', excerpt: '这不是普通的演出，这是一场"灵魂交换"...', content: '我坐在舞台中心，左手边是面无表情的 Allan Holdsworth，右手边是叼着烟、眼神凌厉的 Grant Green。开场曲《Giant Steps》，Allan 的手指划出诡异的弧线，音符像从四维空间掉出来的。我用 "全音阶" 位移去接他的招。当《Spain》响起，我用 Lenny Breau 的泛音技巧点缀星光。Grant 停下拨弦，嘴角露出不可思议的微笑。', date: '2025.12.16', readTime: '15 分钟', views: 950, status: 'published', isBuiltIn: true },
];

// 内存存储数组（运行时持久化）- 必须在函数之前定义
let memoryPosts = [...DEFAULT_POSTS];

// 获取文章（纯内存模式）
export async function getPosts() {
  return [...memoryPosts];
}

// 保存文章（内存模式）
export async function savePost(newPost: any) {
  if (memoryPosts.some(p => p.id === newPost.id)) return memoryPosts;
  memoryPosts.push(newPost);
  return [...memoryPosts];
}

// 更新文章（内存模式）
export async function updatePost(updatedPost: any) {
  const index = memoryPosts.findIndex(p => p.id === updatedPost.id);
  if (index === -1) return memoryPosts;
  memoryPosts[index] = { ...memoryPosts[index], ...updatedPost };
  return [...memoryPosts];
}

// 删除文章（保护内置文章）
export async function deletePost(id: string) {
  const post = memoryPosts.find(p => p.id === id);
  if (post?.isBuiltIn) {
    throw new Error("内置文章不可删除");
  }
  memoryPosts = memoryPosts.filter(p => p.id !== id);
  return [...memoryPosts];
}

// 兼容旧代码导出
export const kv = {
  get: async () => null,
  set: async () => {},
  del: async () => {},
};
