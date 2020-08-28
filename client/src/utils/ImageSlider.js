import React from "react";
import { Carousel } from "antd";
function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index} style={{}}>
            <img
              style={{
                width: "100%",
                maxHeight: "100%",
              }}
              src={image}
              alt="productImage"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
