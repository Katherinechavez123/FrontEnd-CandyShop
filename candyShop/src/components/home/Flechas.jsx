import React from "react";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <div className="arrow-right w-12 h-12 bg-white border border-black rounded-full flex items-center justify-center cursor-pointer transition duration-300 hover:bg-fuchsia-950">
        <div className="w-4 h-4 border-t-2 border-r-2 transform rotate-45 -mt-px ml-px"></div>
      </div>
    </div>
  );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <div className="arrow-left w-12 h-12 bg-white border border-black rounded-full flex items-center justify-center cursor-pointer transition duration-300 hover:bg-fuchsia-950">
          <div className="w-4 h-4 border-t-2 border-r-2 transform -rotate-45 -mt-px ml-1px"></div>
        </div>
      </div>
    );
  };
  
export { NextArrow, PrevArrow };
