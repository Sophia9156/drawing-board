import { useEffect, useRef, useState, useCallback } from "react";
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
  const [downloadImage, setDownloadImage] = useState("");

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
      context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
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
    const navImage = canvasEl.current?.toDataURL();
    if (navImage) setNavImage(navImage);

    const downloadImage = canvasEl.current?.toDataURL("image/jpeg", 1);
    if (downloadImage) setDownloadImage(downloadImage);
  };

  const saveState = useCallback(() => {
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
  }, [undoArray.length]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
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
    },
    [color, mode, saveState, size]
  );

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

  const onClickUndo = useCallback(() => {
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
          updateNavigator();
        }
      };
      if (previousDataUrl) previousImage.src = previousDataUrl;
      setUndoArray((prev) => {
        return prev.filter((el, i) => i !== prev.length - 1);
      });
    }
  }, [undoArray]);

  const onClickClear = useCallback(() => {
    setUndoArray([]);
    initCanvasBackgroundColor();
    updateNavigator();
  }, []);

  useEffect(() => {
    initCanvasBackgroundColor();
    updateNavigator();
  }, []);

  return {
    canvasEl,
    mode,
    color,
    size,
    isNavigatorShow,
    navImage,
    undoArray,
    downloadImage,
    onClickBrush,
    onChangeColor,
    onChangeSize,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onClickEraser,
    onClickNavigator,
    onClickUndo,
    onClickClear,
  };
};

export default useDrawing;
