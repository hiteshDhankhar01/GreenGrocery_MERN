import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io";
import { authContext } from "../../context/Authcontext";


const ProductCard = ({ product }) => {
    const { name, price, categories, _id, image, quantity, oldPrice } = product;
    const [itemquantity, setItemQuantity] = useState(1);
    const { user } = useContext(authContext)

    const { cartData, fetchCartItems, addProductToCart, removeItem } = useContext(CartContext);


    useEffect(() => {
        if (user === null || user === undefined) {
            fetchCartItems();
        }
    }, [fetchCartItems, user]);

    const isInCart = Array.isArray(cartData) && cartData.some((item) => item.itemId === _id);
    const cartItem = Array.isArray(cartData) && cartData.find((item) => item.itemId === _id);

    const discountPercentage = ((oldPrice - price) / oldPrice) * 100;
    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity >= 1) {
            addProductToCart(productId, newQuantity);
        } else {

            removeItem(productId);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="effect w-[14rem] max-w-sm rounded overflow-hidden shadow-lg">
                <Link to={`/product/${_id}`} className="cursor-auto">
                    <div >
                        <div className="image h-[9rem] bg-white">
                            <img className="w-full h-full object-cover" src={image} alt={name} />
                        </div>
                        <div className="bg-white flex-col text-start gap-2 p-3">
                            <div className="font-bold text-xl mb-2 capitalize">{name}</div>
                            <p className="text-gray-700 text-base">
                                <b className="font-extrabold text-[1rem]">{`Price: ₹${price}`} </b>
                                <span className="text-[.8rem] rounded-[2px]  bg- line-through bg-slate-200 px-1">₹{oldPrice}</span>
                                <span className="ml-2 rounded-[2px] text-[.8rem]  bg-green-200 px-1">
                                    {`-${discountPercentage.toFixed(2)}%`}
                                </span>
                            </p>
                            <p className="text-gray-700 text-base">
                                Quantity: {quantity}
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="flex justify-between ">
                    {(user === null || user === undefined) ?
                        (
                            <NavLink to="/login" className="w-full" >
                                <div className="flex justify-center rounded-[4px] text-white text-[12px] items-center gap-2 px-4 py-2 bg-[#329967]">
                                    Add to Cart{" "}
                                    <PiShoppingCartSimpleLight style={{ width: "1.5rem", height: "1.5rem" }} />
                                </div>
                            </NavLink>
                        ) : (
                            isInCart ? (
                                // If the item is in the cart, render a message or icon accordingly
                                <div className="flex items-center gap-1   bg-[#329967] w-full items-center justify-between  rounded-[0px] px-4">
                                    <button className="border-2 text-[1.1rem] border-white border-[1px] h-[1.8rem] rounded-[4px] px-2 my-[6px] shadow-none  bg-[#329967] text-white" style={{ boxShadow: "none", transform: "scale(1)" }}
                                        onClick={() => removeItem(cartItem.itemId)}>
                                        Remove
                                    </button>


                                    <div className="flex items-center gap-[2px] border-[1px] border-white rounded-[4px] border-[#329967] h-fit my-auto bg-[#329967]">
                                        <button className="text-[2rem] border-[#fff]  w-fit h-fit shadow-none text-[#329967] bg-[#329967] px-[1px] rounded-[4px]" style={{ boxShadow: "none", transform: "scale(1)" }} onClick={() => handleQuantityChange(_id, cartItem.quantity - 1)}>
                                            <IoMdRemoveCircle style={{ width: "1.8rem", height: "1.7rem", color: "white" }} />
                                        </button>
                                        <p className="text-[1.2rem] my-auto text-white min-w-[8px]">
                                            {cartItem.quantity}
                                        </p>
                                        <button className="text-[2rem] border-[#fff] rounded-[4px] w-fit shadow-none text-[#329967] bg-[#329967] px-[1px]" style={{ boxShadow: "none", transform: "scale(1)" }} onClick={() => handleQuantityChange(_id, cartItem.quantity + 1)}>
                                            <IoMdAddCircle style={{ width: "1.8rem", height: "1.7rem", color: "white" }} />
                                        </button>
                                    </div>
                                </div>

                            ) : (
                                // If the item is not in the cart, render the "Add to Cart" button
                                <button className="w-full" onClick={() => addProductToCart(_id, itemquantity, name, quantity, price, image)}>
                                    <div className="flex justify-center  text-white text-[1rem] items-center gap-2 px-4 py-2 bg-[#329967]">
                                        Add to Cart{" "}
                                        
                                        <PiShoppingCartSimpleLight style={{ width: "1.5rem", height: "1.5rem" }} />
                                    </div>
                                </button>
                            )
                        )}
                </div>
            </div>
            <div />
        </div>
    );
};

export default ProductCard;