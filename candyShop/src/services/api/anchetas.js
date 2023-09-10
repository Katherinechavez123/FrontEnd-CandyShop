import axios from 'axios';
import endPoints from './index';

const getAnchetas = async (body) => {
    const config = {
        headers: {
          accept: '*//*',
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(endPoints.anchetas.getAnchetas, body, config);
      return response.data;

};
  
export { getAnchetas }; 