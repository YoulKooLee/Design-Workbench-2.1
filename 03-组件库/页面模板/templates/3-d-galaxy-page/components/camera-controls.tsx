import React, { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls as DreiOrbitControls } from "@react-three/drei"
import type * as THREE from "three"

interface CameraControlsProps {
  autoRotate: boolean
  resetToken: number
  onCameraChange?: (position: THREE.Vector3, target: THREE.Vector3) => void
}

export function CameraControls({ autoRotate, resetToken, onCameraChange }: CameraControlsProps) {
  const controlsRef = useRef<any>(null)
  const lastReportTime = useRef(0)
  const { camera } = useThree()

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }, [resetToken])

  useFrame((state) => {
    if (controlsRef.current && onCameraChange && state.clock.elapsedTime - lastReportTime.current > 0.2) {
      lastReportTime.current = state.clock.elapsedTime
      onCameraChange(camera.position, controlsRef.current.target)
    }
  })

  return (
    <DreiOrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={2}
      maxDistance={50}
      autoRotate={autoRotate}
      autoRotateSpeed={0.3}
      enableDamping={true}
      dampingFactor={0.05}
    />
  )
}
