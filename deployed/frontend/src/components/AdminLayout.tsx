import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/blog.css';

const AdminLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.2rem', opacity: 0.8 }}>ADMIN PANEL</h2>
                    <div style={{ width: '40px', height: '3px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                </div>

                {user && (
                    <div className="user-profile-mini">
                        <img src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} alt="avatar" />
                        <div>
                            <p className="username">{user.username}</p>
                            <span className="role-tag">{user.role}</span>
                        </div>
                    </div>
                )}

                <nav className="admin-nav">
                    <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>仪表盘</NavLink>
                    <NavLink to="/admin/posts" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>文章管理</NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>用户管理</NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>系统设置</NavLink>
                </nav>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button onClick={handleLogout} className="btn-secondary" style={{ width: '100%' }}>退出登录</button>
                    <NavLink to="/" className="btn-premium" style={{ width: '100%', textAlign: 'center' }}>返回首页</NavLink>
                </div>
            </aside>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;