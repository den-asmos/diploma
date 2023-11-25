import { ACTION_TYPES } from '../types';

export const getInfo = (data) => ({
  type: ACTION_TYPES.GET_USER_INFO,
  payload: data,
});
