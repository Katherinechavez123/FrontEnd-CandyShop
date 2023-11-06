import axios from 'axios';
import endPoints from './index';

const postBuy = async (body) => {
    const config = {
        headers: {
          accept: '*//*',
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(endPoints.cliente.saveBuy, body, config);
      console.log(response);
      return response.data;

};

export { postBuy}; 