import { useParams, Link } from "react-router-dom";
import Button from "../Atoms/Button/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import endPoints from "../../services/api";
import "./VerDetalle.css";

const VerDetalle = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const { id_ancheta } = useParams();
  const [ancheta, setAncheta] = useState(null);

  const onAddProduct = async (anchetaId) => {
    try {
      const response = await axios.get(
        endPoints.anchetas.getAncheta(anchetaId)
      );
      const newAncheta = response.data.getProductById[0];

      const existingProduct = allProducts.find(
        (item) => item.id_ancheta === newAncheta.id_ancheta
      );

      let updatedProducts;

      if (existingProduct) {
        updatedProducts = allProducts.map((item) =>
          item.id_ancheta === newAncheta.id_ancheta
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        updatedProducts = [...allProducts, { ...newAncheta, cantidad: 1 }];
      }

      setAllProducts(updatedProducts);
      localStorage.setItem("cart", JSON.stringify(updatedProducts));
      setTotal(total + newAncheta.valor_ancheta);
      setCountProducts(countProducts + 1);
    } catch (error) {
      console.error("Error al obtener los detalles de la ancheta:", error);
    }
  };

  useEffect(() => {
    async function fetchAncheta() {
      try {
        const response = await axios.get(
          endPoints.anchetas.getAncheta(id_ancheta)
        );

        console.log("API Response:", response.data);
        setAncheta(response.data.getProductById[0]);
      } catch (error) {
        console.error("Error al obtener los detalles de la ancheta:", error);
      }
    }

    fetchAncheta();
  }, [id_ancheta]);

  if (ancheta === null) {
    return <div>Cargando...</div>;
  }

  // Función para formatear el precio
  const formatPrice = (price) => {
    if (typeof price === "string") {
      const numericValue = parseFloat(price.replace(/[^\d.-]/g, ""));
      if (!isNaN(numericValue)) {
        return numericValue.toLocaleString("es-ES");
      }
    } else if (typeof price === "number") {
      return price.toLocaleString("es-ES");
    }

    return price;
  };

  return (
    <div className="bg-white">
      <div className="pt-6 mt-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-8 py-10">
          <div className="hidden lg:block overflow-hidden rounded-lg">
            <img
              src={ancheta.url_imagen_ancheta}
              className="mx-auto my-auto w-96 h-auto"
              alt="Imagen de la ancheta"
            />
          </div>
          {/* Columna de los detalles */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-pink-600 mb-4">
              {ancheta.nombre_ancheta}
            </h1>

            <p className="text-base text-fuchsia-950 mb-4">
              {ancheta.detalle_ancheta}
            </p>

            <p className="text-3xl tracking-tight text-fuchsia-950 mb-4">
              ${formatPrice(ancheta.valor_ancheta)}
            </p>

            <Button
              onClick={(e) => onAddProduct(id_ancheta)}
              text="Añadir al carrito"
            />

            {/* Enlace de vuelta al catálogo */}
            <nav
              aria-label="Breadcrumb"
              className="items-start justify-start text-left"
            >
              <Link
                to="/catalogo"
                className="text-pink-600 hover:text-cyan-400 mt-8 text-xl underline items-start justify-start text-left"
              >
                Volver al catálogo
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerDetalle;
