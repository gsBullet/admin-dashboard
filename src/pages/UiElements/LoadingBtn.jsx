import React from "react";
import { RotatingLines } from "react-loader-spinner";
const LoadingBtn = () => {
  return (
    
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="green"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
  );
};

export default LoadingBtn;
