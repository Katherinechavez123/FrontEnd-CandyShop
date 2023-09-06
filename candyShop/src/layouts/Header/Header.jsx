import React from "react";
import Nav from "../../components/menu/Nav";

import './Header.css';
import Logo from "../../components/menu/Logo";

export default function Header() {
  return (
    <>
    <div className=" flex justify-center header">
    <Logo/>
    <Nav />

    </div>

    </>
  );
}
