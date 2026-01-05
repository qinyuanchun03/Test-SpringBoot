# SpringBoot + React 极简博客系统 - 部署手册

欢迎使用本源码！本项目是一套经过深度优化的全栈博客系统，支持 LaTeX 数学公式、Markdown 高亮、JWT 安全认证及多端适配。为了确保即便没有后端经验的用户也能顺利部署，请严格按照以下步骤操作。

---

## 1. 数据库准备：Supabase 配置指南

本项目默认使用 **Supabase** (云端 PostgreSQL)，这意味着你不需要在本地安装数据库，只需几分钟在线配置。

### 1.1 注册与创建项目
1.  访问 [Supabase 官网](https://supabase.com/) 并使用 GitHub 账号登录。
2.  点击 **"New Project"**，选择一个名称（如 `my-blog`），设置数据库密码（**请务必记住这个密码**）。
3.  等待项目创建完成（通常需要 1-2 分钟）。

### 1.2 获取关键连接信息
项目创建成功后，点击左侧菜单栏底部的 **"Project Settings" (齿轮图标)**：

-   **获取数据库连接 (JDBC URL)**：
    1. 进入 **"Database"** 选项卡。
    2. 找到 **"Connection string"**，选择 **"JDBC"**。
    3. 复制显示的 URL。注意：URL 中的 `[YOUR-PASSWORD]` 需要替换为你刚才设置的真实密码。
    4. **关键微调**：在 URL 末尾加上 `&prepareThreshold=0`（用于兼容 Supabase 的连接池）。

-   **获取 API 密钥 (Frontend)**：
    1. 进入 **"API"** 选项卡。
    2. 找到 **"Project URL"** 和 **"anon public" key**。这两项将用于前端配置。

### 1.3 初始化表结构
1.  点击左侧菜单的 **"SQL Editor"**。
2.  点击 **"New query"**。
3.  打开本项目 `backend/supabase_schema.sql` 文件，复制全部内容并粘贴进去。
4.  点击 **"Run"**。看到 "Success" 后，数据库表及初始管理员（admin/admin）即创建完成。

---

## 2. 系统配置

### 2.1 后端配置 (`config.properties`)
在根目录下找到 `config.properties`，填入你刚才获取的信息：
```properties
# 数据库 JDBC URL (记得附带 &prepareThreshold=0)
DB_URL=jdbc:postgresql://db.xxxx.supabase.co:6543/postgres?sslmode=require&prepareThreshold=0
DB_USERNAME=postgres
DB_PASSWORD=你设置的密码
```

### 2.2 前端配置 (`frontend/.env`)
进入 `frontend` 目录，找到 (或创建) `.env` 文件，填入：
```env
VITE_SUPABASE_URL=你的 Project URL
VITE_SUPABASE_ANON_KEY=你的 anon public key
```

---

## 3. 启动运行

### 3.1 自动启动 (推荐)
在根目录下直接双击运行 **`start_all.bat`**。
它会自动开启两个窗口，分别处理后端的编译启动和前端的依赖安装与运行。

### 3.2 手动启动
-   **后端**: 进入 `backend` 目录，执行 `mvn spring-boot:run`。
-   **前端**: 进入 `frontend` 目录，执行 `npm install`，然后执行 `npm run dev`。

---

## 4. 常见问题 (FAQ)

-   **登录信息**：默认管理员账号为 `admin`，密码为 `admin`。登录后即可发布文章。
-   **修改外观**：打开 `frontend/src/styles/blog.css`，修改开头的 `:root` 变量即可一键换色。
-   **数学公式**：支持 LaTeX 语法，例如使用 `$E=mc^2$`。
-   **代码块**：支持自动高亮，并配有一键复制按钮。

---
祝你的毕业设计或个人项目顺利完成！如果有任何技术疑问，请参考项目中的代码注释。
