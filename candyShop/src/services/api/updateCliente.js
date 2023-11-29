import axios from 'axios';
import endPoints from './index';

const updateCliente = async (body) => {
    const config = {
        headers: {
          accept: '*//*',
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.put(endPoints.cliente.updateCliente, body, config);
      return response.data;

};
  
export { postRegister }; 