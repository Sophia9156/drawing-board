import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEraser,
  faMap,
  faPaintBrush,
  faTrashAlt,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  mode: ModeUnion;
  isNavigatorShow: boolean;
  color: string;
  undoArray: string[];
  onClickBrush: () => void;
  onClickEraser: () => void;
  onClickNavigator: () => void;
  onClickUndo: () => void;
  onChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToolBar: React.FC<Props> = (props) => {
  const {
    mode,
    isNavigatorShow,
    color,
    undoArray,
    onClickBrush,
    onChangeColor,
    onClickNavigator,
    onClickUndo,
    onClickEraser,
  } = props;

  return (
    <div className="toolbar" id="toolbar">
      <div
        className={`tool brush ${mode === "BRUSH" ? "active" : ""}`}
        id="brush"
        onClick={onClickBrush}
      >
        <FontAwesomeIcon className="fas" icon={faPaintBrush} />
      </div>
      <div
        className={`tool eraser ${mode === "ERASER" ? "active" : ""}`}
        id="eraser"
        onClick={onClickEraser}
      >
        <FontAwesomeIcon className="fas" icon={faEraser} />
      </div>
      <div
        className={`tool nav ${isNavigatorShow ? "active" : ""}`}
        id="navigator"
        onClick={onClickNavigator}
      >
        <FontAwesomeIcon className="fas" icon={faMap} />
      </div>
      <div
        className={`tool undo ${undoArray.length < 1 ? "disabled" : ""}`}
        id="undo"
        onClick={onClickUndo}
      >
        <FontAwesomeIcon className="fas" icon={faUndo} />
      </div>
      <div className="tool clear" id="clear">
        <FontAwesomeIcon className="fas" icon={faTrashAlt} />
      </div>
      <div className="tool dl">
        <a id="download">
          <FontAwesomeIcon className="fas" icon={faDownload} />
        </a>
      </div>
      <input
        className="tool colorSelector"
        id="colorPicker"
        type="color"
        value={color}
        onChange={onChangeColor}
      />
    </div>
  );
};

export default ToolBar;
