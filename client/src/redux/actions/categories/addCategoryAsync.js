import { addCategory } from './addCategory';
import axios from 'axios';

export const addCategoryAsync = (category) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(category);

    try {
      const res = await axios.post('/categories/', body, config);

      dispatch(addCategory(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
