import React from 'react';
import { Link } from 'react-router-dom';
import postApi, { type Post } from '../api';
import '../styles/blog.css';

const BlogHome: React.FC = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        postApi.getPublishedPosts()
            .then(res => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch posts:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="blog-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
                <div className="loading-spinner">加载中...</div>
            </div>
        );
    }

    return (
        <div className="blog-container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>探索前沿技术</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>分享见解，记录成长，连接未来。</p>
            </div>

            <div className="posts-list">
                {posts.map(post => (
                    <Link key={post.id} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                        <article className="post-card">
                            <div className="post-card-image-wrapper">
                                <img src={post.imageUrl || (post as any).image_url} alt={post.title} className="post-card-image" />
                            </div>
                            <div className="post-card-content">
                                <h2 className="post-card-title">{post.title}</h2>
                                <p className="post-card-excerpt">{post.excerpt}</p>
                                <div className="post-card-meta">
                                    <span>{(post.createdAt || post.created_at) ? new Date(post.createdAt || post.created_at!).toLocaleDateString() : ''}</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogHome;