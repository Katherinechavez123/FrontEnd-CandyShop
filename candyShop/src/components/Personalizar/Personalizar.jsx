import React, { useEffect, useState } from "react";
import endPoints from "../../services/api";
import axios from "axios";
import Button from "../Atoms/Button/Button";

const Personalizar = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todo");

  async function getProductos() {
    try {
      const response = await axios.get(endPoints.productos.getProductos);
      setProductos(response.data);

      const uniqueCategorias = [
        ...new Set(response.data.map((producto) => producto.tipo_producto)),
      ];
      setCategorias(uniqueCategorias);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  useEffect(() => {
    getProductos();
  }, []);

  const onAddProduct = (producto) => {
    if (allProducts.find((item) => item.id_producto === producto.id_producto)) {
      const updatedProducts = allProducts.map((item) =>
        item.id_producto === producto.id_producto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setAllProducts(updatedProducts);
      setTotal(total + producto.precio);
      setCountProducts(countProducts + 1);
    } else {
      const newProduct = { ...producto, cantidad: 1 };
      setAllProducts([...allProducts, newProduct]);
      setTotal(total + producto.precio);
      setCountProducts(countProducts + 1);
    }
  };

  return (
    <div className="mt-20 ml-16 mr-16">
      <h1 className="text-3xl font-bold tracking-tight text-fuchsia-950 mb-6 text-center mt-40">
        Crea tu ancheta personalizada con todos los productos que quieras
      </h1>

      <div className="flex flex-wrap">
        <div className="w-1/4 pr-4">
          <div className="category_list">
            <a
              className={`category_item block py-4 mb-6 w-64  text-fuchsia-950 text-left text-decoration-none rounded-full font-semibold text-sm hover:text-pink-600 hover:text-xl border-spacing-1 border-gray-200 ${
                selectedCategory === "Todo" ? "text-pink-600" : ""
              }`}
              onClick={() => setSelectedCategory("Todo")}
            >
              TODO
            </a>
            {categorias.map((tipo_producto) => (
              <a
                key={tipo_producto}
                className={`category_item block w-64 py-4 mb-6 text-fuchsia-950 text-left text-decoration-none rounded-full font-semibold text-sm hover:text-pink-600 border-gray-200 border-spacing-1${
                  selectedCategory === tipo_producto ? "text-pink-600" : ""
                }`}
                onClick={() => setSelectedCategory(tipo_producto)}
              >
                {tipo_producto.toUpperCase()} {/* Convierte la categoría a mayúsculas */}
              </a>
            ))}
          </div>
        </div>

        <div className="w-3/4 flex flex-wrap">
          {productos.map((producto) => {
            if (
              selectedCategory === "Todo" ||
              producto.tipo_producto === selectedCategory
            ) {
              return (
                <div key={producto.id_producto} className="w-1/4 mb-4 px-2 mr-6">
                  <div className="p-4 shadow-md flex flex-col items-center">
                    <img
                      src={producto.url_imagen_producto}
                      alt={producto.nombre_producto}
                      className="w-40 h-40" // Tamaño fijo para las imágenes
                    />
                    <p className="block text-fuchsia-950 py-2 text-center text-decoration-none rounded-full font-normal">
                      {producto.nombre_producto}
                      <br />${producto.precio}
                    </p>
                    <Button
                      onClick={(e) => onAddProduct(producto)}
                      text="Añadir al carrito"
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};


export default Personalizar;
