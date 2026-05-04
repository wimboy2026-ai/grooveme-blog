# Upstash Redis 配置教程 —— 解决数据丢失问题

## 🎯 目标
配置 Upstash Redis，让文章数据永久保存，刷新不丢失，支持10K+文章。

## 📋 前提
- 已有 Vercel 账号
- 项目已部署到 Vercel

---

## 步骤 1：进入 Vercel Dashboard

1. 打开 https://vercel.com/dashboard
2. 找到并点击 `grooveme-blog` 项目
3. 进入项目详情页

![步骤1：项目列表]

---

## 步骤 2：添加 Upstash Redis 集成

### 方法 A：通过 Integrations 添加（推荐）

1. 点击顶部导航栏 **"Integrations"** 标签
2. 在搜索框输入 **"Redis"**
3. 找到 **"Upstash Redis"** 卡片
4. 点击 **"Add"** 按钮

![步骤2：集成市场]

### 方法 B：直接访问 Upstash

如果方法A找不到：
1. 访问 https://console.upstash.com/
2. 用 GitHub 账号登录
3. 点击 **"Create Database"**
4. 选择 **Region**: `US East (N. Virginia)`
5. 选择 **Plan**: `Free`
6. 点击 **"Create"**

---

## 步骤 3：配置数据库

### 如果使用 Vercel Integrations（方法A）：

1. 选择 **"Create New Database"**
2. 选择 **Region**: `US East`
3. 选择 **Plan**: `Free`
4. 勾选 **"Add environment variables to project"**
5. 点击 **"Add Integration"**

![步骤3：配置数据库]

### 如果使用 Upstash 控制台（方法B）：

1. 创建数据库后，进入数据库详情页
2. 点击左侧 **"REST API"** 标签
3. 复制以下两个值：
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

![步骤3：获取凭证]

---

## 步骤 4：添加环境变量到 Vercel（仅方法B需要）

如果使用方法A，跳过此步骤，环境变量已自动添加。

1. 回到 Vercel 项目页
2. 点击 **"Settings"** → **"Environment Variables"**
3. 添加两个变量：

| Name | Value |
|------|-------|
| `UPSTASH_REDIS_REST_URL` | 从 Upstash 复制的 URL |
| `UPSTASH_REDIS_REST_TOKEN` | 从 Upstash 复制的 Token |

4. 选择 **Environment**: `Production`, `Preview`, `Development`
5. 点击 **"Save"**

![步骤4：环境变量]

---

## 步骤 5：重新部署

1. 回到 Vercel 项目主页
2. 点击 **"Deployments"** 标签
3. 找到最新部署，点击右侧 **"..."** 菜单
4. 选择 **"Redeploy"**
5. 勾选 **"Use existing Build Cache"**（可选）
6. 点击 **"Redeploy"**

![步骤5：重新部署]

---

## 步骤 6：验证配置

1. 等待部署完成（约1-2分钟）
2. 打开网站后台：`https://grooveme-blog.vercel.app/admin/login`
3. 创建一篇测试文章
4. 刷新页面，检查文章是否还在
5. 再创建第二篇文章
6. 再次刷新，检查两篇文章是否都在

✅ 如果文章都在，配置成功！
❌ 如果文章丢失，检查环境变量是否正确设置

---

## 🔧 故障排查

### 问题1：部署后提示 "Upstash Redis 环境变量未配置"

**解决**：
1. 检查 `UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN` 是否添加
2. 确保选择了正确的 Environment（Production）
3. 重新部署

### 问题2：可以创建文章但刷新后丢失

**解决**：
1. 检查 Upstash 数据库是否在美国东部（US East）
2. 检查环境变量值是否正确（不要有空格）
3. 查看 Vercel 日志：项目页 → **"Logs"** 标签

### 问题3：无法创建文章

**解决**：
1. 检查 Upstash 控制台中的数据库状态
2. 确认 Token 有写入权限
3. 查看浏览器控制台网络请求

---

## 📊 配置成功后的效果

| 场景 | 配置前（内存） | 配置后（Redis） |
|------|---------------|----------------|
| 刷新页面 | ❌ 数据丢失 | ✅ 数据保留 |
| 连续创建 | ❌ 只保留1篇 | ✅ 全部保留 |
| 跨设备访问 | ❌ 数据不同 | ✅ 数据一致 |
| 支持文章数 | ~10篇 | **10,000+篇** |
| 冷启动 | ❌ 重置 | ✅ 永久保存 |

---

## 💡 免费额度说明

Upstash Redis 免费版：
- 每天 **10,000** 请求
- 支持 **10,000** 篇文章存储
- 足够个人博客使用多年

---

## 🆘 需要帮助？

如果配置遇到问题：
1. 截图错误页面
2. 提供 Vercel 项目链接
3. 描述操作步骤

我可以远程协助配置！
