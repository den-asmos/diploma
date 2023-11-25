import { deleteAccount } from './deleteAccount';
import axios from 'axios';

export const deleteAccountAsync = (id) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.delete(`/accounts/${id}/`, config);

      dispatch(deleteAccount(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
