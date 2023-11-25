import { deleteOperation } from './deleteOperation';
import axios from 'axios';

export const deleteOperationAsync = (id) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.delete(`/operations/${id}/`, config);

      dispatch(deleteOperation(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
