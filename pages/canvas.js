import { useEffect, useRef } from "react";

export default function CanvasPage() {
  const canvasRef = useRef(null);

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