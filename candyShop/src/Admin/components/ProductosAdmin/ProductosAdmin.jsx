import React, { useState, useEffect } from 'react';
import axios from 'axios';
import endPoints from '../../../services/api';
import Button from '../../../components/Atoms/Button/Button';
import { Link } from 'react-router-dom';

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(endPoints.admin.getProductos)
      .then(response => {
        setProductos(response.data.productos);
      })
      .catch(error => {
        console.error('Error al obtener los productos', error);
        setError('Error al obtener los productos. Inténtelo de nuevo más tarde.');
      });
  }, []);

  const handleEdit = async (id_producto) => {
    try {
      // Lógica para obtener los datos actualizados del producto (puedes usar un formulario de edición).
      const updatedData = {}; // Reemplaza esto con los datos actualizados.

      // Realizar la solicitud PUT con los datos actualizados.
      await axios.put(endPoints.admin.editProducto(id_producto), updatedData);

      // Actualizar el estado después de la edición (si es necesario).
      // Puedes hacer una nueva solicitud GET para obtener la lista actualizada o actualizar directamente el estado.
    } catch (error) {
      console.error('Error al editar el producto', error);
      setError('Error al editar el producto. Inténtelo de nuevo más tarde.');
    }
  };

  const deleteProducto = async (id_producto) => {
    try {
      // Realizar la solicitud DELETE para eliminar el producto.
      const response = await axios.delete(`${endPoints.admin.deleteProducto}/${id_producto}`);
      console.log('Respuesta del servidor:', response.data);
      
      // Actualizar el estado después de la eliminación.
      setProductos(productos.filter((producto) => producto.id_producto !== id_producto));
    } catch (error) {
      console.error('Error al eliminar el producto', error);
      setError('Error al eliminar el producto. Inténtelo de nuevo más tarde.');
    }
  };
  
  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Lista de Productos</h2>
        <Link to="/NuevoProducto">
          <Button text="Añadir Producto" />
        </Link>
      </div>

     
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Imagen</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Cantidad en Inventario</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{producto.id_producto}</td>
              <td className="py-2 px-4 border-b">{producto.nombre_producto}</td>
              <td className="py-2 px-4 border-b">{producto.tipo_producto}</td>
              <td className="py-2 px-4 border-b">
                <img src={producto.url_imagen_producto} alt={`Imagen de ${producto.nombre_producto}`} className="w-12 h-12 object-cover" />
              </td>
              <td className="py-2 px-4 border-b">{producto.precio}</td>
              <td className="py-2 px-4 border-b">{producto.cantidad_productos_inventario}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(producto.id_producto)}>
                  Editar
                </button>
                <button className="text-red-500 hover:underline" onClick={() => handleDelete(producto.id_producto)}>
                  Eliminar
                </button>
                
              </td>

            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosAdmin;
