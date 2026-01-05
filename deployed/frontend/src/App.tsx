import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BlogLayout from './components/BlogLayout';
import AdminLayout from './components/AdminLayout';
import BlogHome from './pages/BlogHome';
import BlogPost from './pages/BlogPost';
import AdminDashboard from './pages/AdminDashboard';
import AdminPostManage from './pages/AdminPostManage';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* 博客前端路由 - 根路径 */}
                    <Route path="/" element={<BlogLayout />}>
                        <Route index element={<BlogHome />} />
                        <Route path="posts/:id" element={<BlogPost />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>

                    {/* 管理后台路由 (受保护) */}
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<AdminDashboard />} />
                        <Route path="posts" element={<AdminPostManage />} />
                        <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;