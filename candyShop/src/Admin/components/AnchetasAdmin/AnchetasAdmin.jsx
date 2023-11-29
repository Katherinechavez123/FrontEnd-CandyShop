import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import endPoints from "../../../services/api";
import Button from "../../../components/Atoms/Button/Button";
import { Link } from "react-router-dom";

const AnchetasAdmin = () => {
  const [anchetas, setAnchetas] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [anchetaToDelete, setAnchetaToDelete] = useState(null);

  useEffect(() => {
    axios
      .get(endPoints.admin.getAnchetas)
      .then((response) => {
        setAnchetas(response.data.products);
      })
      .catch((error) => {
        console.error("Error al obtener las anchetas", error);
        setError(
          "Error al obtener las anchetas. Inténtelo de nuevo más tarde."
        );
      });
  }, []);

  const handleDelete = (id_ancheta) => {
    setAnchetaToDelete(id_ancheta);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      // Realizar la solicitud DELETE para eliminar la ancheta.
      await axios.delete(endPoints.admin.deleteAncheta(anchetaToDelete));

      // Actualizar el estado después de la eliminación.
      setAnchetas(
        anchetas.filter((ancheta) => ancheta.id_ancheta !== anchetaToDelete)
      );

      // Ocultar el cuadro de diálogo de confirmación
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error al eliminar la ancheta", error);
      setError("Error al eliminar la ancheta. Inténtelo de nuevo más tarde.");
    }
  };

  const cancelDelete = () => {
    // Cancelar la eliminación y ocultar el cuadro de diálogo de confirmación
    setAnchetaToDelete(null);
    setShowConfirmation(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Lista de Anchetas</h2>
        <Link to="/NuevaAncheta">
          <Button text="Añadir Ancheta" />
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Valor</th>
            <th className="py-2 px-4 border-b">Imagen</th>
            <th className="py-2 px-4 border-b">Categoría</th>
            <th className="py-2 px-4 border-b">Cantidad en Inventario</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {anchetas.map((ancheta) => (
            <tr key={ancheta.id_ancheta} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">
                {ancheta.id_ancheta}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ancheta.nombre_ancheta}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ancheta.valor_ancheta}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={ancheta.url_imagen_ancheta}
                  alt={`Imagen de ${ancheta.nombre_ancheta}`}
                  className="mx-auto w-12 h-12 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ancheta.categoria}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ancheta.cantidad_inventario}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-blue-500 hover:underline mr-2"
                >
                  <FaEdit /> {/* Icono de editar */}
                </button>
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

      {/* Cuadro de diálogo de confirmación */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
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
