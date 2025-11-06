import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on unauthorized
      localStorage.removeItem('admin_token');
      localStorage.removeItem('user_token');
      localStorage.removeItem('admin_user');
      localStorage.removeItem('user_data');
      
      // Redirect to login if on admin page
      if (window.location.pathname.includes('/admin')) {
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  refreshToken: (token) => api.post('/auth/refresh', { token }),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userId, data) => api.put(`/users/update/${userId}`, data),
  updatePassword: (userId, data) => api.put(`/users/update-password/${userId}`, data),
  getAllUsers: (params = {}) => api.get('/users/', { params }),
  getUserById: (userId) => api.get(`/users/get/${userId}`),
  deleteUser: (userId) => api.delete(`/users/delete/${userId}`),
};

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/product/get_all', { params }),
  getById: (productId) => api.get(`/product/get_by_id/${productId}`),
  create: (formData) => {
    return api.post('/product/post', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (productId, formData) => {
    return api.put(`/product/update/${productId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (productId) => api.delete(`/product/delete/${productId}`),
};

// Trainers API
export const trainersAPI = {
  getAll: (params = {}) => api.get('/trainer/get_all', { params }),
  getById: (trainerId) => api.get(`/trainer/get_by_id/${trainerId}`),
  create: (formData) => {
    return api.post('/trainer/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (trainerId, formData) => {
    return api.put(`/trainer/update/${trainerId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (trainerId) => api.delete(`/trainer/delete/${trainerId}`),
};

// Sliders API
export const slidersAPI = {
  getAll: (params = {}) => api.get('/slider/get', { params }),
  getById: (sliderId) => api.get(`/slider/get/${sliderId}`),
  create: (formData) => {
    return api.post('/slider/post', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (sliderId, formData) => {
    return api.put(`/slider/update/${sliderId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (sliderId) => api.delete(`/slider/delete/${sliderId}`),
};

// Contact API
export const contactAPI = {
  create: (contactData) => api.post('/contact/post', contactData),
  getAll: (params = {}) => api.get('/contact/get', { params }),
  getById: (contactId) => api.get(`/contact/get/${contactId}`),
  updateStatus: (contactId, status) => api.put(`/contact/update/${contactId}`, { status }),
  delete: (contactId) => api.delete(`/contact/delete/${contactId}`),
};

// Admin API
export const adminAPI = {
  create: (adminData) => api.post('/admin/create', adminData),
  getAll: (params = {}) => api.get('/admin/get', { params }),
  getById: (adminId) => api.get(`/admin/get/${adminId}`),
  update: (adminId, data) => api.put(`/admin/update/${adminId}`, data),
  updatePassword: (adminId, data) => api.put(`/admin/update-password/${adminId}`, data),
  delete: (adminId) => api.delete(`/admin/delete/${adminId}`),
};

// Company API (public endpoints)
export const companyAPI = {
  getInfo: () => api.get('/company/info'),
};

// Helper functions
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/img/placeholder.jpg';
  
  // If it's already a full URL (Cloudinary), return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // For backward compatibility with old image paths
  return `${API_BASE_URL}/${imagePath}`;
};

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.data?.detail || 'An error occurred';
    return { message, status: error.response.status };
  } else if (error.request) {
    // Request was made but no response received
    return { message: 'Network error. Please check your connection.', status: 0 };
  } else {
    // Something else happened
    return { message: error.message || 'An unexpected error occurred', status: 0 };
  }
};

export default api;