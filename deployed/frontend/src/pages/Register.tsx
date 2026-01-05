import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/blog.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('密码不匹配');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await register({ username, email, password, role });
            alert('注册成功，请登录');
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data || '注册失败，用户名或邮箱可能已存在');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-layout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}>
                <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>创建账号</h2>
                    <p style={{ color: 'var(--text-muted)' }}>加入我们的极简博客社区</p>
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
                        <label>邮箱</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>身份角色</label>
                        <select value={role} onChange={e => setRole(e.target.value as any)}>
                            <option value="USER">普通作者 (USER)</option>
                            <option value="ADMIN">管理员 (ADMIN)</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>密码</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>确认密码</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-premium"
                        style={{ width: '100%', marginTop: '1rem', height: '3.5rem' }}
                        disabled={loading}
                    >
                        {loading ? '正在注册...' : '注册'}
                    </button>
                </form>

                <footer style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <span>已有账号？</span>
                    <Link to="/login" style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem', fontWeight: '500' }}>返回登录</Link>
                </footer>
            </div>
        </div>
    );
};

export default Register;
