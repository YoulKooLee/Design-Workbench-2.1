import React from 'react';
import { cn } from '../_kit/cn';
import { formatMoney } from '../_kit/format';

/**
 * InvoiceSheet 发票单 —— 抬头 + 收付双方 + 明细表 + 金额汇总 + 付款方式
 * 场景：账单详情页、开票预览、对账单打印（页面打印时保留纸张版式）。
 * 用法：import { InvoiceSheet } from "../../component-templates/付款/InvoiceSheet"
 * 来源：open-design / invoice 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 * 规则：金额一律走 _kit/format 的 formatMoney，不手写 toFixed。
 */

export interface InvoiceParty {
  /** 名称 */
  name: string;
  /** 多行地址/税号/邮箱 */
  lines?: string[];
}

export interface InvoiceLineItem {
  id?: string | number;
  /** 项目名 */
  title: string;
  /** 项目说明 */
  desc?: string;
  qty: number;
  /** 单价 */
  rate: number;
  /** 金额（缺省按 qty * rate 计算） */
  amount?: number;
}

export interface InvoiceTotalRow {
  label: string;
  /** 金额；负数自动显示减号 */
  value: number;
  /** 行色调：discount 优惠（绿）/ muted 次要（灰）/ grand 应付合计（反白强调） */
  tone?: 'normal' | 'discount' | 'muted' | 'grand';
}

export interface InvoicePayGroup {
  title: string;
  rows: { label: string; value: string }[];
}

export interface InvoiceSheetProps {
  /** 开票方品牌名 */
  brand: string;
  /** 品牌副标题 */
  brandDesc?: string;
  /** 品牌标记文字（取首字） */
  brandMark?: string;
  /** 发票号 */
  no: string;
  issuedOn?: string;
  dueOn?: string;
  /** 开票方 */
  from?: InvoiceParty;
  /** 收票方 */
  to?: InvoiceParty;
  /** 参考信息条（项目 / 采购单号 / 结算条款） */
  refs?: { label: string; value: string }[];
  items?: InvoiceLineItem[];
  /** 金额行（缺省按 items 汇总出一个小计 + 应付合计） */
  totals?: InvoiceTotalRow[];
  /** 付款条款说明 */
  terms?: string;
  /** 付款方式分组（银行转账 / 在线支付） */
  payGroups?: InvoicePayGroup[];
  /** 底部致谢语 */
  note?: string;
  /** 货币符号，默认 '¥' */
  currency?: string;
  className?: string;
}

const amountOf = (it: InvoiceLineItem): number =>
  typeof it.amount === 'number' ? it.amount : Number(it.qty || 0) * Number(it.rate || 0);

const defaultTotals = (items: InvoiceLineItem[]): InvoiceTotalRow[] => {
  const subtotal = items.reduce((sum, it) => sum + amountOf(it), 0);
  return [
    { label: '小计', value: subtotal },
    { label: '应付合计', value: subtotal, tone: 'grand' },
  ];
};

const TOTAL_TONE: Record<string, string> = {
  normal: 'text-neutral-10',
  discount: 'text-success-text',
  muted: 'text-neutral-7',
  grand: 'bg-neutral-10 text-white',
};

export function InvoiceSheet({
  brand,
  brandDesc,
  brandMark,
  no,
  issuedOn,
  dueOn,
  from,
  to,
  refs = [],
  items = [],
  totals,
  terms,
  payGroups = [],
  note,
  currency = '¥',
  className,
}: InvoiceSheetProps) {
  const money = (v: number) => formatMoney(v, { prefix: currency });
  const rows = totals && totals.length > 0 ? totals : defaultTotals(items);

  return (
    <div className={cn('rounded-lg border border-neutral-3 bg-white px-8 py-8', className)}>
      <div className="flex items-start justify-between gap-6 border-b-2 border-neutral-10 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-10 text-xl font-semibold text-white">
            {brandMark || brand.slice(0, 1)}
          </span>
          <span>
            <span className="block text-xl font-semibold text-neutral-10">{brand}</span>
            {brandDesc ? <span className="mt-0.5 block text-base text-neutral-7">{brandDesc}</span> : null}
          </span>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-widest text-neutral-7">发票</div>
          <div className="mt-1.5 text-2xl font-semibold tabular-nums text-neutral-10">{no}</div>
          {issuedOn || dueOn ? (
            <div className="mt-1 text-base text-neutral-7">
              {issuedOn ? (
                <span>
                  开具 <span className="text-neutral-10">{issuedOn}</span>
                </span>
              ) : null}
              {issuedOn && dueOn ? <span> · </span> : null}
              {dueOn ? (
                <span>
                  到期 <span className="text-neutral-10">{dueOn}</span>
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {from || to ? (
        <div className="grid grid-cols-1 gap-8 py-5 sm:grid-cols-2">
          {[
            { label: '开票方', party: from },
            { label: '收票方', party: to },
          ].map((g) =>
            g.party ? (
              <div key={g.label}>
                <div className="text-xs uppercase tracking-widest text-neutral-7">{g.label}</div>
                <div className="mt-2 text-lg font-semibold text-neutral-10">{g.party.name}</div>
                {g.party.lines?.length ? (
                  <div className="mt-1 text-base leading-relaxed text-neutral-7">
                    {g.party.lines.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null
          )}
        </div>
      ) : null}

      {refs.length > 0 ? (
        <div className="mb-6 grid grid-cols-1 gap-6 rounded-md bg-primary-light px-4 py-3 sm:grid-cols-3">
          {refs.map((r, i) => (
            <div key={i}>
              <div className="text-xs uppercase tracking-wide text-primary">{r.label}</div>
              <div className="mt-1 text-base text-neutral-10">{r.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      {items.length > 0 ? (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border-b-2 border-neutral-10 py-2.5 pr-3 text-xs font-normal uppercase tracking-wide text-neutral-7">
                项目
              </th>
              <th className="w-20 border-b-2 border-neutral-10 py-2.5 pr-3 text-right text-xs font-normal uppercase tracking-wide text-neutral-7">
                数量
              </th>
              <th className="w-32 border-b-2 border-neutral-10 py-2.5 pr-3 text-right text-xs font-normal uppercase tracking-wide text-neutral-7">
                单价
              </th>
              <th className="w-36 border-b-2 border-neutral-10 py-2.5 text-right text-xs font-normal uppercase tracking-wide text-neutral-7">
                金额
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={it.id ?? i}>
                <td className="border-b border-neutral-3 py-3 pr-3 align-top">
                  <div className="text-lg font-medium text-neutral-10">{it.title}</div>
                  {it.desc ? <div className="mt-0.5 text-base text-neutral-7">{it.desc}</div> : null}
                </td>
                <td className="border-b border-neutral-3 py-3 pr-3 text-right text-base tabular-nums text-neutral-8">
                  {it.qty}
                </td>
                <td className="border-b border-neutral-3 py-3 pr-3 text-right text-base tabular-nums text-neutral-8">
                  {money(it.rate)}
                </td>
                <td className="border-b border-neutral-3 py-3 text-right text-base tabular-nums text-neutral-10">
                  {money(amountOf(it))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <div className="mt-6 grid grid-cols-1 items-start gap-6 sm:grid-cols-[1.4fr_1fr]">
        <div>
          {terms ? (
            <div className="rounded-md bg-neutral-1 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-neutral-10">付款条款</div>
              <div className="mt-1.5 text-base leading-relaxed text-neutral-7">{terms}</div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          {rows.map((r, i) => {
            const grand = r.tone === 'grand';
            return (
              <div
                key={i}
                className={cn(
                  'flex items-center justify-between gap-3 text-lg',
                  grand ? 'mt-1.5 rounded-md px-4 py-3 font-semibold' : '',
                  grand ? TOTAL_TONE.grand : TOTAL_TONE[r.tone || 'normal']
                )}
              >
                <span>{r.label}</span>
                <span className="tabular-nums">{money(r.value)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {payGroups.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 rounded-lg border border-neutral-3 px-4 py-4 sm:grid-cols-2">
          {payGroups.map((g, i) => (
            <div key={i}>
              <div className="text-xs uppercase tracking-wide text-neutral-7">{g.title}</div>
              <div className="mt-2">
                {g.rows.map((r, j) => (
                  <div key={j} className="flex items-center justify-between gap-3 py-1 text-base">
                    <span className="text-neutral-8">{r.label}</span>
                    <span className="tabular-nums text-neutral-10">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {note ? (
        <div className="mt-6 flex items-end justify-between gap-6">
          <p className="m-0 text-lg text-neutral-7">{note}</p>
        </div>
      ) : null}
    </div>
  );
}
