import React from "react"
import { SearchIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from './ui/empty'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from './ui/input-group'
import { Kbd } from './ui/kbd'

export function EmptyInputGroup() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - 未找到</EmptyTitle>
        <EmptyDescription>
          你要找的页面不存在。可以在下方搜索需要的内容。
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="w-3/4">
          <InputGroupInput placeholder="试着搜索页面..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          需要帮助？<a href="#">联系支持</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
