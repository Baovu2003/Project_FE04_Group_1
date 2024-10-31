import { combineReducers } from "redux";
// import LoginReducer from "./Login.reducer";
import AccountReducer from "./Account.reducer";
// import UserReducer from "./User.reducer";

const allReducers = combineReducers({
    Account: AccountReducer, // Renamed for clarity
    // Login: LoginReducer,
    // User: UserReducer,
});

export default allReducers;
