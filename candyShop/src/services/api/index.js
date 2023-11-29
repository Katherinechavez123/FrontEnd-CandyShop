const API = import.meta.env.VITE_API_URL;


const endPoints = {
    anchetas: {
        getAnchetas: `${API}/products`,
        getAncheta: (id_ancheta) => `${API}/products/${id_ancheta}`,

    },
    cliente:{
        postRegister:`${API}/register`,
        getLogin:`${API}/auth`,
        updateCliente:`${API}/register`

    },
    buy:{
        postBuy:`${API}/buy-default`
        },
    productos:{
        getProductos:`${API}/personalize`,
        getProducto: (id_producto) => `${API}/personalize/${id_producto}`
    },
    buyPersonalize:{
        postBuy:`${API}/buyPersonalized`
    },
    admin:{
        getLogin:`${API}/auth_admin`,
        getAnchetas:`${API}/anchetas-admin`,
        editAncheta:(id_ancheta) => `${API}/anchetas-admin`,
        deleteAncheta:(id_ancheta) => `${API}/anchetas-admin`,
        getProductos: `${API}/productos-admin`,
        insertAncheta: `${API}/anchetas-admin`,
        editProducto:(id_producto) => `${API}/productos-admin`,
        deleteProducto:(id_producto) => `${API}/productos-admin`
    }
  };
  
  
  export default endPoints;