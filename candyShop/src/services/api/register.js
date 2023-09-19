import axios from 'axios';
import endPoints from './index';

const postRegister = async (body) => {
    const config = {
        headers: {
          accept: '*//*',
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(endPoints.cliente.postRegister, body, config);
      return response.data;

};
  
export { postRegister }; 