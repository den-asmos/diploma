import { ACTION_TYPES } from '../types';

export const updateUser = (data) => ({
  type: ACTION_TYPES.UPDATE_USER,
  payload: data,
});
