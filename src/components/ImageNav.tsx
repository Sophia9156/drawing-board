interface Props {
  isNavigatorShow: boolean;
  navImage: string | null;
}

const ImageNav: React.FC<Props> = (props) => {
  const { isNavigatorShow, navImage } = props;

  return (
    <div className={`imgNav ${isNavigatorShow ? "" : "hide"}`} id="imgNav">
      {navImage ? (
        <img id="canvasImg" className="navImg" src={navImage} />
      ) : (
        <div className="navImg" />
      )}
    </div>
  );
};

export default ImageNav;
