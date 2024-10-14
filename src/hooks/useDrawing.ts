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
  const [undoArray, setUndoArray] = useState<string[]>([]);

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

  const saveState = () => {
    if (canvasEl.current) {
      const newUrl = canvasEl.current.toDataURL();
      if (undoArray.length >= 5) {
        setUndoArray((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, ...rest] = prev;
          return [...rest, newUrl];
        });
      } else {
        setUndoArray((prev) => [...prev, newUrl]);
      }
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode === "NONE") return;

    saveState();

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
    if (isNavigatorShow) updateNavigator();
  };

  const onClickEraser = () => {
    setMode(mode === "ERASER" ? "NONE" : "ERASER");
  };

  const onClickNavigator = () => {
    if (!isNavigatorShow) updateNavigator();
    setNavigatorShow(!isNavigatorShow);
  };

  const onClickUndo = () => {
    if (undoArray.length === 0) return;

    const context = canvasEl.current?.getContext("2d");
    if (context) {
      const previousDataUrl = undoArray[undoArray.length - 1];
      const previousImage = new Image();
      previousImage.onload = () => {
        if (canvasEl.current) {
          context.clearRect(
            0,
            0,
            canvasEl.current.width,
            canvasEl.current.height
          );
          context.drawImage(
            previousImage,
            0,
            0,
            canvasEl.current.width,
            canvasEl.current.height,
            0,
            0,
            canvasEl.current.width,
            canvasEl.current.height
          );
        }
      };
      if (previousDataUrl) previousImage.src = previousDataUrl;
      setUndoArray((prev) => {
        return prev.filter((el, i) => i !== prev.length - 1);
      });
    }
  };

  useEffect(() => {
    initCanvasBackgroundColor();
  }, []);

  useEffect(() => {
    console.log(undoArray);
  }, [undoArray]);

  return {
    canvasEl,
    mode,
    color,
    size,
    isNavigatorShow,
    navImage,
    undoArray,
    onClickBrush,
    onChangeColor,
    onChangeSize,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onClickEraser,
    onClickNavigator,
    onClickUndo,
  };
};

export default useDrawing;
