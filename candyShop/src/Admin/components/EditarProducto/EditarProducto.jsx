// Importa las bibliotecas necesarias y los estilos
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Atoms/Button/Button";

const ModalError = ({ message, onClose }) => (
  <div className="modal modal-error">
    <div className="modal-content">
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  </div>
);

// ModalConfirm.jsx
const ModalConfirm = ({ message, onConfirm, onCancel }) => (
  <div className="modal modal-confirm">
    <div className="modal-content">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirmar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  </div>
);

const API = import.meta.env.VITE_API_URL;

// Define el componente EditarProducto
const EditarProducto = ({ onUpdateProduct, onCancel }) => {
  // Estado para almacenar los datos del producto
  const [nombre_producto, setNombre] = useState("");
  const [tipo_producto, setTipo] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad_productos_inventario, setCantidadInventario] = useState("");
  const [file, setFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [modalCancel, setModalCancel] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(null);
  // Estado para los mensajes de error
  const [errorMessages, setErrorMessages] = useState({
    nombre: "",
    tipo: "",
    precio: "",
    cantidad_productos_inventario: "",
    file: "",
  });

  // Obtén el ID del producto de los parámetros de la URL
  const { id } = useParams();

  // Objeto de navegación para redirigir después de la actualización
  const navigate = useNavigate();

  // En el useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/productos-admin/${id}`);
        const productData = response.data.product;

        setNombre(productData.nombre_producto || "");
        setTipo(productData.tipo_producto || "");
        setPrecio(productData.precio || "");
        setCantidadInventario(productData.cantidad_productos_inventario || "");
      } catch (error) {
        console.error("Error al cargar los datos del producto", error);
        // Maneja el error según tus necesidades
      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const validateFields = () => {
    const errors = {};
    if (!nombre_producto.trim()) {
      errors.nombre_producto = "El nombre es obligatorio.";
    }
    if (!tipo_producto.trim()) {
      errors.tipo_producto = "El tipo es obligatorio.";
    }
    if (!`${precio}`.trim()) {
      errors.precio = "El precio es obligatorio.";
    }
    
    if (!`${cantidad_productos_inventario}`.trim()) {
      errors.cantidad_productos_inventario = "La cantidad en inventario es obligatoria.";
    }
    if (!file) {
      errors.file = "La imagen es obligatoria.";
    }
    setErrorMessages(errors);
    return errors;
  };
  
  const handleUpdateClick = async () => {
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      const errorMessage = "Por favor, completa todos los campos.";
      setModalError(
        <ModalError message={errorMessage} onClose={() => setModalError(null)} />
      );
      return;
    }

    try {
      const formData = new FormData();

      if (file) {
        formData.append("url_imagen_producto", file);
      } else {
        const response = await axios.get(`${API}/productos-admin/${id}`);
        const productData = response.data.product;
        if (productData.url_imagen_producto) {
          formData.append(
            "url_imagen_producto",
            productData.url_imagen_producto
          );
        }
      }

      formData.append("nombre_producto", nombre_producto);
      formData.append("tipo_producto", tipo_producto);
      formData.append("precio", precio);
      formData.append(
        "cantidad_productos_inventario",
        cantidad_productos_inventario
      );

      const response = await axios.put(
        `${API}/productos-admin/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdateProduct && onUpdateProduct();

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/productos-admin");
      }, 2000);
    } catch (error) {
      const errorMessage =
        "Error al actualizar el producto. Inténtalo de nuevo.";
      setModalError(
        <ModalError message={errorMessage} onClose={() => setModalError(null)} />
      );
    }
  };

  const handleCancelClick = () => {
    const confirmationMessage = "¿Estás seguro que deseas cancelar?";
    setModalConfirm(
      <ModalConfirm
        message={confirmationMessage}
        onConfirm={() => {
          onCancel && onCancel();
          navigate("/productos-admin");
          setModalConfirm(null);
        }}
        onCancel={() => setModalConfirm(null)}
      />
    );
  };


  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Editar Producto</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="rounded-full"
                  placeholder="Nombre del producto"
                  value={nombre_producto}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errorMessages.nombre && (
                  <span className="error-message">{errorMessages.nombre}</span>
                )}
              </div>

              <div className="formInput">
                <label>Tipo:</label>
                <input
                  type="text"
                  className="rounded-full"
                  placeholder="Tipo del producto"
                  value={tipo_producto}
                  onChange={(e) => setTipo(e.target.value)}
                />
                {errorMessages.tipo && (
                  <span className="error-message">{errorMessages.tipo}</span>
                )}
              </div>

              <div className="formInput">
                <label>Precio:</label>
                <input
                  type="number"
                  className="rounded-full"
                  placeholder="Precio del producto"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
                {errorMessages.precio && (
                  <span className="error-message">{errorMessages.precio}</span>
                )}
              </div>

              <div className="formInput">
                <label>Cantidad en Inventario:</label>
                <input
                  type="number"
                  className="rounded-full"
                  placeholder="Cantidad en inventario"
                  value={cantidad_productos_inventario}
                  onChange={(e) =>
                    setCantidadInventario(e.target.value)
                  }
                />
                {errorMessages.cantidad_productos_inventario && (
                  <span className="error-message">
                    {errorMessages.cantidad_productos_inventario}
                  </span>
                )}
              </div>

              <div className="formInput">
                <label>Imagen:</label>
                <input
                  className="rounded-full"
                  type="file"
                  name="url_imagen_producto"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {errorMessages.file && (
                  <span className="error-message">{errorMessages.file}</span>
                )}
              </div>

              <Button
                type="button"
                onClick={handleUpdateClick}
                text={"Actualizar"}
              ></Button>

              <Button
                type="button"
                onClick={handleCancelClick}
                text={"Cancelar"}
              ></Button>
            </form>
          </div>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="modal-container">
          <div className="modal">
            <img
              src="http://localhost:10101/img/newProductoPersonalizado-1702394377617.png"
              alt="exito"
            />
            <p>¡Producto Actualizado!</p>
          </div>
        </div>
      )}
      {modalError}
      {modalConfirm}
    </div>
  );
};

export default EditarProducto;
