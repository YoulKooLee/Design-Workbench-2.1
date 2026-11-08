import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Avatar } from '../../基础/Avatar';
import { Paragraph, Text } from '../../基础/Typography';
import { Divider } from '../../基础/Divider';
import { Button } from '../../基础/Button';
import { Tabs } from '../../布局/Tabs';
import { Pagination } from '../../数据展示/Pagination';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 数据模型（对齐母版 list-card）
 * ========================================================================= */

export interface CardItem {
  id: number;
  title: string;
  desc: string;
  tag: string;
  count: number;
  author: string;
  updatedAt: string;
  /** 封面色调 0-3 */
  tone: number;
}

export interface ServiceCardItem {
  id: string;
  title: string;
  desc: string;
  status: string;
  /** 对齐母版 statusColor：arcoblue | green | orangered */
  statusColor: 'blue' | 'green' | 'orange' | 'red' | 'gray';
  owner: string;
  duration: string;
  count: number;
}

export interface PageListCardProps {
  title?: ReactNode;
  desc?: ReactNode;
  items?: CardItem[];
  serviceItems?: ServiceCardItem[];
  /** 每页条数，默认 12 */
  defaultPageSize?: number;
  onCardClick?: (item: CardItem) => void;
  onServiceAction?: (action: string, item: ServiceCardItem) => void;
  className?: string;
}

/* =========================================================================
 * 母版字典与 mock
 * ========================================================================= */

const TAGS = ['图文', '视频'];
const CARD_TITLES = [
  '每日推荐视频集',
  '抖音短视频候选集',
  '国际新闻集合',
  '财经早报精选',
  '科技前沿速递',
  '生活好物分享',
];

const TONE_BG = [
  'linear-gradient(135deg, #e8f3ff 0%, #bcd8ff 100%)',
  'linear-gradient(135deg, #e8ffea 0%, #b7f0c4 100%)',
  'linear-gradient(135deg, #fff3e8 0%, #ffd9b3 100%)',
  'linear-gradient(135deg, #ffece8 0%, #ffc9c2 100%)',
];

const SERVICE_SEED: Array<Omit<ServiceCardItem, 'id' | 'count'>> = [
  {
    title: '视频内容质检规则',
    desc: '针对横版短视频封面、标题与违规词的自动巡检。',
    status: '进行中',
    statusColor: 'blue',
    owner: '陈明',
    duration: '7 天',
  },
  {
    title: '图文合规审核',
    desc: '检查图文内容敏感信息与版权声明完整性。',
    status: '已完成',
    statusColor: 'green',
    owner: '林芳',
    duration: '3 天',
  },
  {
    title: '评论区服务质量',
    desc: '抽样评估客服回复时效与话术规范。',
    status: '待开始',
    statusColor: 'orange',
    owner: '王磊',
    duration: '14 天',
  },
  {
    title: '直播间互动质检',
    desc: '监测直播话术、挂链与互动节奏是否达标。',
    status: '进行中',
    statusColor: 'blue',
    owner: '赵雪',
    duration: '5 天',
  },
  {
    title: '商品详情页抽检',
    desc: '核对主图、卖点文案与活动价展示一致性。',
    status: '已完成',
    statusColor: 'green',
    owner: '周凯',
    duration: '2 天',
  },
  {
    title: '用户反馈闭环',
    desc: '跟踪差评与投诉工单的处理时效与满意度。',
    status: '进行中',
    statusColor: 'blue',
    owner: '孙婷',
    duration: '10 天',
  },
];

/** 内置 mock：对齐母版 buildContentItems(36) */
export function createMockCardItems(count = 36): CardItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: CARD_TITLES[i % CARD_TITLES.length],
    desc: '这是一段描述文字，用于展示卡片列表的内容摘要。',
    tag: TAGS[i % TAGS.length],
    count: 1000 + i * 37,
    author: 'Admin',
    updatedAt: '2026-06-' + String(10 + (i % 18)).padStart(2, '0'),
    tone: i % 4,
  }));
}

/** 内置 mock：对齐母版 buildServiceItems(18) */
export function createMockServiceItems(count = 18): ServiceCardItem[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = SERVICE_SEED[i % SERVICE_SEED.length];
    const suffix = i >= SERVICE_SEED.length ? ' #' + (Math.floor(i / SERVICE_SEED.length) + 1) : '';
    return { ...seed, id: 's' + (i + 1), title: seed.title + suffix, count: 20 + i * 3 };
  });
}

const TAB_KEYS = ['standard', 'horizontal', 'cover', 'service'] as const;
type TabKey = (typeof TAB_KEYS)[number];

const TAB_ITEMS = [
  { key: 'standard', label: '标准卡片' },
  { key: 'horizontal', label: '横版卡片' },
  { key: 'cover', label: '封面卡片' },
  { key: 'service', label: '服务卡片' },
];

/**
 * PageListCard 卡片列表页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-card`（Vue + Arco HTML 母版）全交互精转。
 * 四个 Tab：标准卡片（4 列）/ 横版卡片（2 列图文左右）/ 封面卡片（大封面 + 角标）/ 服务卡片（3 列 + 元信息 + 操作）。
 * 覆盖母版全部形态、分页（8/12/16 可切）、卡片点击与操作反馈。
 *
 * 与母版的差异：母版 Tab 用 `type="rounded"`，本组件用库内 `capsule` 胶囊形态；封面渐变用内联 style（母版为 CSS 类）。
 *
 * @example
 * <PageListCard title="卡片列表" />
 */
export function PageListCard({
  title,
  desc,
  items,
  serviceItems,
  defaultPageSize = 12,
  onCardClick,
  onServiceAction,
  className,
}: PageListCardProps) {
  const contentList = useMemo(() => items ?? createMockCardItems(), [items]);
  const serviceList = useMemo(() => serviceItems ?? createMockServiceItems(), [serviceItems]);

  const [activeTab, setActiveTab] = useState<TabKey>('standard');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const activeList = activeTab === 'service' ? serviceList : contentList;
  const total = activeList.length;
  const paged = useMemo(
    () => activeList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
    [activeList, page, pageSize],
  );

  const switchTab = (key: string) => {
    setActiveTab(key as TabKey);
    setPage(1);
  };

  const clickCard = (item: CardItem) => {
    onCardClick?.(item);
    message.info(item.title);
  };

  const clickService = (action: string, item: ServiceCardItem) => {
    onServiceAction?.(action, item);
    message.success(action + '：' + item.title);
  };

  /* ---------- 卡片片段 ---------- */

  const cardFooter = (item: CardItem, flush?: boolean) => (
    <div className={cn('flex items-center justify-between', flush ? 'pt-2' : 'mt-3')}>
      <div className="flex items-center gap-2">
        <Avatar name={item.author} size="xs" />
        <Text>{item.author}</Text>
      </div>
      <div className="flex items-center gap-4">
        <Text type="secondary">{item.count} 次浏览</Text>
        <Text type="secondary">{item.updatedAt}</Text>
      </div>
    </div>
  );

  const renderStandard = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {paged.map((raw) => {
        const item = raw as CardItem;
        return (
          <div key={item.id} onClick={() => clickCard(item)} className="cursor-pointer">
            <Card className="h-full transition-shadow hover:shadow-[var(--shadow-pop)]">
              <div className="h-28 rounded-md" style={{ background: TONE_BG[item.tone] }} />
              <div className="mt-3 flex items-center gap-2">
                <Paragraph className="min-w-0 flex-1 truncate font-medium">{item.title}</Paragraph>
                <Tag>{item.tag}</Tag>
              </div>
              <Paragraph secondary className="mt-1 line-clamp-2 text-sm">
                {item.desc}
              </Paragraph>
              {cardFooter(item)}
            </Card>
          </div>
        );
      })}
    </div>
  );

  const renderHorizontal = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {paged.map((raw) => {
        const item = raw as CardItem;
        return (
          <div key={item.id} onClick={() => clickCard(item)} className="cursor-pointer">
            <Card className="h-full transition-shadow hover:shadow-[var(--shadow-pop)]">
              <div className="flex gap-4">
                <div className="h-24 w-32 shrink-0 rounded-md" style={{ background: TONE_BG[item.tone] }} />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-center gap-2">
                    <Paragraph className="min-w-0 flex-1 truncate font-medium">{item.title}</Paragraph>
                    <Tag>{item.tag}</Tag>
                  </div>
                  <Paragraph secondary className="mt-1 line-clamp-2 text-sm">
                    {item.desc}
                  </Paragraph>
                  {cardFooter(item, true)}
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );

  const renderCover = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {paged.map((raw) => {
        const item = raw as CardItem;
        return (
          <div key={item.id} onClick={() => clickCard(item)} className="cursor-pointer">
            <Card bordered={false} flush className="h-full overflow-hidden transition-shadow hover:shadow-[var(--shadow-pop)]">
              <div className="relative h-40" style={{ background: TONE_BG[item.tone] }}>
                <span className="absolute right-2 top-2 rounded-sm bg-black/35 px-2 py-0.5 text-xs text-white">
                  {item.tag}
                </span>
              </div>
              <div className="p-4 pt-3">
                <div className="flex items-center gap-2">
                  <Paragraph className="min-w-0 flex-1 truncate font-medium">{item.title}</Paragraph>
                  <Text type="secondary">{item.updatedAt}</Text>
                </div>
                <Paragraph secondary className="mt-1 line-clamp-2 text-sm">
                  {item.desc}
                </Paragraph>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar name={item.author} size="xs" />
                    <Text>{item.author}</Text>
                  </div>
                  <Text type="secondary">{item.count} 次浏览</Text>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );

  const renderService = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {paged.map((raw) => {
        const item = raw as ServiceCardItem;
        return (
          <Card key={item.id} className="h-full transition-shadow hover:shadow-[var(--shadow-pop)]">
            <div className="flex items-center gap-2">
              <Paragraph className="min-w-0 flex-1 truncate font-medium">{item.title}</Paragraph>
              <Tag color={item.statusColor}>{item.status}</Tag>
            </div>
            <Paragraph secondary className="mt-1 line-clamp-2 text-sm">
              {item.desc}
            </Paragraph>
            <div className="mt-3 flex flex-col gap-1.5 text-sm">
              <div className="flex items-center justify-between">
                <Text type="secondary">负责人</Text>
                <Text>{item.owner}</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text type="secondary">周期</Text>
                <Text>{item.duration}</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text type="secondary">已处理</Text>
                <Text>{item.count} 条</Text>
              </div>
            </div>
            <Divider />
            <div className="flex items-center justify-center gap-2">
              <Button variant="text" size="sm" onClick={() => clickService('查看', item)}>
                查看
              </Button>
              <Divider direction="vertical" />
              <Button variant="text" size="sm" onClick={() => clickService('编辑', item)}>
                编辑
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />
      {(title || desc) && (
        <div>
          {title && <h2 className="text-lg font-semibold text-neutral-10">{title}</h2>}
          {desc && <p className="mt-1 text-sm text-neutral-6">{desc}</p>}
        </div>
      )}

      <Tabs items={TAB_ITEMS} activeKey={activeTab} onChange={switchTab} type="capsule" />

      {activeTab === 'standard' && renderStandard()}
      {activeTab === 'horizontal' && renderHorizontal()}
      {activeTab === 'cover' && renderCover()}
      {activeTab === 'service' && renderService()}

      <div className="flex justify-end">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          pageSizeOptions={[8, 12, 16]}
          onChange={(p, s) => {
            setPage(p);
            setPageSize(s);
          }}
        />
      </div>
    </div>
  );
}

export default PageListCard;
