"use client";

import { useEffect, useRef, useCallback } from "react";
import { Application, Container } from "pixi.js";
import { logger } from "@/lib/logger";

export interface GameCanvasHandle {
  stage: Container;
  app: Application;
}

interface GameCanvasProps {
  onReady?: (handle: GameCanvasHandle) => void;
  width?: number;
  height?: number;
  className?: string;
}

export function GameCanvas({ onReady, width, height, className }: GameCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const readyCalled = useRef(false);

  const initApp = useCallback(async () => {
    if (appRef.current || !canvasRef.current) return;

    try {
      const app = new Application();
      await app.init({
        resizeTo: canvasRef.current,
        background: 0x1a1a2e,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
      });

      canvasRef.current.appendChild(app.canvas as HTMLCanvasElement);
      appRef.current = app;

      logger.info("PixiJS Application initialized", "components/game/GameCanvas.tsx", "initApp");

      if (!readyCalled.current && onReady) {
        readyCalled.current = true;
        onReady({ stage: app.stage, app });
      }
    } catch (err) {
      logger.error("Failed to init PixiJS", "components/game/GameCanvas.tsx", "initApp", err);
    }
  }, [onReady, width, height]);

  useEffect(() => {
    initApp();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
        readyCalled.current = false;
      }
    };
  }, [initApp]);

  return <div ref={canvasRef} className={className} style={{ width: width ?? "100%", height: height ?? "100%" }} />;
}
