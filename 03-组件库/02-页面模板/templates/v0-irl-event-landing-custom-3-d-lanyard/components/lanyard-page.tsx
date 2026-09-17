import React, { Suspense, useEffect, useMemo, useState } from "react";
import LanyardWithControls from "./lanyard-with-controls";
import { decryptLanyardData, type LanyardData } from "../lib/utils";

function readHashParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  const rawHash = window.location.hash.replace(/^#/, "");
  return new URLSearchParams(rawHash).get(name);
}

function LanyardContent() {
  const [encrypted, setEncrypted] = useState(() => readHashParam("u"));

  useEffect(() => {
    const handleHashChange = () => setEncrypted(readHashParam("u"));
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  
  // Decrypt lanyard data (username + variant) from URL params if present
  const lanyardData = useMemo((): LanyardData | null => {
    if (encrypted) {
      return decryptLanyardData(encrypted);
    }
    return null;
  }, [encrypted]);

  // Redirect to home if no valid encrypted data is provided
  useEffect(() => {
    if (lanyardData === null) {
      window.location.hash = "page=home";
    }
  }, [lanyardData]);

  // Show loading while checking/redirecting
  if (lanyardData === null) {
    return (
      <main className="relative flex min-h-dvh flex-col items-center justify-center">
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center">
      <div className="relative w-full max-w-2xl">
        <LanyardWithControls
          position={[0, 0, 18]}
          containerClassName="relative aspect-square w-full h-screen"
          defaultName={lanyardData.username}
          defaultVariant={lanyardData.variant}
        />
      </div>
    </main>
  );
}

export default function LanyardPage() {
  return (
    <Suspense fallback={
      <main className="relative flex min-h-dvh flex-col items-center justify-center">
        <div className="relative w-full max-w-2xl">
          <div className="flex h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      </main>
    }>
      <LanyardContent />
    </Suspense>
  );
}
