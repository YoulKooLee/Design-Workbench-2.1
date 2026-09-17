import * as React from 'react'

type ThemeProviderProps = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>

export function ThemeProvider({ children, className, ...props }: ThemeProviderProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
