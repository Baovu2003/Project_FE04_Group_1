// /redux/reducers/Account.reducer.ts
import { ApiResponse } from '../actions/types';

const initialState: ApiResponse | null = null; // Adjust initial state as necessary

const AccountReducer = (state = initialState, action: { type: string; payload: ApiResponse }) => {
    console.log("AccountReducer", state, action.payload);
    switch (action.type) {
        case "NEW_ACCOUNT":
            return { ...action.payload }; // Update state based on the payload
        default:
            return state;
    }
};

export default AccountReducer;
