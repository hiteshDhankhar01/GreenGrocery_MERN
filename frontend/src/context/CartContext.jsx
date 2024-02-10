import { createContext, useReducer, useEffect, useContext, useCallback } from "react";
import { authContext } from "./Authcontext";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify"

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                cart: action.payload.cart,
                cartData: action.payload.data,
            };
        default:
            return state;
    }
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { cart: [], cartData: null, loading: true, error: null });
    const { user, token } = useContext(authContext);

    const fetchCartItems = useCallback(async () => {
        try {
            if (user) {
                const result = await fetch(`${BASE_URL}/user/getcartitem/${user?._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { cartData } = await result.json();
                dispatch({ type: 'SET_CART', payload: { cart: cartData.cart, data: cartData } });
                
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            dispatch({ type: 'SET_ERROR', payload: { error: 'Error fetching cart items' } });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        }
    }, [user, token, dispatch]);

    useEffect(() => {
        // Fetch cart items when the component mounts
        fetchCartItems();
    }, [fetchCartItems]);

    const addProductToCart = async (_id, itemquantity, name, quantity, price, image) => {
        try {
            const result = await fetch(`${BASE_URL}/user/cart/${user?._id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    quantity: itemquantity,
                    itemId: _id,
                    itemName: name,
                    itemImage: image,
                    itemPrice: price,
                    itemQuantity: quantity
                }),
            });
            await result.json();
            fetchCartItems(); 
            toast.success("Item add to Cart")
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            const result = await fetch(`${BASE_URL}/user/deletecartitem/${user?._id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    itemId: itemId,
                }),
            });
            await result.json();
            fetchCartItems(); 
            toast("Item remove to Cart")
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart: state.cart, cartData: state.cartData, loading: state.loading, error: state.error, fetchCartItems, addProductToCart, removeItem }}>
            {children}
        </CartContext.Provider>
    );
}