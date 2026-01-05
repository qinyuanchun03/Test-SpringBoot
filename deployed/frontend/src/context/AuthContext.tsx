import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../api';
import { authApi } from '../api';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: any) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('blog_token');
        const savedUser = localStorage.getItem('blog_user');
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (credentials: any) => {
        const res = await authApi.login(credentials);
        const { token, user } = res.data;
        setToken(token);
        setUser(user);
        localStorage.setItem('blog_token', token);
        localStorage.setItem('blog_user', JSON.stringify(user));
    };

    const register = async (userData: any) => {
        await authApi.register(userData);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('blog_token');
        localStorage.removeItem('blog_user');
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'ADMIN'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
