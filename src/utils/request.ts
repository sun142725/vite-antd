import axios from 'axios';

// 创建 axios 实例
const request = axios.create({
  baseURL: '/api', // 你的后端 API 地址
  timeout: 10000, // 超时时间
  headers: { 'Content-Type': 'application/json' },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在请求发送前，可以添加 token
    const token = localStorage.getItem('token') || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 处理返回数据
    return response.data;
  },
  (error) => {
    // 处理错误，例如未登录跳转到登录页
    if (error.response?.status === 401) {
      console.error('未登录或登录已过期');
    }
    return Promise.reject(error);
  }
);

export default request;
