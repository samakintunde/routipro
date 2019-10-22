import React from "react";
import classNames from "classnames";

const ImageLoader = props => {
  const { src, loaded } = props;

  const classes = classNames({
    image: true,
    "image-loading": true,
    "image-loaded": loaded
  });

  const img = new ImageData();
  img.data;

  return <img className={classes} src={src} />;
};

export default ImageLoader;
