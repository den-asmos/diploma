import { getOperationById } from './getOperationById';
import axios from 'axios';

export const getOperationByIdAsync = (id) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get(`/operations/${id}/`, config);

      dispatch(getOperationById(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
