import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// Add a request interceptor to include JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('blog_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export interface Post {
    id?: number;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    category?: string;
    categoryId?: number;
    status: 'published' | 'draft';
    readTime: string;
    imageUrl: string;
    authorId?: number;
    authorName?: string;
    created_at?: string;
    createdAt?: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: 'ADMIN' | 'USER';
    avatarUrl?: string;
    bio?: string;
}

export const authApi = {
    login: (credentials: any) => api.post<{ token: string, user: User }>('/auth/login', credentials),
    register: (user: any) => api.post<User>('/auth/register', user),
};

export const postApi = {
    // 公开接口 (Public)
    getPublishedPosts: () => api.get<Post[]>('/posts'),
    getPostById: (id: number) => api.get<Post>(`/posts/${id}`),

    // 管理接口 (Admin)
    getAllPosts: () => api.get<Post[]>('/admin/posts'),
    createPost: (post: Post) => api.post<Post>('/admin/posts', post),
    updatePost: (id: number, post: Partial<Post>) => api.put<Post>(`/admin/posts/${id}`, post),
    deletePost: (id: number) => api.delete(`/admin/posts/${id}`),
    getStats: () => api.get('/admin/posts/stats'),
};

export default postApi;
