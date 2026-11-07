import request from '@/utils/http/request';
import type { BasicFormPayload } from '@/types/form-basic';
import type { ApiResult } from '@/types/ticket';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const FORM_BASIC_URL = '/api/form/basic';

/** 提交基础表单 */
export async function addItem(payload: BasicFormPayload) {
  if (USE_MOCK) {
    return new Promise<ApiResult<boolean>>((resolve) => {
      setTimeout(() => {
        resolve({ code: 200, message: 'success', data: true });
      }, 300);
    });
  }
  return request.post({ url: FORM_BASIC_URL, data: payload });
}
