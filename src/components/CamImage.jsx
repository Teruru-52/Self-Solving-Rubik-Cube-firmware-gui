// image test
import image1 from "../assets/github.png";
import image2 from "../assets/github.png";
import image3 from "../assets/github.png";
import image4 from "../assets/github.png";

function ImageRow() {
  return (
    <div className="image-row">
      <div className="image-container">
        <div className="image-label">Cam 1</div>
        <img src={image1} alt="Image 1" className="image-item" />
      </div>
      <div className="image-container">
        <div className="image-label">Cam 2</div>
        <img src={image2} alt="Image 2" className="image-item" />
      </div>
      <div className="image-container">
        <div className="image-label">Cam 3</div>
        <img src={image3} alt="Image 3" className="image-item" />
      </div>
      <div className="image-container">
        <div className="image-label">Cam 4</div>
        <img src={image4} alt="Image 4" className="image-item" />
      </div>
    </div>
  );
}

export default ImageRow;
