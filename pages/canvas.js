import { useEffect, useRef } from "react";

/**
 * CanvasPage renders a canvas and a percentage display.
 * It sets up the canvas and fills it with red on mount.
 */
export default function CanvasPage() {
  const canvasRef = useRef(null);

  /**
   * useEffect runs once on mount to set up the canvas context and fill it.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Perform any canvas-related setup here
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div>
      <canvas id="eraseCanvas" ref={canvasRef}></canvas>
      <div id="percentage"></div>
    </div>
  );
}