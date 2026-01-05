import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/blog.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login({ username, password });
            navigate('/admin');
        } catch (err: any) {
            setError(err.response?.data || '登录失败，请检查用户名或密码');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-layout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '3rem' }}>
                <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>欢迎回来</h2>
                    <p style={{ color: 'var(--text-muted)' }}>请登录以管理您的博客</p>
                </header>

                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <div className="form-group">
                        <label>用户名</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>密码</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-premium"
                        style={{ width: '100%', marginTop: '1rem', height: '3.5rem' }}
                        disabled={loading}
                    >
                        {loading ? '正在登录...' : '登录'}
                    </button>
                </form>

                <footer style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <span>还没有账号？</span>
                    <Link to="/register" style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem', fontWeight: '500' }}>立即注册</Link>
                </footer>
            </div>
        </div>
    );
};

export default Login;
