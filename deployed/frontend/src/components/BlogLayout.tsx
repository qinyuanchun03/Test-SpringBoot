import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/blog.css';

const BlogLayout: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="blog-layout">
            <header className="glass-header">
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <h1>ANTIGRAVITY BLOG</h1>
                </NavLink>
                <nav className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>首页</NavLink>

                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>登录</NavLink>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>注册</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/admin" className="btn-premium" style={{ marginLeft: '1rem' }}>进入后台</NavLink>
                            <button onClick={logout} className="btn-secondary" style={{ marginLeft: '1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>退出</button>
                        </>
                    )}
                </nav>
            </header>

            <main className="content-area">
                <Outlet />
            </main>

            <footer className="glass-footer">
                <p>&copy; 2026 ANTIGRAVITY BLOG. Powered by React + Spring Boot.</p>
                <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.6 }}>
                    Crafted with precision & passion.
                </div>
            </footer>
        </div>
    );
};

export default BlogLayout;