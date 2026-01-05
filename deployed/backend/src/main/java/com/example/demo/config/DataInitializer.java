package com.example.demo.config;

import com.example.demo.entity.Category;
import com.example.demo.entity.Post;
import com.example.demo.entity.User;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(PostRepository repository, CategoryRepository categoryRepository, UserRepository userRepository, org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setEmail("admin@example.com");
                admin.setRole("ADMIN");
                admin.setBio("系统管理员");
                admin.setAvatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=admin");
                
                User user1 = new User();
                user1.setUsername("user1");
                user1.setPassword(passwordEncoder.encode("password"));
                user1.setEmail("user1@example.com");
                user1.setRole("USER");
                user1.setBio("技术博主");
                user1.setAvatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=user1");
                
                userRepository.saveAll(List.of(admin, user1));
            }

            if (categoryRepository.count() == 0) {
                Category tech = new Category();
                tech.setName("技术");
                tech.setDescription("编程与架构");
                
                Category design = new Category();
                design.setName("设计");
                design.setDescription("UI/UX 视觉");
                
                Category frontend = new Category();
                frontend.setName("前端");
                frontend.setDescription("React & Vue");
                
                categoryRepository.saveAll(List.of(tech, design, frontend));
            }

            if (repository.count() == 0) {
                Category tech = categoryRepository.findAll().get(0);
                Category design = categoryRepository.findAll().get(1);
                User admin = userRepository.findAll().get(0);
                User user1 = userRepository.findAll().get(1);

                Post post1 = Post.builder()
                        .title("Supabase + Spring Boot 架构实战")
                        .excerpt("我们很高兴地宣布，全新的现代化博客系统已支持 Supabase！")
                        .content("# Supabase 实战\n\n我们将学习如何使用外部云数据库加速开发。")
                        .authorName(admin.getUsername())
                        .authorId(admin.getId())
                        .category(tech.getName())
                        .categoryId(tech.getId())
                        .status("published")
                        .readTime("5 min")
                        .imageUrl("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80")
                        .build();

                Post post2 = Post.builder()
                        .title("2026 年视觉设计新高度")
                        .excerpt("探索未来视觉设计的无限可能。")
                        .content("# 视觉设计\n\n毛玻璃与暗黑模式的完美结合。")
                        .authorName(user1.getUsername())
                        .authorId(user1.getId())
                        .category(design.getName())
                        .categoryId(design.getId())
                        .status("published")
                        .readTime("8 min")
                        .imageUrl("https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80")
                        .build();

                repository.saveAll(List.of(post1, post2));
            }
        };
    }
}
