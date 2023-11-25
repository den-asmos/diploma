import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { authReducer, operationReducer, operationsReducer } from './reducers';

const reducer = combineReducers({
  auth: authReducer,
  operation: operationReducer,
  operations: operationsReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
