import { useEffect, useRef, useState } from "react";
import { eraserColor, backgroundColor } from "@/constants";

const useDrawing = () => {
  const canvasEl = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<ModeUnion>("NONE");
  const [isMouseDown, setMouseDown] = useState(false);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("10");
  const [isNavigatorShow, setNavigatorShow] = useState(false);
  const [navImage, setNavImage] = useState<string | null>(null);

  const onClickBrush = () => {
    setMode(mode === "BRUSH" ? "NONE" : "BRUSH");
  };

  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const onChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
  };

  const initCanvasBackgroundColor = () => {
    const context = canvasEl.current?.getContext("2d");
    if (context && canvasEl.current) {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvasEl.current.width, canvasEl.current.height);
    }
  };

  const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const boundaries = canvasEl.current?.getBoundingClientRect();
    if (boundaries)
      return {
        x: e.clientX - boundaries.left,
        y: e.clientY - boundaries.top,
      };
  };

  const updateNavigator = () => {
    const image = canvasEl.current?.toDataURL();
    if (image) setNavImage(image);
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
      if (mode === "BRUSH") {
        context.strokeStyle = color;
        context.lineWidth = Number(size);
      } else if (mode === "ERASER") {
        context.strokeStyle = eraserColor;
        context.lineWidth = 50;
      }
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
    updateNavigator();
  };

  const onClickEraser = () => {
    setMode(mode === "ERASER" ? "NONE" : "ERASER");
  };

  const onClickNavigator = () => {
    setNavigatorShow(!isNavigatorShow);
  };

  useEffect(() => {
    initCanvasBackgroundColor();
  }, []);

  return {
    canvasEl,
    mode,
    color,
    size,
    isNavigatorShow,
    navImage,
    onClickBrush,
    onChangeColor,
    onChangeSize,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onClickEraser,
    onClickNavigator,
  };
};

export default useDrawing;
