import ToolBar from "@/components/ToolBar";
import DrawingBoard from "@/components/DrawingBoard";
import BrushPanel from "@/components/BrushPanel";
import ImageNav from "@/components/ImageNav";
import useDrawing from "./hooks/useDrawing";

function App() {
  const {
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
    onClickEraser,
  } = useDrawing();

  return (
    <div className="container" id="container">
      <ToolBar
        mode={mode}
        color={color}
        onClickBrush={onClickBrush}
        onClickEraser={onClickEraser}
        onChangeColor={onChangeColor}
      />
      <DrawingBoard
        canvasEl={canvasEl}
        mode={mode}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
      <BrushPanel
        mode={mode}
        color={color}
        size={size}
        onChangeSize={onChangeSize}
      />
      <ImageNav />
    </div>
  );
}

export default App;
