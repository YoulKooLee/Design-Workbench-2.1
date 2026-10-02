import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

/**
 * PassageRecordTable 通行记录表 —— 园区/楼宇门禁通行流水
 * 场景：园区大屏「人车态势」、门禁管理后台的通行明细区块。
 * 用法：import { PassageRecordTable } from "../../component-templates/园区/PassageRecordTable"
 */
export interface PassageRecord {
  /** 记录 id */
  id: string | number;
  /** 通行时间，如 '09:32:18' 或完整时间 */
  time: string;
  /** 人员姓名 */
  name: string;
  /** 人员类型：员工 / 访客 / 施工方 */
  personType: '员工' | '访客' | '施工方' | string;
  /** 通行通道，如 '东门 · 人行闸机 2' */
  channel: string;
  /** 方向：进 / 出 */
  direction: '进' | '出';
  /** 通行方式：人脸 / 卡 / 二维码 / 车牌 */
  method: string;
  /** 通行结果：正常 / 拒绝 / 告警 */
  result: '正常' | '拒绝' | '告警' | string;
  /** 备注（拒绝/告警原因等） */
  remark?: string;
}

export interface PassageRecordTableProps {
  /** 标题 */
  title?: string;
  /** 右上操作区 */
  extra?: ReactNode;
  /** 记录列表 */
  records: PassageRecord[];
  /** 最多显示条数（超出折叠，默认 8） */
  maxCount?: number;
  className?: string;
}

const RESULT_STYLE: Record<string, string> = {
  '正常': 'var(--color-success)',
  '拒绝': 'var(--color-danger)',
  '告警': 'var(--color-warning)',
};

export function PassageRecordTable({ title = '通行记录', extra, records, maxCount = 8, className }: PassageRecordTableProps) {
  const [expanded, setExpanded] = React.useState(false);
  const list = expanded ? records : records.slice(0, maxCount);
  return (
    <div className={cn('rounded-lg border bg-white', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--color-border-2)' }}>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs" style={{ color: 'var(--color-text-3)' }}>
          共 {records.length} 条
          {extra ? <span className="ml-3">{extra}</span> : null}
        </div>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ color: 'var(--color-text-3)', background: 'var(--color-fill-1)' }}>
            <th className="text-left font-normal px-4 py-2">时间</th>
            <th className="text-left font-normal px-2 py-2">人员</th>
            <th className="text-left font-normal px-2 py-2">类型</th>
            <th className="text-left font-normal px-2 py-2">通道</th>
            <th className="text-center font-normal px-2 py-2">方向</th>
            <th className="text-left font-normal px-2 py-2">方式</th>
            <th className="text-left font-normal px-2 py-2">结果</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id} className="border-t" style={{ borderColor: 'var(--color-border-2)' }}>
              <td className="px-4 py-2 tabular-nums" style={{ color: 'var(--color-text-2)' }}>{r.time}</td>
              <td className="px-2 py-2 font-medium">{r.name}</td>
              <td className="px-2 py-2" style={{ color: 'var(--color-text-2)' }}>{r.personType}</td>
              <td className="px-2 py-2" style={{ color: 'var(--color-text-2)' }}>{r.channel}</td>
              <td className="px-2 py-2 text-center">
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs"
                  style={{
                    background: r.direction === '进' ? 'rgba(22,93,255,0.08)' : 'rgba(0,180,42,0.08)',
                    color: r.direction === '进' ? 'var(--color-primary)' : 'var(--color-success)',
                  }}
                >
                  {r.direction === '进' ? '↓' : '↑'}
                </span>
              </td>
              <td className="px-2 py-2" style={{ color: 'var(--color-text-2)' }}>{r.method}</td>
              <td className="px-2 py-2">
                <span className="inline-flex items-center gap-1" style={{ color: RESULT_STYLE[r.result] ?? 'var(--color-text-2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: RESULT_STYLE[r.result] ?? 'var(--color-text-3)' }} />
                  {r.result}
                </span>
                {r.remark ? <span className="ml-1" style={{ color: 'var(--color-text-3)' }}>（{r.remark}）</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {records.length > maxCount ? (
        <div className="px-4 py-2 border-t text-xs text-center cursor-pointer" style={{ borderColor: 'var(--color-border-2)', color: 'var(--color-primary)' }} onClick={() => setExpanded(!expanded)}>
          {expanded ? '收起' : '展开全部 ' + records.length + ' 条'}
        </div>
      ) : null}
    </div>
  );
}
