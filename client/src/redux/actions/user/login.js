import { ACTION_TYPES } from '../types';

export const login = (data) => ({
  type: ACTION_TYPES.LOGIN,
  payload: data,
});
