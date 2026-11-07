import request from '@/utils/http/request';
import type {
  WorkplaceMockLabels,
  WorkplaceOverview,
  WorkplaceOverviewQuery,
} from '@/types/workplace';
import type { ApiResult } from '@/types/ticket';
import { getWorkplaceOverviewMock } from '@/mock/workplace';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const WORKPLACE_OVERVIEW_URL = '/api/workplace/overview';

export interface GetOverviewOptions extends WorkplaceOverviewQuery {
  labels: WorkplaceMockLabels;
}

/** 获取数据概览 KPI、图表与渠道设备数据 */
export async function getOverview(options: GetOverviewOptions) {
  const { from, to, salt = 0, labels } = options;
  if (USE_MOCK) {
    return new Promise<ApiResult<WorkplaceOverview>>((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          message: 'success',
          data: getWorkplaceOverviewMock(from, to, labels, salt),
        });
      }, 280);
    });
  }
  return request.get<WorkplaceOverview>({
    url: WORKPLACE_OVERVIEW_URL,
    params: {
      from: from instanceof Date ? from.toISOString() : from,
      to: to instanceof Date ? to.toISOString() : to,
      salt,
    },
  });
}
