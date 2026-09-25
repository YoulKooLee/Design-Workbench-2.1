import React from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { ResultPage } from '../../反馈/ResultPage';

/* 文案（逐字取自母版 locale.js → exception） */
const T = {
  back: '返回首页',
  prev: '返回上页',
  '403title': '暂无权限',
  '403sub': '抱歉，您无权访问此页面',
  '404title': '页面不存在',
  '404sub': '抱歉，页面不存在或已被移除',
  '500title': '服务器异常',
  '500sub': '抱歉，服务暂时不可用，请稍后再试',
};

export type ExceptionCode = '403' | '404' | '500';

export interface PageExceptionProps {
  /** 异常码，默认 404 */
  code?: ExceptionCode;
  /** 自定义标题 / 说明（不传用母版文案） */
  title?: React.ReactNode;
  desc?: React.ReactNode;
  onBack?: () => void;
  onPrev?: () => void;
  className?: string;
}

/**
 * PageException 异常页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `exception-403 / 404 / 500`（三页共用 `exception-page.js`）全交互精转，
 * 文案逐字取自母版 `locale.js → exception`。
 * 覆盖：403 暂无权限 / 404 页面不存在 / 500 服务器异常 三种形态（单组件切换）+ 返回首页 / 返回上页。
 */
export function PageException({ code = '404', title, desc, onBack, onPrev, className }: PageExceptionProps) {
  const safe = (['403', '404', '500'] as const).includes(code) ? code : '404';

  return (
    <div className={cn('flex min-h-[420px] items-center justify-center', className)}>
      <Card className="w-full max-w-[720px]">
        <ResultPage
          status={safe}
          title={title ?? T[`${safe}title` as keyof typeof T]}
          desc={desc ?? T[`${safe}sub` as keyof typeof T]}
          extra={
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" onClick={onBack}>
                {T.back}
              </Button>
              <Button variant="outline" onClick={onPrev}>
                {T.prev}
              </Button>
            </div>
          }
        />
      </Card>
    </div>
  );
}

export default PageException;
