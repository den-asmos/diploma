import { ACTION_TYPES } from '../actions/types';

const initialOperationState = {
  date: null,
  sum: null,
  account: null,
  comment: null,
  category: null,
  authorId: null,
};

export const operationReducer = (state = initialOperationState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.GET_OPERATION_BY_ID: {
      return { ...state, ...payload };
    }

    default: {
      return state;
    }
  }
};
