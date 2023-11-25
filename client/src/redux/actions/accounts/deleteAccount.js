import { ACTION_TYPES } from '../types';

export const deleteAccount = (data) => ({
  type: ACTION_TYPES.DELETE_ACCOUNT,
  payload: data,
});
