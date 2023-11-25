import { ACTION_TYPES } from '../types';

export const addCategory = (data) => ({
  type: ACTION_TYPES.ADD_CATEGORY,
  payload: data,
});
