# Minze Capital International Website

## 项目简介

这是一个现代化的英繁双语投资公司官网，融合专业金融风格与创新交互体验，并支持个性化定制功能。

## 功能特点

- 中英繁三语无缝切换
- 响应式设计，适配各种设备
- 专业金融风格UI设计
- 招聘申请功能，支持简历上传和本地保存
- 完整的公司介绍、业务板块、投资组合等模块

## 技术栈

- 前端：HTML5, CSS3, JavaScript, Tailwind CSS, GSAP动画库, Chart.js
- 后端：Node.js, Express.js, Multer (文件上传), UUID (唯一ID生成)

## 本地运行指南

### 前端运行

1. 直接打开 `index.html` 文件即可运行前端网站
2. 或者使用任何HTTP服务器（如VS Code的Live Server插件）

### 后端API运行

1. 安装Node.js和npm（如果尚未安装）

2. 安装依赖：
   ```
   npm run install-deps
   ```

3. 启动服务器：
   ```
   npm start
   ```
   或开发模式（自动重启）：
   ```
   npm run dev
   ```

4. 服务器将在 http://localhost:3000 运行

## 应聘申请本地保存功能说明

### 功能概述

应聘申请信息现在会保存到本地文件系统，而不是发送邮件。每个申请会创建一个独立的文件夹，包含申请表单数据和上传的简历文件。

### 数据存储结构

```
applications/
├── {application-id}/
│   ├── application.json  # 申请表单数据
│   └── {resume-file}     # 上传的简历文件
```

### application.json 格式

```json
{
  "id": "unique-uuid",
  "name": "申请人姓名",
  "email": "申请人邮箱",
  "phone": "申请人电话",
  "position": "应聘职位",
  "coverLetter": "求职信内容",
  "applicationDate": "申请日期",
  "resumeFileName": "简历文件名"
}
```

### 查看申请数据

1. 申请数据保存在项目根目录下的 `applications` 文件夹中
2. 每个申请有一个唯一的UUID文件夹
3. 可以直接查看JSON文件和简历文件
4. 可以使用简单的脚本或工具来处理和分析这些申请数据

### 数据备份和管理

1. 定期备份 `applications` 文件夹
2. 可以根据需要清理旧的申请数据
3. 考虑实现简单的数据管理界面来查看和处理申请

## 生产环境部署建议

1. 配置环境变量存储敏感信息
2. 使用HTTPS确保数据传输安全
3. 实现文件上传到云存储（如AWS S3）而非本地存储
4. 添加表单验证和防 spam 措施
5. 实现应用数据的定期备份和恢复机制

## 注意事项

- 确保遵守相关的隐私政策和数据保护法规
- 对于大量申请数据，考虑使用专业的招聘管理系统或数据库存储
