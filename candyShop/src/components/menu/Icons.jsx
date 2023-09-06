import React from "react";
import "./menu.css";

import { BiCart, BiUser, BiSearchAlt } from "react-icons/bi";

function Icons() {
  return (

          <div className="mt-20 text-2xl absolute iconos">
            
          <BiSearchAlt className="text-2xl text-pink-600  " />
          <BiUser className="text-2xl text-pink-600  "/>
          <BiCart className="text-lg text-pink-600 "/>
          </div>

  );
}

export default Icons;
