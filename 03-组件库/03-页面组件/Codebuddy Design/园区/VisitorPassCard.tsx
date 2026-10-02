import React from 'react';
import { cn } from '../_kit/cn';

/**
 * VisitorPassCard 访客通行凭证 —— 登记完成后的电子凭证（二维码占位 + 有效期 + 可通行区域）
 * 场景：访客登记完成页、访客小程序凭证页。
 * 用法：import { VisitorPassCard } from "../../component-templates/园区/VisitorPassCard"
 */
export interface VisitorPassInfo {
  /** 凭证号 */
  passNo: string;
  /** 访客姓名 */
  name: string;
  /** 来访单位 */
  company?: string;
  /** 被访人 / 部门 */
  host: string;
  /** 有效期起，'YYYY-MM-DD HH:mm' */
  validFrom: string;
  /** 有效期止 */
  validTo: string;
  /** 可通行区域列表 */
  areas: string[];
  /** 状态 */
  status: '待生效' | '生效中' | '已过期' | '已注销' | string;
}

export interface VisitorPassCardProps {
  info: VisitorPassInfo;
  /** 二维码区域自定义内容（默认画占位方格） */
  qrContent?: React.ReactNode;
  /** 底部操作 */
  actions?: React.ReactNode;
  className?: string;
}

const STATUS_COLOR: Record<string, string> = {
  '待生效': 'var(--color-warning)',
  '生效中': 'var(--color-success)',
  '已过期': 'var(--color-text-3)',
  '已注销': 'var(--color-danger)',
};

/** 默认二维码占位（伪 QR 图案，纯 CSS 网格） */
function QrPlaceholder() {
  const cells = React.useMemo(() => {
    // 用固定种子生成稳定伪随机图案
    let seed = 42;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: 121 }, () => rnd() > 0.52);
  }, []);
  return (
    <div className="grid grid-cols-11 gap-px p-2 bg-white rounded-md" style={{ width: 108, height: 108 }}>
      {cells.map((on, i) => (
        <div key={i} style={{ background: on ? '#1d2129' : '#fff' }} />
      ))}
    </div>
  );
}

export function VisitorPassCard({ info, qrContent, actions, className }: VisitorPassCardProps) {
  const color = STATUS_COLOR[info.status] ?? 'var(--color-text-2)';
  return (
    <div className={cn('rounded-lg border bg-white overflow-hidden', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: 'var(--color-fill-1)' }}>
        <span className="text-sm font-medium">访客通行凭证</span>
        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          {info.status}
        </span>
      </div>
      <div className="flex gap-4 p-4">
        <div className="shrink-0 flex flex-col items-center gap-2">
          {qrContent ?? <QrPlaceholder />}
          <span className="text-xs tabular-nums" style={{ color: 'var(--color-text-3)' }}>{info.passNo}</span>
        </div>
        <div className="flex-1 min-w-0 text-xs space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold">{info.name}</span>
            {info.company ? <span style={{ color: 'var(--color-text-3)' }}>{info.company}</span> : null}
          </div>
          <div style={{ color: 'var(--color-text-2)' }}>被访人：{info.host}</div>
          <div style={{ color: 'var(--color-text-2)' }}>
            有效期：
            <span className="tabular-nums">{info.validFrom}</span> ~ <span className="tabular-nums">{info.validTo}</span>
          </div>
          <div>
            <div style={{ color: 'var(--color-text-2)', marginBottom: 4 }}>可通行区域：</div>
            <div className="flex flex-wrap gap-1.5">
              {info.areas.map((a) => (
                <span
                  key={a}
                  className="rounded px-2 py-0.5"
                  style={{ background: 'rgba(22,93,255,0.06)', color: 'var(--color-primary)' }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {actions ? <div className="flex justify-end gap-2 px-4 pb-4">{actions}</div> : null}
    </div>
  );
}
