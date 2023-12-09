import "./New.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Atoms/Button/Button";

const API = import.meta.env.VITE_API_URL;

const NewProducto = ({ onAddProducto, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [urlImagen, setUrlImagen] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidadInventario, setCantidadInventario] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);
    setFile(selectedFile);
  };

  const handleAddClick = async () => {
    try {
      const formData = new FormData();

      formData.append("url_imagen_producto", file);
      formData.append("nombre_producto", nombre);
      formData.append("tipo_producto", tipo);
      formData.append("precio", precio);
      formData.append("cantidad_productos_inventario", cantidadInventario);

      console.log("Form Data:", formData);

      const response = await axios.post(`${API}/productos-admin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Verifica que response.data.imageUrl proporcione la URL de la imagen correctamente
      const responseImageUrl = response.data.imageUrl;

      onAddProducto && onAddProducto();

      navigate("/productos-admin");
    } catch (error) {
      console.error("Error al agregar el producto", error);
      // Muestra un mensaje de error al usuario o realiza alguna acción específica
    }
  };

  const handleCancelClick = () => {
    const isConfirmed = window.confirm("¿Estás seguro que deseas cancelar?");

    if (isConfirmed) {
      onCancel && onCancel();
      navigate("/productos-admin");
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Añadir Nuevo Producto</h1>
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
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Tipo:</label>
                <input
                  type="text"
                  className="rounded-full"
                  placeholder="Tipo del producto"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
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
              </div>

              <div className="formInput">
                <label>Cantidad en Inventario:</label>
                <input
                  type="number"
                  className="rounded-full"
                  placeholder="Cantidad en inventario"
                  value={cantidadInventario}
                  onChange={(e) => setCantidadInventario(e.target.value)}
                />
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
              </div>

              <Button
                type="button"
                onClick={handleAddClick}
                text={"Añadir Producto"}
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
    </div>
  );
};

export default NewProducto;
