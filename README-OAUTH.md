# OAuth 配置说明

## 环境变量配置

为了使用真实的第三方登录，需要在项目根目录创建 `.env.local` 文件并配置以下环境变量：

```bash
# Google OAuth 配置
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth 配置
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# 微信 OAuth 配置
NEXT_PUBLIC_WECHAT_APP_ID=your-wechat-app-id
WECHAT_APP_SECRET=your-wechat-app-secret
```

## 如何获取OAuth配置

### Google OAuth
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端ID
5. 设置重定向URI: `http://localhost:3000/auth/callback/google`

### GitHub OAuth
1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 创建新的 OAuth App
3. 设置 Authorization callback URL: `http://localhost:3000/auth/callback/github`

### 微信 OAuth
1. 访问 [微信开放平台](https://open.weixin.qq.com/)
2. 创建网站应用
3. 设置授权回调域: `http://localhost:3000/auth/callback/wechat`

## 使用说明

1. 配置环境变量后重启开发服务器
2. 点击对应的登录按钮会跳转到真实的第三方授权页面
3. 授权后会自动跳转回应用并完成登录

## 测试账号

如果暂时无法配置OAuth，可以使用以下测试账号：
- 演示用户: demo@blog.com / demo123
- 管理员: admin@blog.com / admin123
