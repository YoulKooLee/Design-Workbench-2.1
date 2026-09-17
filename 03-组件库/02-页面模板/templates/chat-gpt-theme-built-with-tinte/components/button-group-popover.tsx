import React from 'react';
import { BotIcon, ChevronDownIcon } from "lucide-react"

import { Button } from './ui/button'
import { ButtonGroup } from './ui/button-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'

export function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        <BotIcon /> Copilot
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" aria-label="打开弹出层" size="icon-sm">
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="rounded-xl p-0 text-sm">
          <div className="px-4 py-3">
            <div className="text-sm font-medium">Agent 任务</div>
          </div>
          <Separator />
          <div className="p-4 text-sm *:[p:not(:last-child)]:mb-2">
            <Textarea
              placeholder="用自然语言描述你的任务。"
              className="mb-4 resize-none"
            />
            <p className="font-medium">用 Copilot 开始新任务</p>
            <p className="text-muted-foreground">
              用自然语言描述你的任务。 Copilot will work in the
              background and open a pull request for your review.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
