// redux/actions/types.ts

export interface User {
    _id: string;
    fullName: string;
    email: string;
  }
  
  export interface Role {
    _id: string;
    title: string;
    permission: string[];
  }
  
  export interface PermissionRecord {
    _id: string;
    title: string;
    description: string;
    permission: string[];
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface ApiResponse {
    user: User | null;
    role: Role | null;
    records?: PermissionRecord[]; // Optional `records` for permission data
  }
  