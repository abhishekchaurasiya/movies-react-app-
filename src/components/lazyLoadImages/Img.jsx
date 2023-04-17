import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


//  Here create a custom image component 
const Img = ({ src, className }) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt=""
            effect="blur"  // here two effects hote hai blur and opacity
            src={src}
        />
    );
};

export default Img;