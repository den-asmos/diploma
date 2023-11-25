import { ACTION_TYPES } from '../types';

export const updateCategory = (data) => ({
  type: ACTION_TYPES.UPDATE_CATEGORY,
  payload: data,
});
