import { ACTION_TYPES } from '../types';

export const deleteCategory = (data) => ({
  type: ACTION_TYPES.DELETE_CATEGORY,
  payload: data,
});
