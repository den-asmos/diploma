import { ACTION_TYPES } from '../types';

export const addAccount = (data) => ({
  type: ACTION_TYPES.ADD_ACCOUNT,
  payload: data,
});
