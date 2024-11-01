import { combineReducers, createStore } from 'redux';
import AccountReducer from '../reducers/Account.reducer'; // Example import, adjust to your structure
import UserReducer from '../reducers/User.reducer';

const rootReducer = combineReducers({
  AccountReducer,
  UserReducer
});

export type RootState = ReturnType<typeof rootReducer>; // This creates the RootState type

const store = createStore(rootReducer);

export default store;
