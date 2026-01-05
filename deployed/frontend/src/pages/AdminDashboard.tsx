import React, { useEffect, useState } from 'react';
import postApi from '../api';
import '../styles/blog.css';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postApi.getStats()
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch stats:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="admin-main">加载中...</div>;

    return (
        <div className="admin-dashboard">
            <header style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>概览仪表盘</h2>
                <p style={{ color: 'var(--text-muted)' }}>欢迎回来，管理员。这是您博客系统的当前运行状态。</p>
            </header>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>总文章数</h3>
                    <div className="value">{stats?.totalPosts || 0}</div>
                </div>
                <div className="stat-card">
                    <h3>已发布</h3>
                    <div className="value">{stats?.published || 0}</div>
                </div>
                <div className="stat-card">
                    <h3>草稿箱</h3>
                    <div className="value">{stats?.drafts || 0}</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--accent)' }}>
                    <h3>分类统计</h3>
                    <div className="value" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                        {Object.keys(stats?.categories || {}).length} 个分类
                    </div>
                </div>
            </div>

            <div className="admin-table-container">
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'var(--text-main)', fontSize: '1.1rem' }}>最近活动</h3>
                    <button className="btn-premium" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>查看全部</button>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>类型</th>
                            <th>内容</th>
                            <th>时间</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>文章</td>
                            <td>现代化博客系统上线</td>
                            <td>2026-01-03 14:20</td>
                            <td><span className="status-badge published">已发布</span></td>
                        </tr>
                        <tr>
                            <td>评论</td>
                            <td>来自 "张三" 的新评论</td>
                            <td>2026-01-03 10:15</td>
                            <td><span className="status-badge draft">审核中</span></td>
                        </tr>
                        <tr>
                            <td>系统</td>
                            <td>数据库自动备份成功</td>
                            <td>2026-01-03 04:00</td>
                            <td><span className="status-badge published">成功</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;