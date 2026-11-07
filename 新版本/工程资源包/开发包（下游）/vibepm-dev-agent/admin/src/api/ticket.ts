import request from '@/utils/http/request';
import type {
  ApiResult,
  TicketCreatePayload,
  TicketListData,
  TicketListParams,
  TicketRecord,
  TicketUpdatePayload,
} from '@/types/ticket';
import {
  closeTicketsMock,
  createItemMock,
  deleteItemMock,
  deleteItemsMock,
  getItemMock,
  getListMock,
  updateItemMock,
} from '@/mock/ticket';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

function wrapMock<T>(data: T): ApiResult<T> {
  return { code: 200, message: 'success', data };
}

/** 获取工单列表，支持编号/标题/类型/优先级/状态/处理人/客户/关键词/创建时间筛选与分页 */
export async function getList(params: TicketListParams) {
  if (USE_MOCK) {
    const data = await getListMock(params);
    return wrapMock(data);
  }
  return request.get<TicketListData>({ url: '/api/ticket/list', params });
}

/** 按 id 获取工单详情 */
export async function getItem(id: string) {
  if (USE_MOCK) {
    const data = await getItemMock(id);
    return wrapMock(data);
  }
  return request.get<TicketRecord | null>({
    url: '/api/ticket/item',
    params: { id },
  });
}

/** 新建工单 */
export async function createItem(payload: TicketCreatePayload) {
  if (USE_MOCK) {
    const data = await createItemMock(payload);
    return wrapMock(data);
  }
  return request.post<TicketRecord>({ url: '/api/ticket/item', data: payload });
}

/** 更新工单（全字段） */
export async function updateItem(id: string, payload: TicketUpdatePayload) {
  if (USE_MOCK) {
    const data = await updateItemMock(id, payload);
    return wrapMock(data);
  }
  return request.put<TicketRecord>({
    url: '/api/ticket/item',
    data: { ...payload, id },
  });
}

/** 删除单条工单 */
export async function deleteItem(id: string) {
  if (USE_MOCK) {
    await deleteItemMock(id);
    return wrapMock(true);
  }
  return request.del({ url: '/api/ticket/item', params: { id } });
}

/** 批量删除工单，返回删除条数 */
export async function deleteItems(ids: string[]) {
  if (USE_MOCK) {
    const n = await deleteItemsMock(ids);
    return wrapMock(n);
  }
  return request.post<{ count: number }>({
    url: '/api/ticket/batch-delete',
    data: { ids },
  });
}

/** 批量关闭工单，返回关闭条数 */
export async function closeTickets(ids: string[]) {
  if (USE_MOCK) {
    const n = await closeTicketsMock(ids);
    return wrapMock(n);
  }
  return request.post<{ count: number }>({
    url: '/api/ticket/batch-close',
    data: { ids },
  });
}
