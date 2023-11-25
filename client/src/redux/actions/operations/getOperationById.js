import { ACTION_TYPES } from '../types';

export const getOperationById = (data) => ({
  type: ACTION_TYPES.GET_OPERATION_BY_ID,
  payload: data,
});
