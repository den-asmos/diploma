import { ACTION_TYPES } from '../types';

export const register = (data) => ({
  type: ACTION_TYPES.REGISTER,
  payload: data,
});
