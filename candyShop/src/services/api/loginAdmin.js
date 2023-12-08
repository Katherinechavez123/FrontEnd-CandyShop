import axios from 'axios';
import endPoints from './index';

const getLogin = async (body) => {
    const config = {
        headers: {
          accept: '*//*',
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(endPoints.admin.getLogin, body, config);
      console.log(response);
      return response.data;

};

export { postLogin}; 