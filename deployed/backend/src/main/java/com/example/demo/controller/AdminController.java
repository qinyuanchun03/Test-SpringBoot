package com.example.demo.controller;

import com.example.demo.entity.Post;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/posts")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post post) {
        return postService.updatePost(id, post);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        List<Post> posts = postService.getAllPosts();
        long totalPosts = posts.size();
        long publishedCount = posts.stream().filter(p -> "published".equals(p.getStatus())).count();
        long draftCount = totalPosts - publishedCount;
        
        Map<String, Long> categoryCount = posts.stream()
                .collect(Collectors.groupingBy(p -> p.getCategory() == null ? "Uncategorized" : p.getCategory(), Collectors.counting()));

        return Map.of(
            "totalPosts", totalPosts,
            "published", publishedCount,
            "drafts", draftCount,
            "categories", categoryCount
        );
    }
}
