import { deleteCategory } from './deleteCategory';
import axios from 'axios';

export const deleteCategoryAsync = (id) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.delete(`/categories/${id}/`, config);

      dispatch(deleteCategory(res.data.data));
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
};
