import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import endPoints from "../../../services/api";
import Button from "../../../components/Atoms/Button/Button";
import { Link, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styled from "@emotion/styled";
const AnchetasAdmin = () => {
  const [anchetas, setAnchetas] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [anchetaToDelete, setAnchetaToDelete] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [filteredAnchetas, setFilteredAnchetas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endPoints.admin.getAnchetas);
        if (Array.isArray(response.data.products)) {
          setAnchetas(response.data.products);
          const uniqueCategorias = [
            ...new Set(response.data.products.map((ancheta) => ancheta.categoria)),
          ];
          setCategorias(["Todo", ...uniqueCategorias]);
        } else {
          console.error("Los datos de la respuesta no son un array:", response.data);
        }
      } catch (error) {
        console.error("Error al obtener las anchetas:", error);
        setError("Error al obtener las anchetas. Inténtelo de nuevo más tarde.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "Todo") {
      setFilteredAnchetas(anchetas);
    } else {
      const filtered = anchetas.filter((ancheta) => ancheta.categoria === selectedCategory);
      setFilteredAnchetas(filtered);
    }
  }, [selectedCategory, anchetas]);

  const handleDelete = async (id_ancheta) => {
    setAnchetaToDelete(id_ancheta);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API}/anchetas-admin/${anchetaToDelete}`);
      setAnchetas(anchetas.filter((ancheta) => ancheta.id_ancheta !== anchetaToDelete));
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error al eliminar la ancheta", error);
      setError("Error al eliminar la ancheta. Inténtelo de nuevo más tarde.");
    }
  };

  const cancelDelete = () => {
    setAnchetaToDelete(null);
    setShowConfirmation(false);
  };
  const formatPrice = (price) => {
    const numericValue = parseFloat(price);

    if (!isNaN(numericValue)) {
      const roundedPrice = Math.round(numericValue * 100) / 100;
      const parts = roundedPrice.toString().split(".");
      const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const formattedPrice =
        parts.length === 2 ? `${formattedInteger}.${parts[1]}` : formattedInteger;

      return formattedPrice;
    }

    return price;
  };
  return (
    
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-fuchsia-950">Lista de Anchetas</h2>
        <Link to="/NuevaAncheta">
          <Button text="Añadir Ancheta" />
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="mr-2 ">Filtrar por Categoría:</label>
        <select
        className="rounded-full"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-fuchsia-950">ID</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Nombre</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Valor</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Imagen</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Categoría</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Cantidad en Inventario</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnchetas.map((ancheta) => (
            <tr key={ancheta.id_ancheta} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{ancheta.id_ancheta}</td>
              <td className="py-2 px-4 border-b text-center">{ancheta.nombre_ancheta}</td>
              <td className="py-2 px-4 border-b text-center">${formatPrice(ancheta.valor_ancheta)}</td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={ancheta.url_imagen_ancheta}
                  alt={`Imagen de ${ancheta.nombre_ancheta}`}
                  className="mx-auto w-12 h-12 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">{ancheta.categoria}</td>
              <td className="py-2 px-4 border-b text-center">{ancheta.cantidad_inventario}</td>
              <td className="py-2 px-4 border-b text-center">
              <Link to={`/editar-ancheta/${ancheta.id_ancheta}`} className="text-blue-500 hover:underline mr-2">
                <button className="text-blue-500 hover:underline mr-2">
                  <FaEdit /> {/* Icono de editar */}
                </button>
                </Link>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(ancheta.id_ancheta)}
                >
                  <FaTrash /> {/* Icono de eliminar */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p>¿Estás seguro de que deseas eliminar esta ancheta?</p>
            <div className="flex justify-end mt-4">
              <button
                className="text-blue-500 hover:underline mr-2"
                onClick={confirmDelete}
              >
                Aceptar
              </button>
              <button
                className="text-gray-500 hover:underline"
                onClick={cancelDelete}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnchetasAdmin;
