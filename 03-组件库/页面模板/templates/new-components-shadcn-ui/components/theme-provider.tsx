import * as React from 'react'

type ThemeProviderProps = React.PropsWithChildren<{
  defaultTheme?: 'light' | 'dark' | 'system'
}>

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  return <div className={defaultTheme === 'dark' ? 'dark' : undefined}>{children}</div>
}
