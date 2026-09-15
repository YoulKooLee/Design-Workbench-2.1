import React from "react"
import { Button } from './ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './ui/empty'
import { Spinner } from './ui/spinner'

export function SpinnerEmpty() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>正在处理你的请求</EmptyTitle>
        <EmptyDescription>
          请稍候，我们正在处理请求。请不要刷新页面。
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          取消
        </Button>
      </EmptyContent>
    </Empty>
  )
}
