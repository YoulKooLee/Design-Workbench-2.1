/** 工单类型枚举：咨询 / 故障 / 投诉 / 建议 */
export type TicketType = 0 | 1 | 2 | 3;

/** 优先级枚举：低 / 中 / 高 / 紧急 */
export type TicketPriority = 0 | 1 | 2 | 3;

/** 状态枚举：待受理 / 处理中 / 已解决 / 已关闭 */
export type TicketStatus = 0 | 1 | 2 | 3;

/** 工单列表行（对齐母版 list-search-table） */
export interface TicketRecord {
  id: string;
  title: string;
  ticketType: TicketType;
  priority: TicketPriority;
  assignee: string;
  customer: string;
  createdAt: string;
  status: TicketStatus;
  description: string;
}

/** 列表筛选与分页参数 */
export interface TicketListParams {
  id?: string;
  title?: string;
  ticketType?: number | '' | null;
  priority?: number | '' | null;
  status?: number | '' | null;
  assignee?: string;
  customer?: string;
  keyword?: string;
  createdTime?: (string | Date | number)[] | null;
  current: number;
  pageSize: number;
}

export interface TicketListData {
  list: TicketRecord[];
  total: number;
}

/** 新建工单载荷 */
export interface TicketCreatePayload {
  title: string;
  ticketType: number;
  priority: number;
  assignee: string;
  customer: string;
  status: number;
  description: string;
}

/** 更新工单载荷 */
export interface TicketUpdatePayload extends TicketCreatePayload {
  id: string;
}

export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}
