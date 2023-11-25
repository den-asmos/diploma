import { addOperation } from './addOperation';
import axios from 'axios';

export const addOperationAsync = (operation) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(operation);

    try {
      const res = await axios.post('/operations/', body, config);

      dispatch(addOperation(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
