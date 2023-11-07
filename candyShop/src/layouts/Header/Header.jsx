import React from "react";
import Nav from "../../components/menu/Nav";
import "./Header.css";
import Logo from "../../components/menu/Logo";

export default function Header({ allProducts, setAllProducts, countProducts, setCountProducts }) {
  return (
    <div className="justify-center header items-center header-wrapper pt-2 pb-2">
      <Logo />
      <Nav
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
    </div>
  );
}
