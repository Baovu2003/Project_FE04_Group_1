import { ADD_TO_CART, CLEAR_CART, REMOVE_ITEM, UPDATE_QUANTITY, CartActionTypes, CartProduct, SET_CART } from "../actions/types";

interface CartState {
    list: CartProduct[];
    total: number;
}

// Function to get the initial state from localStorage or create a new one
const getInitialState = (): CartState => {
    const savedState = localStorage.getItem('cart');
    console.log(savedState);
    return savedState ? JSON.parse(savedState) : { list: [], total: 0 };
};
console.log(getInitialState())
const cartReducer = (state: CartState = getInitialState(), action: CartActionTypes): CartState => {
    console.log(state);
    console.log(action);
    const validState = {
        list: Array.isArray(state.list) ? state.list : [],
        total: typeof state.total === 'number' ? state.total : 0,
    };
    console.log(validState)

    switch (action.type) {
        case ADD_TO_CART: {
            const { product_id, quantity } = action.payload;

            // Check if the product already exists in the cart
            const existingProductIndex = validState.list.findIndex(product => product.product_id === product_id);
            console.log(existingProductIndex)
            let updatedList;

            if (existingProductIndex !== -1) {
                // If product exists, update its quantity
                updatedList = validState.list.map((product, index) =>
                    index === existingProductIndex ? { ...product, quantity: product.quantity + quantity } : product
                );
                console.log(updatedList)
            } else {
                
                // If product does not exist, add it to the list
                updatedList = [...validState.list, action.payload];
            }

            const total = updatedList.reduce((sum, product) => sum + product.quantity, 0);

            // Update localStorage
            localStorage.setItem('cart', JSON.stringify({ list: updatedList, total }));

            return { ...validState, list: updatedList, total };
        }

        case UPDATE_QUANTITY: {
            const updatedList = validState.list.map(product =>
                product.product_id === action.payload.product_id ? { ...product, quantity: action.payload.quantity } : product
            );
            const total = updatedList.reduce((sum, product) => sum + product.quantity, 0);
            localStorage.setItem('cart', JSON.stringify({ list: updatedList, total }));
            return { ...validState, list: updatedList, total };
        }

        case REMOVE_ITEM: {
            const updatedList = validState.list.filter(product => product.product_id !== action.payload.product_id);
            const total = updatedList.reduce((sum, product) => sum + product.quantity, 0);
            localStorage.setItem('cart', JSON.stringify({ list: updatedList, total }));
            return { ...validState, list: updatedList, total };
        }

        case CLEAR_CART: {
            localStorage.removeItem('cart'); // Remove the cart from localStorage
            return { list: [], total: 0 };
        }
        case SET_CART: {
            // Nhận dữ liệu cart từ payload và cập nhật state
            return {
                ...state,
                list: action.payload.list,
                total: action.payload.total,
            };
        }
        

        default:
            return state;
    }
};

export default cartReducer;
