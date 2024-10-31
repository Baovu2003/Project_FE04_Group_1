// /redux/actions/AccountAction.ts
import { ApiResponse } from './types'; // Adjust the import path as necessary

export const accountActions = (payload: ApiResponse) => {
    console.log(payload);
    return {
        type: "NEW_ACCOUNT" as const,
        payload: payload,
    };
};
