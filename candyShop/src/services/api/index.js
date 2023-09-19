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
        postBuy: (id_ancheta) => `${API}/buy-default/${id_ancheta}`
    }
  };
  
  export default endPoints;