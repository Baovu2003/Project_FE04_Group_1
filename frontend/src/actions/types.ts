// redux/actions/types.ts
export interface ApiLoginAdmin {
  accountInAdmin: Account
  role: Role;
}
export interface ApiLoginUser {
  user: User;
}
export interface Product {
  _id: string;
  title: string;
  product_category_id: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
  status: string;
  featured: string; 
  position: number;
  deleted: boolean;
  slug: string;
  createdBy: {
    account_id: string;
    createdAt: Date;
  };
  deletedBy?: {
    account_id: string;
    deletedAt?: Date; 
  };
  updatedBy: {
    account_id: string;
    updatedAt: Date;
    changes: Record<string, unknown>; 
  }[];
}
// redux/actions/types.ts
export interface ProductCategory {
  _id: string;
  title: string;
  parent_id: string;
  children?: ProductCategory[];
  description: string;
  thumbnail: string;
  status: "active" | "inactive";
  position: number;
  slug: string;
  deleted: boolean;

  createdBy: {
    account_id: string;
    createdAt: Date;
  };

  deletedBy?: {
    account_id: string;
    deletedAt: Date;
  };

  updatedBy?: Array<{ 
    account_id: string;
    updatedAt: Date;
    changes: object;
  }>;
  accountFullName: string;
}
export interface Account {
  _id: string;
  fullName: string;
  email: string;
  password?: string;
  token?: string;
  phone?: string;
  avatar?: string;
  role_id: string;
  status: "active" | "inactive";
  deleted: boolean;
}

export interface Role {
  _id: string;
  title: string;
  description?: string;
  permission: string[];
  deleted: boolean;
  deleteAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  tokenUser?: string;
  phone?: string;
  avatar?: string;
  address:string,
  status: string;
  deleted: boolean;
  deleteAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
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
// redux/actions/types.ts
export interface UserInfo {
  fullname: string;
  phone: string;
  address: string;
}

export interface Product {
  product_id: string;
  quantity: number;
  price: number;
  discountPercentage: number;
}

export interface Order {
  _id: string;
  user_id: string;
  cart_id: string;
  userInfo: UserInfo[];
  products: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}

// export interface Cart {
//   user_id: string;
//   products: {
//     product_id: string;
//     quantity: number;
//   };
// }

export interface CartProduct {
  product_id: string;
  quantity: number;
}

// Define Cart for ApiResponse
export interface Cart {
  user_id: string;
  products: CartProduct[];
}
export interface ApiResponse {
  accountInAdmin: Account
  user: User;
  role: Role;
  token: string;
  tokenUser: string;
  recordsProduct: Product[];
  recordsCategory: ProductCategory[];
  recordsPermission: PermissionRecord[];
  recordsRole: Role[];
  recordsAccount: Account[];
  detailCategory: ProductCategory;
  detailProduct: Product;
  detailRole: Role;
  detailAccount: Account;
  detailUser: User;
  cart: Cart[];
  cartItems:Cart
  status:number
  message:string;
}


// Define all cart action types

// Define all cart action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const  SET_CART = "SET_CART";

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartProduct; // Use CartProduct directly
}

export interface UpdateQuantityAction {
  type: typeof UPDATE_QUANTITY;
  payload: { product_id: string; quantity: number }; // Changed to product_id
}

export interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: { product_id: string }; // Changed to product_id
}

export interface ClearCartAction {
  type: typeof CLEAR_CART;
}
export interface SetCartAction {
  type: typeof SET_CART;
  payload: {
      list: CartProduct[]; // Your expected structure
      total: number;       // The total count
  };
}


// Union type for all cart action types
export type CartActionTypes = AddToCartAction | UpdateQuantityAction | RemoveItemAction | ClearCartAction|SetCartAction;