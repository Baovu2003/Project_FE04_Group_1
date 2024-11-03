// redux/actions/types.ts

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

// redux/actions/types.ts
export interface CartProduct {
  product_id: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  user_id: string;
  products: CartProduct[];
  createdAt?: Date;
  updatedAt?: Date;
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
  status:number
  message:string
}

export interface ApiLoginAdmin {
  accountInAdmin: Account
  role: Role;
}
export interface ApiLoginUser {
  user: User;
}