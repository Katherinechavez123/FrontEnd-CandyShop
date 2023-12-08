import React, { useState, useEffect } from 'react';
import axios from 'axios';
import endPoints from '../../../services/api';
import Button from '../../../components/Atoms/Button/Button';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL;

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [productoIdToDelete, setProductoIdToDelete] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('Todos'); // Inicialmente mostramos todos las categorías
  const [filteredProductos, setFilteredProductos] = useState([]);

  useEffect(() => {
    // Obtener categorías de productos para el filtro
    const fetchData = async () => {
      try {
        const response = await axios.get(endPoints.admin.getProductos);
        if (Array.isArray(response.data.products)) {
          setProductos(response.data.products);
          const uniqueCategorias = [
            ...new Set(response.data.products.map((producto) => producto.tipo_producto)),
          ];
          setCategorias(['Todos', ...uniqueCategorias]); // Agregamos 'Todos' como opción
        } else {
          console.error('Los datos de la respuesta no son un array:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setError('Error al obtener los productos. Inténtelo de nuevo más tarde.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar productos por categoría seleccionada
    if (selectedCategoria === 'Todos') {
      setFilteredProductos(productos);
    } else {
      const filtered = productos.filter((producto) => producto.tipo_producto === selectedCategoria);
      setFilteredProductos(filtered);
    }
  }, [selectedCategoria, productos]);

  const handleEdit = async (id_producto) => {
    // Lógica para editar el producto
    // ...
  };

  const showDeleteConfirmation = (id_producto) => {
    setConfirmDelete(true);
    setProductoIdToDelete(id_producto);
  };

  const hideDeleteConfirmation = () => {
    setConfirmDelete(false);
    setProductoIdToDelete(null);
  };

  const handleDelete = async () => {
    try {
      console.log(`Eliminando producto con ID: ${productoIdToDelete}`);
      if (productoIdToDelete) {
        await axios.delete(`${API}/productos-admin/${productoIdToDelete}`);
        const updatedProducts = await axios.get(endPoints.admin.getProductos);
        setProductos(updatedProducts.data.products);
        hideDeleteConfirmation();
      }
    } catch (error) {
      console.error('Error al eliminar el producto', error);
      setError('Error al eliminar el producto. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-fuchsia-950">Lista de Productos</h2>
        <Link to="/NuevoProducto">
          <Button text="Añadir Producto" />
        </Link>
      </div>

      <div className="mb-4">
        <label className="mr-2">Filtrar por Categoría:</label>
        <select
        className='rounded-full'
          value={selectedCategoria}
          onChange={(e) => setSelectedCategoria(e.target.value)}
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
            <th className="py-2 px-4 border-b text-fuchsia-950">Categoría</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Imagen</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Precio</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Cantidad en Inventario</th>
            <th className="py-2 px-4 border-b text-fuchsia-950">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.map((producto) => (
            <tr key={producto.id_producto} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{producto.id_producto}</td>
              <td className="py-2 px-4 border-b text-center">{producto.nombre_producto}</td>
              <td className="py-2 px-4 border-b text-center">{producto.tipo_producto}</td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={producto.url_imagen_producto}
                  alt={`Imagen de ${producto.nombre_producto}`}
                  className="w-12 h-12 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">{producto.precio}</td>
              <td className="py-2 px-4 border-b text-center">{producto.cantidad_productos_inventario}</td>
              <td className="py-2 px-4 border-b text-center">
                <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(producto.id_producto)}>
                  <FaEdit /> {/* Icono de editar */}
                </button>
                <button className="text-red-500 hover:underline" onClick={() => showDeleteConfirmation(producto.id_producto)}>
                  <FaTrash /> {/* Icono de eliminar */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-4 shadow-md rounded-md">
            <p>¿Estás seguro de eliminar este producto?</p>
            <div className="mt-4 flex justify-end">
              <button className="text-blue-500 hover:underline mr-4" onClick={hideDeleteConfirmation}>
                Cancelar
              </button>
              <button className="text-red-500 hover:underline" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosAdmin;
