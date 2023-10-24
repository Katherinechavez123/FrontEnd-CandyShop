import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import endPoints from "../../services/api";
import Button from "../Atoms/Button/Button";
import Title from "./Title";



const Productos = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [anchetas, setAnchetas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [filteredAnchetas, setFilteredAnchetas] = useState([]);
  

  async function getAnchetas() {
    try {
      const response = await axios.get(endPoints.anchetas.getAnchetas);
      if (Array.isArray(response.data.products)) {
        setAnchetas(response.data.products); // Acceder a la propiedad "products" en lugar de "response.data"
        const uniqueCategorias = [
          ...new Set(response.data.products.map((ancheta) => ancheta.categoria)),
        ];
        setCategorias(["Todo", ...uniqueCategorias]);
      } else {
        console.error("Los datos de la respuesta no son un array:", response.data);
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }
      
  useEffect(() => {
    getAnchetas();
  }, []);

  useEffect(() => {
    if (selectedCategory === "Todo") {
      setFilteredAnchetas(anchetas);
    } else {
      const filtered = anchetas.filter((ancheta) => ancheta.categoria === selectedCategory);
      console.log("filtered:", filtered); // Registra el array filtrado
      setFilteredAnchetas(filtered);
    }
  }, [selectedCategory, anchetas]);
  

  const onAddProduct = (ancheta) => {
    if (allProducts.find((item) => item.id_ancheta === ancheta.id_ancheta)) {
      const updatedProducts = allProducts.map((item) =>
        item.id_ancheta === ancheta.id_ancheta
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setAllProducts(updatedProducts);
      setTotal(total + ancheta.valor_ancheta);
      setCountProducts(countProducts + 1);
    } else {
      const newProduct = { ...ancheta, cantidad: 1 };
      setAllProducts([...allProducts, newProduct]);
      setTotal(total + ancheta.valor_ancheta);
      setCountProducts(countProducts + 1);
    }
  };

  return (
    <>
      <Title />
      <div className="bg-white">
        <ul className="flex justify-center">
          {categorias.map((categoria) => (
            <li key={categoria} className="mr-4">
              <button
                className={`category_item py-4 px-8 text-decoration-none rounded-full ${
                  selectedCategory === categoria ? "bg-pink-600 text-white" : "bg-fuchsia-950 text-white hover:bg-pink-600"
                }`}
                onClick={() => setSelectedCategory(categoria)}
              >
                {categoria}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex-row">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredAnchetas.map((ancheta) => (
            <div key={ancheta.id_ancheta} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Link to={`/detalle/${ancheta.id_ancheta}`} className="hover:underline">
                  <img
                    src={ancheta.url_imagen_ancheta}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    alt={ancheta.nombre_ancheta}
                  />
                </Link>
              </div>
              <div className="mt-4 flex justify-between">
                <h3 className="text-sm text-gray-700">
                  <span aria-hidden="true" className="inset-0" />
                  {ancheta.nombre_ancheta}
                </h3>
                <p className="text-sm font-medium text-gray-900">
                  ${ancheta.valor_ancheta}
                </p>
                <br />
              </div>
              <Link to={`/detalle/${ancheta.id_ancheta}`} className="hover:underline">
                Ver detalle
              </Link>
              <br />
              <br />
              <div className="text-center">
                <Button onClick={(e) => onAddProduct(ancheta)} text="Añadir al carrito" />
                <br /> <br />
              </div>
            </div>
          ))}
          

        </div>
      </div>
    </>
  );
};

export default Productos;
