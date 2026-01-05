-- 1. 删除旧表（如果存在）
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

-- 2. 创建分类表
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- 3. 创建用户表 (新增)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- 加密存储
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) DEFAULT 'USER', -- 'ADMIN', 'USER'
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. 创建文章表 (更新：关联作者)
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt VARCHAR(500),
    author_id BIGINT REFERENCES users(id) ON DELETE SET NULL, -- 关联用户表
    author_name VARCHAR(100), -- 冗余缓存，减少联表
    category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'draft',
    read_time VARCHAR(50),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. 创建评论表
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    author_id BIGINT REFERENCES users(id) ON DELETE SET NULL, -- 注册用户评论
    author_name VARCHAR(100) NOT NULL, -- 访客或缓存姓名
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. 插入初始数据
INSERT INTO categories (name, description) VALUES 
('技术', '分享最新的编程技术与架构实践'),
('设计', 'UI/UX 设计趋势与视觉审美'),
('前端', 'React, Vue 等现代前端框架');

INSERT INTO users (username, password, email, role, bio, avatar_url) VALUES
('admin', '$2a$10$e7m6pEX/1Y7i.I.U.y.R8eY2R.T1U7X7Y7Z7W7V7U7T7S7R7Q7P7O', 'admin@example.com', 'ADMIN', '系统管理员', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'),
('user1', '$2a$10$e7m6pEX/1Y7i.I.U.y.R8eY2R.T1U7X7Y7Z7W7V7U7T7S7R7Q7P7O', 'user1@example.com', 'USER', '普通技术博主', 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1');

INSERT INTO posts (title, content, excerpt, author_id, author_name, category_id, status, read_time, image_url) VALUES 
('Supabase + Spring Boot 架构实战', '# Supabase 实战\n\n我们将学习如何使用外部云数据库加速开发。', '学习如何连接云端 PostgreSQL 数据库。', 1, 'admin', 1, 'published', '5 min', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'),
('2026 年视觉设计新高度', '# 视觉设计\n\n毛玻璃与暗黑模式的完美结合。', '探索未来的设计流行趋势。', 2, 'user1', 2, 'published', '10 min', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80');
