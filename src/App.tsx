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
  } = useDrawing();

  return (
    <div className="container" id="container">
      <ToolBar
        mode={mode}
        isNavigatorShow={isNavigatorShow}
        color={color}
        undoArray={undoArray}
        onClickBrush={onClickBrush}
        onClickEraser={onClickEraser}
        onClickNavigator={onClickNavigator}
        onClickUndo={onClickUndo}
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
      <ImageNav isNavigatorShow={isNavigatorShow} navImage={navImage} />
    </div>
  );
}

export default App;
