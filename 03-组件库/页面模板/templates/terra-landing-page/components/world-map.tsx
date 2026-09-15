import React, { useState } from "react"
import type { Experience } from "../lib/experience-data"
import mapImage from "../public/map.svg"

interface WorldMapProps {
  experiences: Experience[]
  selectedExperience: Experience | null
  onSelectExperience: (exp: Experience | null) => void
}

const markerColors: Record<Experience["color"], string> = {
  pink: "#ec4899",
  yellow: "#eab308",
  green: "#22c55e",
  blue: "#3b82f6",
}

function projectLocation(exp: Experience) {
  if (exp.location.isRemote) return null

  return {
    x: ((exp.location.lng + 180) / 360) * 100,
    y: ((90 - exp.location.lat) / 180) * 100,
  }
}

export function WorldMap({ experiences, selectedExperience, onSelectExperience }: WorldMapProps) {
  const [hoveredExperience, setHoveredExperience] = useState<Experience | null>(null)
  const activeExperience = hoveredExperience || selectedExperience

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative mx-auto w-full max-w-[1138px]">
        <img src={mapImage} alt="标注 TERRA 保护项目位置的世界地图" className="w-full h-auto" />

        {experiences.map((exp) => {
          const position = projectLocation(exp)
          if (!position) return null

          const isActive = activeExperience?.id === exp.id
          const color = markerColors[exp.color]

          return (
            <button
              key={exp.id}
              type="button"
              aria-label={`${exp.title}, ${exp.location.country}`}
              onClick={() => onSelectExperience(selectedExperience?.id === exp.id ? null : exp)}
              onMouseEnter={() => setHoveredExperience(exp)}
              onMouseLeave={() => setHoveredExperience(null)}
              className="absolute z-10 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F2F3F5]/80 shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-transform duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-[#F2F3F5]/70 md:size-5"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                backgroundColor: color,
              }}
            >
              <span
                className="absolute inset-[-10px] rounded-full opacity-30"
                style={{
                  backgroundColor: color,
                  transform: isActive ? "scale(1.35)" : "scale(1)",
                }}
              />
            </button>
          )
        })}

        {activeExperience && (
          <div className="pointer-events-none absolute left-1/2 top-6 z-20 w-[min(320px,calc(100%-32px))] -translate-x-1/2 rounded-xl border border-[#F2F3F5]/10 bg-[#0B0C0F]/90 p-4 text-left shadow-2xl backdrop-blur-md md:left-auto md:right-8 md:top-8 md:translate-x-0">
            <div className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[#A7ABB3]">
              {activeExperience.location.city}, {activeExperience.location.country}
            </div>
            <div className="text-base font-medium text-[#F2F3F5]">{activeExperience.title}</div>
            <div className="mt-1 text-sm text-[#A7ABB3]">{activeExperience.company}</div>
          </div>
        )}
      </div>
    </div>
  )
}
