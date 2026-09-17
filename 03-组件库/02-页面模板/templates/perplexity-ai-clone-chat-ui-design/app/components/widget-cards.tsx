import React, { useEffect, useState } from "react"
import { Cloud } from "lucide-react"

export function WidgetCards() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  // Calculate angles for clock hands
  const secondAngle = (seconds / 60) * 360
  const minuteAngle = ((minutes + seconds / 60) / 60) * 360
  const hourAngle = (((hours % 12) + minutes / 60) / 12) * 360

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Clock Widget */}
      <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-lg">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Analog Clock */}
          <div className="relative h-40 w-40">
            {/* Clock Face */}
            <svg className="h-full w-full" viewBox="0 0 200 200">
              {/* Hour Markers */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180)
                const x1 = 100 + Math.cos(angle) * 85
                const y1 = 100 + Math.sin(angle) * 85
                const x2 = 100 + Math.cos(angle) * 75
                const y2 = 100 + Math.sin(angle) * 75
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth={i % 3 === 0 ? "3" : "2"}
                    className="text-foreground/20"
                  />
                )
              })}

              {/* Hour Hand */}
              <line
                x1="100"
                y1="100"
                x2={100 + Math.cos((hourAngle - 90) * (Math.PI / 180)) * 45}
                y2={100 + Math.sin((hourAngle - 90) * (Math.PI / 180)) * 45}
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-foreground transition-all duration-1000"
              />

              {/* Minute Hand */}
              <line
                x1="100"
                y1="100"
                x2={100 + Math.cos((minuteAngle - 90) * (Math.PI / 180)) * 60}
                y2={100 + Math.sin((minuteAngle - 90) * (Math.PI / 180)) * 60}
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-foreground transition-all duration-1000"
              />

              {/* Second Hand */}
              <line
                x1="100"
                y1="100"
                x2={100 + Math.cos((secondAngle - 90) * (Math.PI / 180)) * 70}
                y2={100 + Math.sin((secondAngle - 90) * (Math.PI / 180)) * 70}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-orange-500 transition-all duration-100"
              />

              {/* Center Dot */}
              <circle cx="100" cy="100" r="4" fill="currentColor" className="text-foreground" />
              <circle cx="100" cy="100" r="2" fill="currentColor" className="text-orange-500" />
            </svg>

            {/* Digital Time */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 text-center">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">周六</div>
              <div className="text-sm font-medium text-foreground">
                {time.toLocaleTimeString("zh-CN", { hour: "numeric", minute: "2-digit", hour12: true })}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-lg font-medium text-foreground">Dubai</div>
          </div>
        </div>
      </div>

      {/* Assistant CTA Widget */}
      <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 shadow-sm transition-all hover:shadow-lg">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-teal-400/25 blur-2xl" />
          <div className="absolute -right-6 bottom-8 h-32 w-32 rounded-full bg-sky-400/20 blur-2xl" />
          <div className="absolute inset-x-6 top-1/3 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-teal-200/40 to-transparent" />
          <div className="absolute right-8 top-9 h-2 w-2 rounded-full bg-white/80" />
          <div className="absolute left-14 top-20 h-1.5 w-1.5 rounded-full bg-white/70" />
          <div className="absolute right-16 bottom-20 h-1 w-1 rounded-full bg-teal-100/80" />
        </div>
        <div className="relative flex h-full items-end">
          <div className="font-mono text-sm font-medium uppercase tracking-wider text-white">
            体验 Assistant 实战
          </div>
        </div>
      </div>

      {/* Stock Widget */}
      <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-lg">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-semibold text-foreground">NVDA</div>
              <div className="text-sm text-muted-foreground">NVIDIA Corporation</div>
            </div>
            <div className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">
              ↘ 0.41%
            </div>
          </div>

          {/* Stock Chart */}
          <div className="h-20">
            <svg className="h-full w-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="stockGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(14, 165, 233)" />
                  <stop offset="70%" stopColor="rgb(14, 165, 233)" />
                  <stop offset="70%" stopColor="rgb(239, 68, 68)" />
                  <stop offset="100%" stopColor="rgb(239, 68, 68)" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#stockGradient)"
                strokeWidth="2"
                points="0,60 20,55 40,58 60,50 80,45 100,40 120,35 140,30 160,20 180,15 200,25 220,35 240,50 260,60 280,65 300,70"
              />
              <line
                x1="0"
                y1="40"
                x2="300"
                y2="40"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="text-border opacity-50"
              />
            </svg>
          </div>

          <div className="text-3xl font-semibold text-foreground">$186.23</div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-6 shadow-sm transition-all hover:shadow-lg">
        <div className="flex h-full flex-col justify-between text-white">
          <div className="flex items-start justify-between">
            <div className="text-5xl font-light">21° C</div>
            <Cloud className="h-12 w-12 opacity-90" />
          </div>

          <div>
            <div className="text-base opacity-80">局部多云</div>
            <div className="mt-2 text-sm opacity-70">Nadd Al Shiba, United Arab Emirates</div>
          </div>
        </div>
      </div>
    </div>
  )
}
