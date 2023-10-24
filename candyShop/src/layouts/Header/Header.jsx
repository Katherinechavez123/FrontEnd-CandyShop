import React from "react";
import Nav from "../../components/menu/Nav";
import './Header.css';
import Logo from "../../components/menu/Logo";

export default function Header({ allProducts, setAllProducts, countProducts }) {
  return (
    <header className="header-wrapper">
      <div className="flex justify-center header -mt-14">
        <Logo />
        <Nav allProducts={allProducts} setAllProducts={setAllProducts} countProducts={countProducts} />
      </div>
    </header>
  );
}
