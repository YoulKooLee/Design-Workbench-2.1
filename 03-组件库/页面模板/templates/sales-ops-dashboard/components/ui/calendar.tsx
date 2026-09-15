import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '../../lib/utils'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('rounded-md border border-border bg-popover p-3', className)}
      classNames={{
        months: 'flex flex-col gap-4 sm:flex-row',
        month: 'space-y-4',
        caption: 'flex items-center justify-center pt-1 relative',
        caption_label: 'text-sm font-medium text-foreground',
        nav: 'flex items-center gap-1',
        nav_button:
          'h-7 w-7 rounded-md border border-input bg-background text-muted-foreground hover:bg-secondary hover:text-foreground',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground',
        row: 'mt-2 flex w-full',
        cell: 'relative h-9 w-9 p-0 text-center text-sm',
        day: 'h-9 w-9 rounded-md p-0 font-normal text-foreground hover:bg-secondary',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-secondary aria-selected:text-secondary-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }
