import React, { useState, useMemo } from "react";
import Tesseract from "tesseract.js";

import "./Handwriting.css";

export default function() {
  const width = 600;
  const height = 200;

  const [canvas, setCanvas] = useState(null);
  const ctx = useMemo(() => canvas && canvas.getContext("2d"), [canvas]);
  const [drawing, setDrawing] = useState(false);

  return (
    <div className="Handwriting--root" style={{ width, height }}>
      <ClearButton />
      <canvas
        ref={setCanvas}
        width={width}
        height={height}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
      <RecognizeButton />
    </div>
  );

  function ClearButton() {
    return (
      <div className="Handwriting--clear" role="img">
        <span
          role="img"
          aria-label="clear"
          onClick={() => ctx.clearRect(0, 0, width, height)}
        >
          ❌
        </span>
      </div>
    );
  }

  function RecognizeButton() {
    return <button onClick={onClick}>recognize</button>;

    function onClick() {
      Tesseract.recognize(canvas)
        .progress(message => console.error("progress", message))
        .catch(err => console.error("error", err))
        .then(result => console.error("result", result))
        .finally(resultOrError => console.error("finally", resultOrError));
    }
  }

  function onMouseDown(e) {
    setDrawing(true);
    const { x, y } = getCanvasPosition(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function onMouseMove(e) {
    if (drawing) {
      const { x, y } = getCanvasPosition(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  function onMouseUp(e) {
    if (drawing) {
      ctx.stroke();
      setDrawing(false);
    }
  }

  function getCanvasPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  }
}
