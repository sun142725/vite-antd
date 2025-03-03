import request from '@/utils/request';

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/login/outLogin', {
      method: 'POST',
      ...(options || {}),
    });
  }