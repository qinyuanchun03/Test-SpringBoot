# Blog Backend (Spring Boot)

这是一个现代化博客系统的后端，基于 **Spring Boot 3.4.0**。

## 🚀 启动准备

已为你准备好一键启动脚本和自动化配置。

### 前置要求
- **Java 17+** (已检测到当前环境符合)
- **Maven 3.6+**

### 快速启动 (Windows)
双击运行根目录下的 `start.bat`。

该脚本会自动完成：
1. 环境变量检查。
2. 依赖下载 (首次运行较慢)。
3. 启动应用 (默认端口: 8080)。
4. 自动注入 3 篇 Markdown 测试文章。

---

## 🛠 关键配置与接口

### 后端配置 (`src/main/resources/application.yml`)
- **端口**: `8080`
- **基础路径**: `/api`
- **数据库**: H2 (内存型，重启即重置，方便开发)

### 常用 API 接口
- **公共文章列表**: `GET http://localhost:8080/api/posts`
- **文章详情**: `GET http://localhost:8080/api/posts/{id}`
- **管理端列表**: `GET http://localhost:8080/api/admin/posts`
- **管理端统计**: `GET http://localhost:8080/api/admin/posts/stats`

### 数据库预览
访问 `http://localhost:8080/api/h2-console`
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **User**: `sa`
- **Password**: (为空)

---

## 📂 项目结构
- `entity/`: 数据库模型 (Post)。
- `repository/`: 数据访问层。
- `service/`: 业务逻辑层。
- `controller/`: REST 接口 (含公开与管理端)。
- `config/`: 安全配置与初始化数据。
