import { combineReducers, createStore } from 'redux';
import AccountReducer from '../reducers/Account.reducer'; // Example import, adjust to your structure

const rootReducer = combineReducers({
  AccountReducer, // Add all your reducers here
  // other reducers...
});

export type RootState = ReturnType<typeof rootReducer>; // This creates the RootState type

const store = createStore(rootReducer);

export default store;
