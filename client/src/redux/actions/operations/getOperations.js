import { ACTION_TYPES } from '../types';

export const getOperations = (data) => ({
  type: ACTION_TYPES.GET_OPERATIONS,
  payload: data,
});
