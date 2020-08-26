import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { DEFAULT_PROFILE } from "../../../Components/Config";

function ProductImage(props) {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images.forEach(item => {
        images.push({
          original: item,
          thumbnail: item,
        });
      });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
