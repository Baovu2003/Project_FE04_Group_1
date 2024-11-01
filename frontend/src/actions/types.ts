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
  featured: string; // If this is a boolean, consider changing to boolean type
  position: number;
  deleted: boolean;
  slug: string;
  createdBy: {
    account_id: string;
    createdAt: Date;
  };
  deletedBy?: {
    account_id: string;
    deletedAt?: Date; // Marked as optional if it may not always be present
  };
  updatedBy: {
    account_id: string;
    updatedAt: Date;
    changes: Record<string, unknown>; // Use Record to allow any shape for changes
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
  deleteAt?: Date;
  createdAt?: Date; 
  updatedAt?: Date; 
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
  status?: string;                   
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
    user: User ;
    role: Role;
    token: string;
    tokenUser: string;
    recordsProduct: Product[];
    recordsPermission: PermissionRecord[]; 
    recordsCategory: ProductCategory[];
  }
  
  export interface ApiLoginAdmin {
    accountInAdmin: Account
    role: Role;
  }
  export interface ApiLoginUser {
    user: User;
  }