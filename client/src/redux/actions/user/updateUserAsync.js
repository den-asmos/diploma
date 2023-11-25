import { updateUser } from './updateUser';
import axios from 'axios';

export const updateUserAsync = (id, userData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(userData);

    try {
      const res = await axios.patch(`/user/${id}/`, body, config);

      dispatch(updateUser(res.data.user));
      return res.data.user;
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
