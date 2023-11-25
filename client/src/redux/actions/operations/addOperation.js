import { ACTION_TYPES } from '../types';

export const addOperation = (data) => ({
  type: ACTION_TYPES.ADD_OPERATION,
  payload: data,
});
