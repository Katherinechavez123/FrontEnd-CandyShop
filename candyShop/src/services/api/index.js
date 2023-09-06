const API = "http://localhost:10101";


const endPoints = {
    anchetas: {
        getAnchetas: `${API}/products`,
        getAncheta: (id_ancheta) => `${API}/products/${id_ancheta}/`,
    },
    
  };
  
  export default endPoints;