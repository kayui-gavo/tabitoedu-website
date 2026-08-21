# AI Entity / SEO v1

本分支从 `main` 创建，目标是为旅人教育官网补充可抓取的教师实体页面与基础搜索基础设施。

## 本轮范围

- 新增 `site/teachers/liu-kewei.html`
  - 刘可惟（劉 可惟 / Kewei Liu）官方讲师页
  - 静态正文直接提供东京大学、京都大学、旅人教育、物理教学等身份信息
  - `ProfilePage` + `Person` JSON-LD
  - 链接个人主页与个人讲师页，用于实体消歧
- 新增 `site/robots.txt`
- 新增 `site/sitemap.xml`
  - 官网首页
  - 刘可惟讲师页
  - 教师图片
- 扩展 `scripts/validate.ps1`
  - 检查新增公开文件
  - 检查教师实体关键字段
  - 对全部 HTML 做本地资源引用检查
- 扩展 `scripts/deploy.ps1`
  - CloudFront 同时刷新首页、robots、sitemap、教师页
  - 部署完成后验证教师页与 robots.txt

## 明确未改动

- 不改价格
- 不改招生业务规则
- 不改现有首页视觉结构
- 不拆分现有美术 / 共通考试 / EJU 单页应用结构
- 不自动部署生产站

## 推荐审核顺序

1. 查看 `site/teachers/liu-kewei.html` 的文案和身份信息。
2. 运行 `./scripts/validate.ps1`。
3. 本地预览：`python -m http.server 8080 --directory site`。
4. 确认后再决定是否合并到生产仓库。

后续独立阶段再考虑：首页教师卡片链接、Organization structured data、真实多 URL 信息架构和视觉重构，避免把架构改动混入本轮低风险 SEO 变更。
