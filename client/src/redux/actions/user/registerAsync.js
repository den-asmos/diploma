import { register } from './register';
import axios from 'axios';

export const registerAsync = (name, login, email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, login, email, password });

    const res = await axios.post('/register/', body, config);

    if (res.data.error) {
      throw new Error(res.data.error);
    }

    dispatch(register(res.data.user));

    return res.data.user;
  };
};
