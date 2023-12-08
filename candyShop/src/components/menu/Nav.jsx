import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./menu.css";
import { BiSearchAlt, BiUser, BiCart } from "react-icons/bi";
import Button from "../Atoms/Button/Button";

export const Nav = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const total = allProducts.reduce((accumulator, product) => {
    return accumulator + (product.valor_ancheta * product.cantidad || product.precio * product.cantidad);
  }, 0);
  
  const handleSearch = () => {
    console.log("Buscando: " + searchTerm);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  

  const onCleanCart = () => {
    setAllProducts([]);
    setCountProducts(0);
  
    // Limpia el carrito en localStorage
    localStorage.removeItem("cart");
  };
  
  const onDeleteProduct = (itemToDelete) => {
    const updatedProducts = allProducts.filter((product) =>
      product.id_ancheta !== itemToDelete.id_ancheta ||
      product.id_producto !== itemToDelete.id_producto
    );
    setAllProducts(updatedProducts);

    const newCountProducts = updatedProducts.reduce(
      (total, ancheta, producto) => total + ancheta.cantidad || total + producto.cantidad,
      0
    );

    setCountProducts(newCountProducts);

    // Actualiza el carrito en localStorage después de eliminar un producto
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  // Recupera los productos del carrito desde localStorage al cargar el componente
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      setAllProducts(parsedCart);
      setCountProducts(
        parsedCart.reduce(
          (total, product) =>
            total + (product.cantidad || product.valor_ancheta),
          0
        )
      );
    }
  }, []);
  

  return (
    <>
      <nav className="flex flex-wrap justify-center md:space-x-8 text-lg">
        <Link
          to="/"
          className="font-bold px-3 py-2 text-fuchsia-950 hover:text-pink-600"
        >
          Inicio
        </Link>
        <Link
          to="/catalogo"
          className="font-bold px-3 py-2 text-fuchsia-950 hover:text-pink-600"
        >
          Catálogo
        </Link>
        <Link
          to="/personalizar"
          className="font-bold px-3 py-2 text-fuchsia-950 hover:text-pink-600"
        >
          Personalizar
        </Link>
        <Link
          to="/nosotros"
          className="font-bold px-3 py-2 text-fuchsia-950 hover:text-pink-600"
        >
          Nosotros
        </Link>
        <Link
          to="/contacto"
          className="font-bold px-3 py-2 text-fuchsia-950 hover:text-pink-600"
        >
          Contacto
        </Link>
        {!isLoggedIn && (
          <li style={{ listStyleType: "none" }}>
            <Link
              to="/login"
              className="font-bold px-3 py-2 text-fuchsia-950 hover:text-pink-600"
            >
              <BiUser className="text-3xl text-pink-600 hover:text-cyan-400 hover:text-5xl" />
            </Link>
          </li>
        )}

        {isLoggedIn && (
  <div className="relative group">
    <span
      className="font-bold px-3 py-2 text-fuchsia-950 cursor-pointer hover:text-pink-600"
    >
      {localStorage.getItem("correo_cliente")}
    </span>
    <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible user-menu absolute right-0 bg-white border border-gray-200 shadow-md p-4 min-w-72 z-50 ">
      <Link to="/perfil" className="block">
        <span className="font-bold px-4 py-2 text-fuchsia-950 hover:text-pink-600">
          Perfil
        </span>
      </Link>
      <Link to="/misCompras" className="block">
        <span className="font-bold px-4 py-2 text-fuchsia-950 hover:text-pink-600">
          Mis compras
        </span>
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full px-4 py-2 text-left text-fuchsia-950 font-bold hover:text-pink-600"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
)}

<div>
          {isSearchOpen ? (
            // Muestra el campo de búsqueda si isSearchOpen es verdadero
            <div>
              <input
                type="text"
                placeholder="Buscar productos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-full focus-visible:from-fuchsia-950"
              />
              <button onClick={handleSearch}>
                <BiSearchAlt className="text-3xl text-pink-600" />
              </button>
            </div>
          ) : (
            // Muestra solo el icono de búsqueda y activa el campo de búsqueda al hacer clic
            <button onClick={toggleSearch}>
              <BiSearchAlt className="text-3xl text-pink-600" />
            </button>
          )}
        </div>
        <div className="relative" style={{ display: "inline-block" }}>
          <BiCart
            className={`text-3xl text-pink-600 cursor-pointer`}
            onClick={() => setIsCartOpen(!isCartOpen)}
          />
          {countProducts > 0 && (
            <span className="bg-cyan-300 text-black rounded-full px-2 py-1 text-sm absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              {countProducts}
            </span>
          )}
          {isCartOpen && (
            <div
            className="cart-dropdown bg-white border border-gray-200 shadow-md p-4 min-w-72 z-50 absolute top-16 right-0 pr-20"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >{allProducts.length ? (
                <div className="row-product">
                  {allProducts.map((product) => (
                    <div className="cart-product" key={product.id_ancheta || product.id_producto}>
                      {/* Renderiza los detalles del producto */}
                      <div className="info-cart-product flex items-center mb-2">
                        <span className="cantidad-producto-carrito mr-2 font-bold">
                          {product.cantidad || product.cantidad}
                        </span>
                        <img
                          src={product.url_imagen_ancheta || product.url_imagen_producto}
                          alt={product.nombre_ancheta || product.nombre_producto}
                          className="w-12 h-12"
                        />
                        <p className="titulo-producto-carrito flex-1 ml-2">
                          {product.nombre_ancheta || product.nombre_producto}
                        </p>
                        <span className="precio-producto-carrito font-bold">
                          ${product.valor_ancheta || product.precio}
                        </span>
                        <button
                          onClick={() => onDeleteProduct(product)}
                          className="ml-2 text-red-600 cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="cart-total flex justify-between mt-4">
                    <h3 className="font-bold">Total:</h3>
                    <span className="font-bold text-green-600">${total}</span>
                  </div>
                  <div>
                    <a
                      onClick={onCleanCart}
                      className="cursor-pointer text-red-600 font-bold mb-5"
                    >
                      Vaciar Carrito
                    </a>
                    <Link
                      to={{
                        pathname: "/precompra",
                        state: {allProducts },
                      }}
                    >
                      <Button text="Comprar" />
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-center font-bold mt-2">
                  El carrito está vacío
                </p>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
