import { getOperations } from './getOperations';
import axios from 'axios';

export const getOperationsAsync = (limit = 10, page = 1) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get(
        `/operations?limit=${limit}&page=${page}`,
        config
      );

      dispatch(getOperations(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
