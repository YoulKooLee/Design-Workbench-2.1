import React from "react"
import { Badge } from './ui/badge'
import { Spinner } from './ui/spinner'

export function SpinnerBadge() {
  return (
    <div className="flex items-center gap-2 [--radius:1.2rem]">
      <Badge>
        <Spinner />
        同步中
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        更新中
      </Badge>
      <Badge variant="outline">
        <Spinner />
        处理中
      </Badge>
    </div>
  )
}
