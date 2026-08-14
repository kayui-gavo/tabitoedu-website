# 旅人教育 TABITO 官网

这是 `https://www.tabitoedu.com/` 的私有协作仓库。网站是无需构建的静态站点，生产文件位于 `site/`，目前部署到 AWS S3，并由 CloudFront 对外提供访问。

## 目录结构

- `site/index.html`：网站入口和全部页面逻辑
- `site/images/`：LOGO、背景、教师、案例和二维码图片
- `scripts/validate.ps1`：上线前检查品牌、价格和本地资源引用
- `scripts/deploy.ps1`：同步到 S3 并刷新 CloudFront

## 修改流程

1. 拉取最新代码：`git pull`
2. 修改 `site/index.html` 或 `site/images/` 中的文件
3. 运行检查：`./scripts/validate.ps1`
4. 本地预览：`python -m http.server 8080 --directory site`
5. 浏览器打开 `http://localhost:8080/`
6. 新建分支、提交并推送，由同事审核后合并

不要直接在旧文件副本上修改。生产入口始终是 `site/index.html`。

## 部署到 AWS

部署人员需要安装 AWS CLI，并登录具有以下权限的 AWS 账号：

- 对 `s3://www.tabitoedu.com` 执行同步
- 为 CloudFront 分发 `E1KRPEZIQMX5S6` 创建和查询缓存刷新

先查看将要发生的变更：

```powershell
./scripts/deploy.ps1 -DryRun
```

确认无误后正式部署：

```powershell
./scripts/deploy.ps1
```

脚本会先运行本地检查，然后同步 `site/`、刷新 `/` 与 `/index.html`，等待刷新完成，并从公网检查关键文案。

## 当前生产配置

- 正式站点：`https://www.tabitoedu.com/`
- S3 桶：`www.tabitoedu.com`
- AWS 区域：`ap-northeast-1`
- CloudFront 分发：`E1KRPEZIQMX5S6`
- 技术：HTML、Tailwind CSS CDN、原生 JavaScript

仓库中不保存 AWS 密钥、密码或个人访问令牌。
