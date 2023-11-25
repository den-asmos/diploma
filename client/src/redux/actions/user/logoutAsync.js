import { logout } from './logout';
import axios from 'axios';

export const logoutAsync = () => {
  return async (dispatch) => {
    await axios.post('/logout/');
    dispatch(logout());
  };
};
