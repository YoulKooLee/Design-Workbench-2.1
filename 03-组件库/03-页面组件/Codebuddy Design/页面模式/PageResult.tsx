import React from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { ResultPage } from '../反馈/ResultPage';
import { message, MessageHost } from '../反馈/Message';

/* 文案（逐字取自母版 locale.js → result） */
const T = {
  successTitle: '提交成功',
  successSub: '工作目标已创建，可在目标列表中查看',
  waitingTitle: '等待处理',
  waitingSub: '目标已提交，正在等待审核，请稍候…',
  warningTitle: '提交存在风险',
  warningSub: '检测到部分信息不完整，提交后可能影响审核结果，请确认后继续。',
  errorTitle: '提交失败',
  errorSub: '表单提交失败，请稍后再试。',
  back: '返回首页',
  viewList: '目标列表',
  refresh: '刷新状态',
  refreshTip: '正在刷新状态…',
  acknowledge: '我知道了',
  acknowledgeTip: '已确认风险提示',
  retry: '再试一次',
  retryTip: '重试中…',
};

export type PageResultType = 'success' | 'waiting' | 'warning' | 'error';

const STATUS_MAP: Record<PageResultType, 'success' | 'waiting' | 'warning' | 'error'> = {
  success: 'success',
  waiting: 'waiting',
  warning: 'warning',
  error: 'error',
};

export interface PageResultProps {
  /** 结果形态，默认 success */
  type?: PageResultType;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  /** 结果下方的附加内容（如详情、清单） */
  children?: React.ReactNode;
  onBack?: () => void;
  onViewList?: () => void;
  onRefresh?: () => void;
  onAcknowledge?: () => void;
  onRetry?: () => void;
  className?: string;
}

/**
 * PageResult 结果页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `result-success / waiting / warning / error`（四页共用 `result-page.js`）全交互精转，
 * 文案逐字取自母版 `locale.js → result`。
 * 覆盖：成功 / 等待 / 警告 / 失败 四种形态（单组件切换），每种形态的差异化副按钮
 * （成功→目标列表、等待→刷新状态、警告→我知道了、失败→再试一次）+ 返回首页。
 */
export function PageResult({
  type = 'success',
  title,
  desc,
  children,
  onBack,
  onViewList,
  onRefresh,
  onAcknowledge,
  onRetry,
  className,
}: PageResultProps) {
  const safe = (['success', 'waiting', 'warning', 'error'] as const).includes(type) ? type : 'success';

  const fallbackTitle =
    safe === 'waiting' ? T.waitingTitle : safe === 'warning' ? T.warningTitle : safe === 'error' ? T.errorTitle : T.successTitle;
  const fallbackDesc =
    safe === 'waiting' ? T.waitingSub : safe === 'warning' ? T.warningSub : safe === 'error' ? T.errorSub : T.successSub;

  return (
    <div className={cn('flex min-h-[420px] items-center justify-center', className)}>
      <MessageHost />
      <Card className="w-full max-w-[760px]">
        <ResultPage
          status={STATUS_MAP[safe]}
          title={title ?? fallbackTitle}
          desc={desc ?? fallbackDesc}
          extra={
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" onClick={onBack}>
                {T.back}
              </Button>
              {safe === 'success' && (
                <Button variant="outline" onClick={onViewList}>
                  {T.viewList}
                </Button>
              )}
              {safe === 'waiting' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    onRefresh?.();
                    message.info(T.refreshTip);
                  }}
                >
                  {T.refresh}
                </Button>
              )}
              {safe === 'warning' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    onAcknowledge?.();
                    message.info(T.acknowledgeTip);
                  }}
                >
                  {T.acknowledge}
                </Button>
              )}
              {safe === 'error' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    onRetry?.();
                    message.info(T.retryTip);
                  }}
                >
                  {T.retry}
                </Button>
              )}
            </div>
          }
        />
        {children ? <div className="mt-4">{children}</div> : null}
      </Card>
    </div>
  );
}

export default PageResult;
