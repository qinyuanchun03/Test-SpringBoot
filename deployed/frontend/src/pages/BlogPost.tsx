import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import postApi, { type Post } from '../api';
import '../styles/blog.css';

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = React.useState<Post | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (id) {
            postApi.getPostById(parseInt(id))
                .then(res => {
                    setPost(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch post:", err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <div className="blog-container" style={{ textAlign: 'center', paddingTop: '10rem' }}>
                <div className="loading-spinner">加载中...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="blog-container" style={{ textAlign: 'center', paddingTop: '10rem' }}>
                <h2>文章未找到</h2>
                <Link to="/" className="btn-premium" style={{ marginTop: '2rem', display: 'inline-block' }}>返回首页</Link>
            </div>
        );
    }

    return (
        <div className="blog-post">
            <header className="post-header">
                <h1>{post.title}</h1>
                <div className="post-meta-detailed">
                    <span>📅 {(post.createdAt || post.created_at) ? new Date(post.createdAt || post.created_at!).toLocaleDateString() : ''}</span>
                    <span>👤 {post.author}</span>
                    <span>⏱️ {post.readTime}</span>
                </div>
            </header>

            <img
                src={post.imageUrl || (post as any).image_url}
                alt={post.title}
                className="post-main-image"
            />

            <article className="post-rich-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const [copied, setCopied] = React.useState(false);

                            const handleCopy = () => {
                                navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            };

                            return match ? (
                                <div className="code-block-wrapper">
                                    <div className="code-block-header">
                                        <span className="code-lang">{match[1]}</span>
                                        <button className="copy-button" onClick={handleCopy}>
                                            {copied ? '已复制!' : '复制'}
                                        </button>
                                    </div>
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        className="syntax-highlighter"
                                        {...(props as any)}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>

                <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ marginBottom: '1rem', background: 'none', WebkitTextFillColor: 'initial', color: 'var(--text-main)' }}>关于作者</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{post.author} - 技术发烧友，分享前沿技术与见解。</p>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;