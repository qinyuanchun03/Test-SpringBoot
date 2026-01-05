package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String excerpt;

    @Column(name = "author_id")
    private Long authorId;

    @Column(name = "author_name")
    private String authorName;

    private String category;
    @Column(name = "category_id")
    private Long categoryId;
    private String status; // published, draft
    @Column(name = "read_time")
    private String readTime;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Post() {}

    public Post(Long id, String title, String content, String excerpt, Long authorId, String authorName, String category, Long categoryId, String status, String readTime, String imageUrl, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.excerpt = excerpt;
        this.authorId = authorId;
        this.authorName = authorName;
        this.category = category;
        this.categoryId = categoryId;
        this.status = status;
        this.readTime = readTime;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
    public Long getAuthorId() { return authorId; }
    public void setAuthorId(Long authorId) { this.authorId = authorId; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getReadTime() { return readTime; }
    public void setReadTime(String readTime) { this.readTime = readTime; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // Manual Builder Pattern
    public static PostBuilder builder() {
        return new PostBuilder();
    }

    public static class PostBuilder {
        private String title;
        private String content;
        private String excerpt;
        private Long authorId;
        private String authorName;
        private String category;
        private Long categoryId;
        private String status;
        private String readTime;
        private String imageUrl;

        public PostBuilder title(String title) { this.title = title; return this; }
        public PostBuilder content(String content) { this.content = content; return this; }
        public PostBuilder excerpt(String excerpt) { this.excerpt = excerpt; return this; }
        public PostBuilder authorId(Long authorId) { this.authorId = authorId; return this; }
        public PostBuilder authorName(String authorName) { this.authorName = authorName; return this; }
        public PostBuilder category(String category) { this.category = category; return this; }
        public PostBuilder categoryId(Long categoryId) { this.categoryId = categoryId; return this; }
        public PostBuilder status(String status) { this.status = status; return this; }
        public PostBuilder readTime(String readTime) { this.readTime = readTime; return this; }
        public PostBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }

        public Post build() {
            Post post = new Post();
            post.setTitle(title);
            post.setContent(content);
            post.setExcerpt(excerpt);
            post.setAuthorId(authorId);
            post.setAuthorName(authorName);
            post.setCategory(category);
            post.setCategoryId(categoryId);
            post.setStatus(status);
            post.setReadTime(readTime);
            post.setImageUrl(imageUrl);
            return post;
        }
    }
}
