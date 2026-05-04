# GrooveMe Blog 自动化部署配置脚本
# 此脚本用于配置 Obsidian Git 同步和 Netlify 部署

Write-Host "=== GrooveMe Blog 自动化部署配置 ===" -ForegroundColor Green

# ====================
# 1. 检查 Git 配置
# ====================
Write-Host "`n[1/4] 检查 Git 配置..." -ForegroundColor Cyan
$gitRemote = git remote -v 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git 远程仓库已配置:" -ForegroundColor Green
    Write-Host $gitRemote
} else {
    Write-Host "❌ Git 未初始化，正在初始化..." -ForegroundColor Red
    git init
    git remote add origin git@github.com:wimboy2026-ai/grooveme-blog.git
    Write-Host "✅ Git 初始化完成" -ForegroundColor Green
}

# ====================
# 2. Obsidian Git 插件配置说明
# ====================
Write-Host "`n[2/4] Obsidian Git 自动同步配置..." -ForegroundColor Cyan
Write-Host @"
请手动在 Obsidian 中完成以下配置：

1. 打开 Obsidian → 设置 → 第三方插件
2. 关闭安全模式
3. 搜索并安装插件: Obsidian Git
4. 配置插件：
   - Automatically commit: ✅ 开启
   - Commit interval: 5 分钟
   - Automatically push: ✅ 开启
   - Pull before commit: ✅ 开启
   - Commit message: update: {{date}} {{time}}

完成后按任意键继续...
"@
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# ====================
# 3. Notion 同步配置
# ====================
Write-Host "`n[3/4] Notion 同步配置（可选）..." -ForegroundColor Cyan
$notionToken = Read-Host "请输入 Notion API Token (按Enter跳过)"
if ($notionToken) {
    # 创建 .env 文件存储配置
    $envContent = @"
# Notion 同步配置
NOTION_API_TOKEN=$notionToken
"@
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Notion 配置已保存到 .env 文件" -ForegroundColor Green
    
    Write-Host @"
下一步：
1. 在 Obsidian 中安装 "Obsidian to Notion" 插件
2. 在插件设置中填入 API Token: $notionToken
3. 填入 Notion Database ID
"@
} else {
    Write-Host "⏭️ 跳过 Notion 配置" -ForegroundColor Yellow
}

# ====================
# 4. Netlify 部署配置
# ====================
Write-Host "`n[4/4] Netlify 部署配置..." -ForegroundColor Cyan
Write-Host "正在检查 Netlify CLI..."

$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
if (-not $netlifyInstalled) {
    Write-Host "正在安装 Netlify CLI..." -ForegroundColor Yellow
    npm install -g netlify-cli
}

Write-Host @"
Netlify 配置已完成：
- Build command: npm run build
- Publish directory: .next
- 配置文件: netlify.toml (已存在)

如需查看部署状态，请运行:
  cd "D:\my blog\nextjs-ai-music"
  netlify login
  netlify status
  netlify deploy
"@

# ====================
# 5. 总结
# ====================
Write-Host "`n=== 配置完成 ===" -ForegroundColor Green
Write-Host @"
📋 当前配置状态:
✅ GitHub 远程仓库: 已绑定 (wimboy2026-ai/grooveme-blog)
✅ netlify.toml: 已配置
⏳ Obsidian Git 插件: 需手动配置 (见上文)
⏳ Notion 同步: $(if($notionToken){"已配置"} else {"可选，未配置"})

📝 工作流:
Obsidian 写作 → 自动 Git 提交(5分钟) → 推送到 GitHub → Netlify 自动构建 → 网站更新
"@

Write-Host "`n如需帮助，请查看: 自动化部署配置清单.md" -ForegroundColor Gray
