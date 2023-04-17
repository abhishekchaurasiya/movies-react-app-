import React from 'react'
import "./ContentWrapper.scss"

// repeated code se bachane ke liye content wrapper component create kiya
// all content ke left and right side me space create karne liye 

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
}

export default ContentWrapper;
