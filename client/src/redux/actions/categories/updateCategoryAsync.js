import { updateCategory } from './updateCategory';
import axios from 'axios';

export const updateCategoryAsync = (id, categoryData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(categoryData);

    try {
      const res = await axios.patch(`/categories/${id}/`, body, config);

      dispatch(updateCategory(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
