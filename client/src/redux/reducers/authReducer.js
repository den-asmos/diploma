import { ACTION_TYPES } from '../actions/types';

const initialUserState = {
  id: null,
  name: null,
  login: null,
  email: null,
  operations: null,
  categories: null,
  accounts: null,
};

export const authReducer = (state = initialUserState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.LOGIN: {
      return { ...state, ...payload };
    }

    case ACTION_TYPES.REGISTER: {
      return { ...state, ...payload };
    }

    case ACTION_TYPES.LOGOUT: {
      return initialUserState;
    }

    case ACTION_TYPES.UPDATE_USER: {
      return { ...state, ...payload };
    }

    case ACTION_TYPES.GET_USER_INFO: {
      return { ...state, ...payload };
    }

    case ACTION_TYPES.ADD_ACCOUNT: {
      const updatedAccounts = [...state.accounts, payload];
      return { ...state, accounts: updatedAccounts };
    }

    case ACTION_TYPES.UPDATE_ACCOUNT: {
      const updatedAccounts = state.accounts.map((account) => {
        if (account._id === payload._id) {
          return payload;
        }

        return account;
      });

      return { ...state, accounts: updatedAccounts };
    }

    case ACTION_TYPES.DELETE_ACCOUNT: {
      const updatedAccounts = state.accounts.filter(
        (account) => account._id !== payload
      );

      return { ...state, accounts: updatedAccounts };
    }

    case ACTION_TYPES.ADD_CATEGORY: {
      const newCategories = [...state.categories, payload];

      return { ...state, categories: newCategories };
    }

    case ACTION_TYPES.UPDATE_CATEGORY: {
      const updatedCategories = state.categories.map((category) => {
        if (category._id === payload._id) {
          return payload;
        }

        return category;
      });

      return { ...state, categories: updatedCategories };
    }

    case ACTION_TYPES.DELETE_CATEGORY: {
      const updatedCategories = state.categories.filter(
        (category) => category._id !== payload
      );

      return { ...state, categories: updatedCategories };
    }

    case ACTION_TYPES.ADD_OPERATION: {
      const newOperations = [...state.operations, payload];

      return { ...state, operations: newOperations };
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
