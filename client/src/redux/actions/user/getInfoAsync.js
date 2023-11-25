import { getInfo } from './getInfo';
import axios from 'axios';

export const getInfoAsync = (id) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get(`/user/${id}`, config);

      dispatch(getInfo(res.data.data));

      return res.data.data;
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
