interface Props {
  mode: ModeUnion;
  color: string;
  size: string;
  onChangeSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BrushPanel: React.FC<Props> = (props) => {
  const { mode, color, size, onChangeSize } = props;
  return (
    <div
      className={`brushPanel ${mode === "BRUSH" ? "" : "hide"}`}
      id="brushPanel"
    >
      <label htmlFor="brushSize" className="brushSizeLabel">
        {" "}
        Size
      </label>
      <input
        type="range"
        className="brushSize"
        id="brushSize"
        value={size}
        min="1"
        max="80"
        onChange={onChangeSize}
      />
      <div className="brushSizePreviewContainer">
        <label
          htmlFor="brushSize"
          className="brushSizePreview"
          id="brushSizePreview"
          style={{
            width: size + "px",
            height: size + "px",
            backgroundColor: color,
          }}
        ></label>
      </div>
    </div>
  );
};

export default BrushPanel;
