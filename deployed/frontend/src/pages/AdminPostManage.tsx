import React, { useState, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import postApi, { type Post } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/blog.css';

const AdminPostManage: React.FC = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await postApi.getAllPosts();
            setPosts(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch posts:", err);
            setLoading(false);
        }
    };

    const handleOpenModal = (post?: Post) => {
        if (post) {
            setEditingPost(post);
        } else {
            setEditingPost({
                title: '',
                content: '',
                excerpt: '',
                author: '管理员',
                category: '技术',
                status: 'draft',
                readTime: '5 min',
                imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPost(null);
    };

    const handleSave = async () => {
        if (!editingPost) return;
        try {
            const postToSave = {
                ...editingPost,
                authorId: user?.id,
                authorName: user?.username
            } as Post;

            if (editingPost.id) {
                await postApi.updatePost(editingPost.id, postToSave);
            } else {
                await postApi.createPost(postToSave);
            }
            fetchPosts();
            handleCloseModal();
        } catch (err: any) {
            console.error("Save failed:", err);
            alert(`保存失败: ${err.response?.data?.message || err.message || '未知错误'}`);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("确定要删除这篇文章吗？")) {
            try {
                await postApi.deletePost(id);
                fetchPosts();
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    if (loading) return <div className="admin-main">加载中...</div>;

    return (
        <div className="admin-post-manage">
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>文章管理</h2>
                    <p style={{ color: 'var(--text-muted)' }}>在此管理您的所有博客文章。</p>
                </div>
                <button className="btn-premium" onClick={() => handleOpenModal()}>＋ 新建文章</button>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>标题</th>
                            <th>作者</th>
                            <th>分类</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td style={{ fontWeight: 500 }}>{post.title}</td>
                                <td>{post.author}</td>
                                <td>{post.category}</td>
                                <td>
                                    <span className={`status-badge ${post.status}`}>
                                        {post.status === 'published' ? '已发布' : '草稿'}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-action" onClick={() => handleOpenModal(post)}>编辑</button>
                                    <button className="btn-action" style={{ color: '#ef4444' }} onClick={() => post.id && handleDelete(post.id)}>删除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 编辑/新建弹窗 */}
            {isModalOpen && editingPost && (
                <div className="modal-overlay">
                    <div className="modal-content glass-card">
                        <header className="modal-header">
                            <h3>{editingPost.id ? '编辑文章' : '新建文章'}</h3>
                            <button className="btn-close" onClick={handleCloseModal}>&times;</button>
                        </header>

                        <div className="modal-body">
                            <div className="form-group">
                                <label>标题</label>
                                <input
                                    type="text"
                                    value={editingPost.title}
                                    onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>分类</label>
                                    <input type="text" value={editingPost.category} onChange={e => setEditingPost({ ...editingPost, category: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>状态</label>
                                    <select value={editingPost.status} onChange={e => setEditingPost({ ...editingPost, status: e.target.value as any })}>
                                        <option value="draft">草稿</option>
                                        <option value="published">发布</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>内容 (Markdown)</label>
                                <SimpleMDE
                                    value={editingPost.content}
                                    onChange={value => setEditingPost({ ...editingPost, content: value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>摘要</label>
                                <textarea
                                    rows={3}
                                    value={editingPost.excerpt}
                                    onChange={e => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>封面图 URL</label>
                                <input type="text" value={editingPost.imageUrl || (editingPost as any).image_url} onChange={e => setEditingPost({ ...editingPost, imageUrl: e.target.value })} />
                            </div>
                        </div>

                        <footer className="modal-footer">
                            <button className="btn-action" onClick={handleCloseModal}>取消</button>
                            <button className="btn-premium" onClick={handleSave}>保存文章</button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPostManage;