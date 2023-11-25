import { updateOperation } from './updateOperation';
import axios from 'axios';

export const updateOperationAsync = (id, operationData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(operationData);

    try {
      const res = await axios.patch(`/operations/${id}/`, body, config);

      dispatch(updateOperation(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
