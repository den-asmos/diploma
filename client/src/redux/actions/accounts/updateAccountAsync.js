import { updateAccount } from './updateAccount';
import axios from 'axios';

export const updateAccountAsync = (id, accountData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(accountData);

    try {
      const res = await axios.patch(`/accounts/${id}/`, body, config);

      dispatch(updateAccount(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
