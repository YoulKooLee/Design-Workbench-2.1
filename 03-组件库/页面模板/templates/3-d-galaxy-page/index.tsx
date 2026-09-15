/**
 * @name 3D 银河浏览器
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import type * as THREE from "three";

import "./style.css";
import { CameraControls } from "./components/camera-controls";
import { ConstellationOverlay } from "./components/constellation-overlay";
import { Galaxy } from "./components/galaxy";
import { GalaxyControls } from "./components/galaxy-controls";
import { StarLabels } from "./components/star-labels";
import { UIOverlay } from "./components/ui-overlay";

export default function GalaxyViewer() {
  const [galaxyParams, setGalaxyParams] = useState({
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 4,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  });

  const [autoRotate, setAutoRotate] = useState(false);
  const [showConstellations, setShowConstellations] = useState(false);
  const [showStarLabels, setShowStarLabels] = useState(false);
  const [qualityMode, setQualityMode] = useState<"high" | "medium" | "low">("high");
  const [resetToken, setResetToken] = useState(0);
  const [cameraPosition, setCameraPosition] = useState<THREE.Vector3>();
  const [cameraTarget, setCameraTarget] = useState<THREE.Vector3>();

  const handleScreenshot = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = `galaxy-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
    } else {
      void document.exitFullscreen();
    }
  };

  const handleResetView = () => {
    setResetToken((value) => value + 1);
  };

  const handleCameraChange = (position: THREE.Vector3, target: THREE.Vector3) => {
    setCameraPosition(position.clone());
    setCameraTarget(target.clone());
  };

  const adjustedParams = {
    ...galaxyParams,
    count:
      qualityMode === "high"
        ? galaxyParams.count
        : qualityMode === "medium"
          ? Math.floor(galaxyParams.count * 0.6)
          : Math.floor(galaxyParams.count * 0.3),
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "r":
          handleResetView();
          break;
        case "s":
          handleScreenshot();
          break;
        case "f":
          handleToggleFullscreen();
          break;
        case "a":
          setAutoRotate((value) => !value);
          break;
        case "c":
          setShowConstellations((value) => !value);
          break;
        case "l":
          setShowStarLabels((value) => !value);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="galaxy-prototype relative h-screen w-full overflow-hidden bg-black">
      <Canvas
        camera={{
          position: [6, 3, 6],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={0.5} color="#f8fbff" />

          <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade />

          <Galaxy {...adjustedParams} />
          <ConstellationOverlay visible={showConstellations} />
          <StarLabels visible={showStarLabels} />

          <CameraControls
            autoRotate={autoRotate}
            resetToken={resetToken}
            onCameraChange={handleCameraChange}
          />
        </Suspense>
      </Canvas>

      <UIOverlay
        onResetView={handleResetView}
        onScreenshot={handleScreenshot}
        onToggleFullscreen={handleToggleFullscreen}
        cameraPosition={cameraPosition}
        cameraTarget={cameraTarget}
      />

      <GalaxyControls
        params={galaxyParams}
        onChange={setGalaxyParams}
        onAutoRotateChange={setAutoRotate}
        onConstellationsChange={setShowConstellations}
        onStarLabelsChange={setShowStarLabels}
        onQualityChange={setQualityMode}
      />
    </div>
  );
}
