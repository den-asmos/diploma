import { ACTION_TYPES } from '../types';

export const updateOperation = (data) => ({
  type: ACTION_TYPES.UPDATE_OPERATION,
  payload: data,
});
