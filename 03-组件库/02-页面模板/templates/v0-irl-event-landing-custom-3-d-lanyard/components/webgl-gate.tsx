import React, { useEffect, useState } from "react";

type WebGLStatus = "checking" | "supported" | "unsupported";

function hasWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const context = (
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    ) as WebGLRenderingContext | WebGL2RenderingContext | null;

    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function WebGLGate({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const [status, setStatus] = useState<WebGLStatus>("checking");

  useEffect(() => {
    setStatus(hasWebGLSupport() ? "supported" : "unsupported");
  }, []);

  if (status !== "supported") {
    return <>{fallback}</>;
  }

  return (
    <WebGLErrorBoundary fallback={fallback}>
      {children}
    </WebGLErrorBoundary>
  );
}
