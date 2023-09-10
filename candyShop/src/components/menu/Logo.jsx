import React from 'react';
import { Link } from 'react-router-dom';


function Logo() {
  return (
    <div>
      <Link to="/inicio" > 
      <img src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png" alt="Logo de mi aplicación" className=" h-20 mt-20 mr-10"/>
      </Link>
    </div>
  );
}

export default Logo;