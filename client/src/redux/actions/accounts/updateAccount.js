import { ACTION_TYPES } from '../types';

export const updateAccount = (data) => ({
  type: ACTION_TYPES.UPDATE_ACCOUNT,
  payload: data,
});
