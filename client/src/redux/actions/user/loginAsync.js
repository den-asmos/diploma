import { login } from './login';
import axios from 'axios';

export const loginAsync = (userLogin, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ userLogin, password });

    const res = await axios.post('/login/', body, config);

    if (res.data.error) {
      throw new Error(res.data.error);
    }

    dispatch(login(res.data.user));

    return res.data.user;
  };
};
