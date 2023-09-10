import React from "react";
import "./menu.css";
import { BiCart, BiUser, BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

function Icons() {
  return (

          <div className="mt-20 text-2xl absolute iconos">
            
          <BiSearchAlt className="text-2xl text-pink-600  " />
          <Link to="/register">
          <BiUser className="text-2xl text-pink-600  "/>
          </Link>
          <BiCart className="text-lg text-pink-600 "/>
          </div>

  );
}

export default Icons;
