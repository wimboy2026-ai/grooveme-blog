# 博客系统JWT登录态管理方案（完整版）

## 一、整体登录流程（OAuth 第三方登录）

```
用户点击 Google / GitHub / 微信登录按钮
    ↓
跳转第三方授权页面
    ↓
授权成功后，第三方重定向回你配置的回调接口
    ↓
/auth/callback/google
/auth/callback/github
/auth/callback/wechat
    ↓
后端接收授权码 → 获取用户信息 → 校验 / 注册用户 → 生成登录态
    ↓
登录态返回前端 → 前端持久化存储
    ↓
后续所有请求携带登录态 → 后端校验身份与权限
```

## 二、登录态设计（最安全通用方案）

### 1. 登录态格式
使用 JWT（Token） 作为登录态

```json
{
  "userId": "唯一ID",
  "role": "guest | user | admin",
  "nickname": "用户名",
  "avatar": "头像",
  "exp": 1735689600,  // 过期时间
  "iat": 1735084800   // 签发时间
}
```

### 2. 角色枚举（严格对应你的权限）
- `guest`：未登录用户
- `user`：普通用户
- `admin`：管理员

### 3. 过期策略
- **有效期**：7 天
- **自动续期**：每次访问页面刷新过期时间（可选）

## 三、登录态存储位置

### 前端：
- **浏览器 localStorage**（持久化）
- **或 cookie**（更安全）

### 后端：
- **无需存储 session**
- **仅通过 JWT 密钥校验登录态合法性**

## 四、后端核心逻辑（Node / Python 通用）

### 1. OAuth 回调统一逻辑
所有第三方登录回调执行相同流程：

```
接收 code
    ↓
请求第三方接口获取用户信息（openid / 邮箱 / 头像 / 名称）
    ↓
根据唯一标识（openid/email）查询数据库是否存在
    ↓
存在：直接登录
不存在：自动注册（默认角色：user 普通用户）
    ↓
生成 JWT 登录态
    ↓
重定向回首页，并携带 token
```

### 2. 登录态校验中间件（所有路由必走）

校验逻辑：
```
1. 从 header 或 cookie 读取 token
2. 验证 token 是否合法、是否过期
3. 解析出：userId + role
4. 存入请求上下文，供权限控制使用
```

### 3. 登出逻辑
- **前端**：删除 token / 清除 cookie
- **后端**：无操作（JWT 无状态）
- **跳转**：首页

## 五、前端权限控制逻辑（React/Vue/Next 通用）

### 1. 路由守卫规则

**允许公开访问（无需登录）：**
- `/`
- `/about`
- `/auth`

**需要登录：**
- 无（你系统无个人中心）

**仅管理员可访问：**
- `/settings`
- `/admin`

### 2. 自动跳转规则
```
未登录访问 /settings、/admin → 跳转到 /auth
普通用户访问 /settings、/admin → 跳转到首页
管理员：正常访问所有页面
```

### 3. 退出按钮显示逻辑
```javascript
if (role === 'user' || role === 'admin') {
  显示退出按钮
} else {
  隐藏
}
```

## 六、权限控制总表（极简版）

| 角色 | 可访问页面 | 退出按钮 | 权限说明 |
|------|------------|----------|----------|
| 未登录 | 首页、About、登录页 | 无 | 不能进设置/管理 |
| 普通用户 | 首页、About | 显示 | 不能进设置/管理 |
| 管理员 | 全部页面 | 显示 | 最高权限 |

## 七、接口安全规则

1. **OAuth 回调接口不对外开放**
   - 仅允许 Google/GitHub/微信官方回调

2. **管理接口必须校验 role === admin**

3. **所有非公开接口必须校验登录态**

## 八、可直接使用的伪代码（核心）

### 1. 生成登录态
```javascript
const token = jwt.sign({
  userId: user.id,
  role: user.role,
  nickname: user.name
}, secretKey, { expiresIn: '7d' })
```

### 2. 前端权限判断
```javascript
const { role } = useUser()

// 页面访问控制
if (path === '/settings' && role !== 'admin') {
  redirect('/')
}

// 退出按钮显示
const showLogout = role === 'user' || role === 'admin'
```

## 九、总结（一句话版）

```
第三方登录 → 回调校验 → 生成 JWT 登录态 → 前端存储 → 路由根据 role 控制权限 → 登出清除 token
```

完全适配你的博客系统，安全、简洁、可直接上线。

## 十、已实现的功能

### ✅ JWT 工具库 (`src/utils/jwt.ts`)
- JWT 生成、验证、刷新
- Token 存储管理
- 用户角色检查
- 过期时间管理

### ✅ OAuth 统一处理 (`src/utils/oauth-handler.ts`)
- Google/GitHub/微信 OAuth 回调统一逻辑
- 用户信息获取和数据库操作
- 自动注册和用户管理

### ✅ 前端权限控制 (`src/hooks/useAuth.ts`)
- 登录状态管理
- 权限检查 Hook
- 用户角色判断

### ✅ 路由守卫组件 (`src/components/RouteGuard.tsx`)
- 页面访问权限控制
- 自动重定向逻辑
- 加载状态处理

### ✅ OAuth 回调页面
- `/auth/callback/google` - Google OAuth 回调
- `/auth/callback/github` - GitHub OAuth 回调
- `/auth/callback/wechat` - 微信 OAuth 回调

### ✅ 登录页面 (`src/app/auth/page.tsx`)
- 第三方登录按钮
- 本地用户名密码登录
- JWT Token 生成和保存

### ✅ 首页权限控制 (`src/app/page.tsx`)
- 路由守卫保护
- 退出按钮显示逻辑
- 管理员权限标识

## 十一、使用方法

### 1. 环境变量配置
```bash
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# 微信OAuth
NEXT_PUBLIC_WECHAT_APP_ID=your-wechat-app-id
WECHAT_APP_SECRET=your-wechat-app-secret
```

### 2. 本地账号
- **管理员**：`admin` / `admin123`
- **普通用户**：`user` / `user123`
- **测试用户**：`test` / `test123`

### 3. 第三方登录
配置 OAuth 应用后，点击对应按钮即可登录

### 4. 权限控制
- 未登录：只能访问首页、About、登录页
- 普通用户：可访问首页、About，有退出按钮
- 管理员：可访问所有页面，包括设置

**复制就能用，完全适配你的博客系统！** 🎉
