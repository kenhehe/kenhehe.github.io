export default function CanvasPage() {

  return (
    <div>
      <canvas id="eraseCanvas" ref={canvasRef}></canvas>
      <div id="percentage"></div>
    </div>
  );
}
