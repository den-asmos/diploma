import { ACTION_TYPES } from '../actions/types';

const initialOperationsState = {
  operations: [],
  lastPage: null,
};

export const operationsReducer = (state = initialOperationsState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.ADD_OPERATION: {
      const newOperations = [...state.operations, payload];

      return { ...state, operations: newOperations };
    }

    case ACTION_TYPES.GET_OPERATIONS: {
      return {
        ...state,
        operations: payload.operations,
        lastPage: payload.lastPage,
      };
    }

    case ACTION_TYPES.UPDATE_OPERATION: {
      const updatedOperations = state.operations.map((operation) => {
        if (operation._id === payload._id) {
          return payload;
        }

        return operation;
      });

      return { ...state, operations: updatedOperations };
    }

    case ACTION_TYPES.DELETE_OPERATION: {
      const updatedOperations = state.operations.filter(
        (operation) => operation._id !== payload
      );

      return { ...state, operations: updatedOperations };
    }

    default: {
      return state;
    }
  }
};
