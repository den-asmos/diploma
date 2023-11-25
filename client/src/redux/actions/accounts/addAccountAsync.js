import { addAccount } from './addAccount';
import axios from 'axios';

export const addAccountAsync = (account) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(account);

    try {
      const res = await axios.post('/accounts/', body, config);

      dispatch(addAccount(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
