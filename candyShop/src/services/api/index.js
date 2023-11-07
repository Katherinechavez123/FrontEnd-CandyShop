const API = import.meta.env.VITE_API_URL;


const endPoints = {
    anchetas: {
        getAnchetas: `${API}/products`,
        getAncheta: (id_ancheta) => `${API}/products/${id_ancheta}`,

    },
    cliente:{
        postRegister:`${API}/register`,
        getLogin:`${API}/auth`

    },
    buy:{
        postBuy:`${API}/buy-default`
        },
    productos:{
        getProductos:`${API}/personalize`,
        getProducto: (id_producto) => `${API}/personalize/${id_producto}`
    }
  };
  
  
  export default endPoints;