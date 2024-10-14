interface Props {
  canvasEl: React.MutableRefObject<HTMLCanvasElement | null>;
  mode: ModeUnion;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
}

const DrawingBoard: React.FC<Props> = (props) => {
  const { canvasEl, mode, onMouseDown, onMouseMove, onMouseUp } = props;

  return (
    <canvas
      ref={canvasEl}
      className={`canvas ${mode === "BRUSH" ? "brush" : ""}`}
      id="canvas"
      width="900"
      height="800"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseUp}
    ></canvas>
  );
};

export default DrawingBoard;
