import type {
  TicketCreatePayload,
  TicketListParams,
  TicketRecord,
  TicketUpdatePayload,
} from '@/types/ticket';

export const ticketTypes = ['咨询', '故障', '投诉', '建议'] as const;
export const priorities = ['低', '中', '高', '紧急'] as const;
export const statusLabels = ['待受理', '处理中', '已解决', '已关闭'] as const;
export const assignees = [
  '王立群',
  '李晓雯',
  '陈思远',
  '赵敏',
  '周杰',
  '未分配',
] as const;
export const customers = [
  '星河科技',
  '云启商贸',
  '北辰零售',
  '青禾生鲜',
  '澜海传媒',
  '个人用户',
] as const;

const TICKET_TITLES = [
  '无法登录账号，提示密码错误',
  '订单支付成功但未到账',
  'APP 闪退（iOS 17）',
  '发票开具信息有误',
  '希望增加批量导出功能',
  '物流信息长时间未更新',
  '会员权益未生效',
  '短信验证码收不到',
  '退款申请超过时效',
  '页面加载缓慢影响下单',
] as const;

function pad(n: number, len: number) {
  return String(n).padStart(len, '0');
}

function ticketId(n: number) {
  return `WO2026${pad((n % 12) + 1, 2)}${pad(n, 4)}`;
}

/** 确定性相对时间：按 index 推算天数与时分秒，无随机 */
function daysAgo(index: number): string {
  const days = index % 46;
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(9 + (index % 10), (index * 7) % 60, (index * 13) % 60, 0);
  return d.toISOString();
}

function createTicket(i: number): TicketRecord {
  const title = TICKET_TITLES[i % TICKET_TITLES.length];
  return {
    id: ticketId(i + 1),
    title,
    ticketType: (i % 4) as TicketRecord['ticketType'],
    priority: (i % 4) as TicketRecord['priority'],
    assignee: assignees[i % assignees.length],
    customer: customers[i % customers.length],
    createdAt: daysAgo(i),
    status: (i % 4) as TicketRecord['status'],
    description: `客户反馈：${title}。已登记相关环境信息，等待处理。`,
  };
}

let tickets: TicketRecord[] = Array.from({ length: 68 }, (_, i) =>
  createTicket(i)
);
let ticketSeq = tickets.length;

function delay<T>(data: T, ms = 280): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

function hasSelectFilter(value: unknown): boolean {
  if (value === '' || value == null) return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function matchSelect(value: unknown, target: number): boolean {
  if (Array.isArray(value)) return value.includes(target);
  return Number(value) === target;
}

function toDayStart(v: string | Date | number) {
  const d = v instanceof Date ? new Date(v) : new Date(v);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function toDayEnd(v: string | Date | number) {
  const d = v instanceof Date ? new Date(v) : new Date(v);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

/** 格式化 ISO 时间为 YYYY-MM-DD HH:mm:ss */
export function formatDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function filterListTable(params?: Partial<TicketListParams> | null) {
  let rows = tickets.slice();
  if (!params) return rows;
  if (params.id) {
    const id = String(params.id).toLowerCase();
    rows = rows.filter((r) => r.id.toLowerCase().includes(id));
  }
  if (params.title) {
    const title = String(params.title).toLowerCase();
    rows = rows.filter((r) => r.title.toLowerCase().includes(title));
  }
  if (hasSelectFilter(params.ticketType)) {
    rows = rows.filter((r) => matchSelect(params.ticketType, r.ticketType));
  }
  if (hasSelectFilter(params.priority)) {
    rows = rows.filter((r) => matchSelect(params.priority, r.priority));
  }
  if (hasSelectFilter(params.status)) {
    rows = rows.filter((r) => matchSelect(params.status, r.status));
  }
  if (params.assignee) {
    rows = rows.filter((r) => r.assignee === params.assignee);
  }
  if (params.customer) {
    rows = rows.filter((r) => r.customer === params.customer);
  }
  if (params.keyword) {
    const kw = String(params.keyword).toLowerCase();
    rows = rows.filter(
      (r) =>
        String(r.title || '')
          .toLowerCase()
          .includes(kw) ||
        String(r.description || '')
          .toLowerCase()
          .includes(kw)
    );
  }
  if (params.createdTime && params.createdTime.length === 2) {
    const start = toDayStart(params.createdTime[0]);
    const end = toDayEnd(params.createdTime[1]);
    rows = rows.filter((r) => {
      const t = new Date(r.createdAt).getTime();
      return t >= start && t <= end;
    });
  }
  return rows;
}

/** 分页筛选工单列表 */
export function getListMock(params: TicketListParams) {
  const filtered = filterListTable(params);
  const start = (params.current - 1) * params.pageSize;
  return delay({
    list: filtered.slice(start, start + params.pageSize),
    total: filtered.length,
  });
}

/** 按 id 取工单 */
export function getItemMock(id: string) {
  return delay(tickets.find((r) => r.id === id) || null, 120);
}

/** 新建工单 */
export function createItemMock(payload: TicketCreatePayload) {
  ticketSeq += 1;
  const row: TicketRecord = {
    id: ticketId(ticketSeq),
    title: payload.title || '未命名工单',
    ticketType: (payload.ticketType ?? 0) as TicketRecord['ticketType'],
    priority: (payload.priority ?? 1) as TicketRecord['priority'],
    assignee: payload.assignee || '未分配',
    customer: payload.customer || '个人用户',
    createdAt: new Date().toISOString(),
    status: (payload.status ?? 0) as TicketRecord['status'],
    description: payload.description || '',
  };
  tickets.unshift(row);
  return delay(row, 220);
}

/** 更新工单（全字段） */
export function updateItemMock(id: string, payload: Partial<TicketUpdatePayload>) {
  const idx = tickets.findIndex((r) => r.id === id);
  if (idx < 0) return delay(null as TicketRecord | null, 220);
  const prev = tickets[idx];
  tickets[idx] = {
    ...prev,
    title: payload.title ?? prev.title,
    ticketType: (payload.ticketType ?? prev.ticketType) as TicketRecord['ticketType'],
    priority: (payload.priority ?? prev.priority) as TicketRecord['priority'],
    assignee: payload.assignee ?? prev.assignee,
    customer: payload.customer ?? prev.customer,
    status: (payload.status ?? prev.status) as TicketRecord['status'],
    description: payload.description ?? prev.description,
    id,
  };
  return delay(tickets[idx], 220);
}

/** 删除单条工单 */
export function deleteItemMock(id: string) {
  const before = tickets.length;
  tickets = tickets.filter((r) => r.id !== id);
  return delay(tickets.length < before);
}

/** 批量删除工单，返回删除条数 */
export function deleteItemsMock(ids: string[]) {
  const set = new Set(ids || []);
  const before = tickets.length;
  tickets = tickets.filter((r) => !set.has(r.id));
  return delay(before - tickets.length);
}

/** 批量关闭工单（status=3），返回关闭条数 */
export function closeTicketsMock(ids: string[]) {
  const set = new Set(ids || []);
  let count = 0;
  tickets = tickets.map((r) => {
    if (!set.has(r.id)) return r;
    count += 1;
    return { ...r, status: 3 };
  });
  return delay(count);
}
