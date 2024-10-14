import { useRef, useState } from "react";

const useDrawing = () => {
  const canvasEl = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<ModeUnion>("NONE");
  const [isMouseDown, setMouseDown] = useState(false);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("10");

  const onClickBrush = () => {
    setMode(mode === "BRUSH" ? "NONE" : "BRUSH");
  };

  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const onChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
  };

  const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const boundaries = canvasEl.current?.getBoundingClientRect();
    if (boundaries)
      return {
        x: e.clientX - boundaries.left,
        y: e.clientY - boundaries.top,
      };
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode === "NONE") return;

    const context = canvasEl.current?.getContext("2d");
    const currentPosition = getMousePosition(e);
    if (context && currentPosition) {
      setMouseDown(true);
      context.beginPath();
      context.moveTo(currentPosition.x, currentPosition.y);
      context.lineCap = "round";
      context.strokeStyle = color;
      context.lineWidth = Number(size);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown) return;

    const context = canvasEl.current?.getContext("2d");
    const currentPosition = getMousePosition(e);
    if (context && currentPosition) {
      context.lineTo(currentPosition.x, currentPosition.y);
      context.stroke();
    }
  };

  const onMouseUp = () => {
    if (mode === "NONE") return;
    setMouseDown(false);
  };

  return {
    canvasEl,
    mode,
    color,
    size,
    onClickBrush,
    onChangeColor,
    onChangeSize,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export default useDrawing;
