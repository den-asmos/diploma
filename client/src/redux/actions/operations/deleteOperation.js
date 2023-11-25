import { ACTION_TYPES } from '../types';

export const deleteOperation = (data) => ({
  type: ACTION_TYPES.DELETE_OPERATION,
  payload: data,
});
