import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./Sales.css";

const API = import.meta.env.VITE_API_URL;

const Sales = () => {
  const [data, setData] = useState({
    predeterminadaAncheta: [],
    personalizadaAncheta: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/sales-admin`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (idVenta, newStatus) => {
    try {
      await axios.put(`${API}/sales-admin`, {
        id_venta_ancheta: idVenta,
        nuevo_estado: newStatus,
      });
      const response = await axios.get(`${API}/sales-admin`);
      setData(response.data);
    } catch (error) {
      console.error("Error al cambiar el estado del pedido", error);
    }
  };

  const handleExportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const predeterminadaSheet = XLSX.utils.json_to_sheet(
      data.predeterminadaAncheta
    );
    const personalizadaSheet = XLSX.utils.json_to_sheet(
      data.personalizadaAncheta
    );
    XLSX.utils.book_append_sheet(
      workbook,
      predeterminadaSheet,
      "Predeterminada"
    );
    XLSX.utils.book_append_sheet(workbook, personalizadaSheet, "Personalizada");
    XLSX.writeFile(workbook, "ventas.xlsx");
  };

  const getStatusColor = (estadoPedido) => {
    if (!estadoPedido) {
      return "black";
    }

    switch (estadoPedido.toLowerCase()) {
      case "pendiente":
        return "red";
      case "entregado":
        return "green";
      default:
        return "black";
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setFilteredData(
      filter === "all"
        ? [...data.predeterminadaAncheta, ...data.personalizadaAncheta]
        : filter === "predeterminada"
        ? data.predeterminadaAncheta
        : data.personalizadaAncheta
    );
  }, [data, filter]);

  const searchedData = filteredData.filter((venta) =>
    Object.values(venta).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
    <div className="sales-container">
      <div className="filter-section">
        <div className="filter">
          <label>Filtrar por:</label>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-full"
          >
            <option value="all">Todas</option>
            <option value="predeterminada">Predeterminadas</option>
            <option value="personalizada">Personalizadas</option>
          </select>
        </div>

      </div>
      <div className="export-section">
        <div className="export-button">
          <button
            onClick={handleExportToExcel}
            className="rounded-full"
          >
            Exportar a Excel
          </button>
        </div>
      </div>
      <table className="sales-table">
        <thead>
          <tr>
            <th className="text-fuchsia-950">ID Venta</th>
            <th className="text-fuchsia-950">Fecha</th>
            <th className="text-fuchsia-950">Valor</th>
            <th className="text-fuchsia-950">Dirección de Entrega</th>
            <th className="text-fuchsia-950">Fecha de Entrega</th>
            <th className="text-fuchsia-950">Estado del Pedido</th>
            <th className="text-fuchsia-950">Cliente</th>

            <th className="text-fuchsia-950">Tipo</th>
            <th className="text-fuchsia-950">ID Producto</th>
            <th className="text-fuchsia-950">Cantidad</th>
            <th className="text-fuchsia-950">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {searchedData.map((venta, index) => (
            <tr key={index}>
              <td>{venta.id_venta}</td>
              <td>{venta.fecha}</td>
              <td>${formatPrice(venta.valor)}</td>
              <td>{venta.direccion_entrega}</td>
              <td>{venta.fecha_entrega}</td>
              <td style={{ color: getStatusColor(venta.estado_pedido) }}>
                {venta.estado_pedido}
              </td>
              <td>{`${venta.nombre_cliente} ${venta.apellido_cliente}`}</td>
              <td>
                {venta.id_producto_predeterminado
                  ? "Predeterminada"
                  : "Personalizada"}
              </td>
              <td>
                {venta.id_producto_predeterminado ||
                  venta.id_producto_personalizado}
              </td>
              <td>
                {venta.cantidad_predeterminada || venta.cantidad_personalizada}
              </td>
              <td>
                {venta.estado_pedido &&
                  venta.estado_pedido.toLowerCase() === "pendiente" && (
                  <button
                    className="text-green-700"
                    onClick={() =>
                      handleStatusChange(venta.id_venta, "Entregado")
                    }
                  >
                    Marcar como Entregado
                  </button>
                )}
                {venta.estado_pedido &&
                  venta.estado_pedido.toLowerCase() === "entregado" && (
                  <button
                    className="text-red-600"
                    onClick={() =>
                      handleStatusChange(venta.id_venta, "Pendiente")
                    }
                  >
                    Marcar como Pendiente
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
