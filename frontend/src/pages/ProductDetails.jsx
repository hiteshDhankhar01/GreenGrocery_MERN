import { useEffect, useContext, useState, useRef } from "react";
import { BASE_URL } from "../config";
import { authContext } from "../context/Authcontext";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify"
import { CartContext } from "../context/CartContext";
import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io";




const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [itemquantity, setItemQuantity] = useState(1);
    const { user, token } = useContext(authContext);
    const { cartData, fetchCartItems, addProductToCart, removeItem } = useContext(CartContext);
    const { id } = useParams()


    useEffect(() => {
        if (user === null || user === undefined) {
            fetchCartItems();
        }
    }, [fetchCartItems, user]);

    const isInCart = Array.isArray(cartData) && cartData.some((item) => item.itemId === id);
    const cartItem = Array.isArray(cartData) && cartData.find((item) => item.itemId === id);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity >= 1) {
            addProductToCart(productId, newQuantity);
        } else {

            removeItem(productId);
        }
    };



    useEffect(() => {
        getProductDetails()

    }, [])

    const getProductDetails = async () => {
        try {
            const response = await fetch(`${BASE_URL}/product/productDetails/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                const { result } = responseData;

                setProduct(result);
            } else {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="p-4 flex flex-col items-center">
                {product && (
                    <div className="w-[80%] mx-auto flex items-center text-center px-auto ">
                        <div className="flex text-center px-auto flex-col md:flex-row">
                            <div className="image f-1/2 mr-[2rem]">
                                <div className="h-[25rem] w-[25rem] ">
                                    <img src={product.image} alt={product.name} className=" w-full h-full object-cover rounded-[1rem]" />
                                </div>

                            </div>
                            <div className="flex-1 f-1/2 text-start pl-[2rem]  border-l-2 w-[30rem]">
                                <div className="bg-white flex-col text-start gap-2 p-3">
                                    <div className="font-bold text-xl mb-2 capitalize">{product.name}

                                    </div>

                                    <p className="text-gray-700 text-base">
                                        <b className="font-extrabold text-[1rem]">{`Price: ₹${product.price}`} </b>
                                        <span className="text-[.8rem] rounded-[2px]  bg- line-through bg-slate-200 px-1">₹{product.oldPrice}</span>
                                        <span className="ml-2 rounded-[2px] text-[.8rem]  bg-green-200 px-1">
                                            {`-${(((product.oldPrice - product.price) / product.oldPrice) * 100).toFixed(2)}%`}
                                        </span>
                                    </p>
                                    <p className="text-gray-700 text-base">
                                        Quantity: {product.quantity}
                                    </p>
                                    <p className="text-gray-700 text-base">
                                        Rating: {product.totalRating}
                                        <div className="">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`text-2xl ${index < product.totalRating ? "text-yellow-500" : "text-gray-300"}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </p>

                                    <div className="flex justify-between mt-2">

                                        {(user === null || user === undefined) ?
                                            (
                                                <NavLink to="/login" className="w-full" >
                                                    <div className="flex justify-center rounded-[4px] text-white text-[12px] items-center gap-2 px-4 py-2 bg-green-800">
                                                        Add to Cart{" "}
                                                        <span>★</span>
                                                        <PiShoppingCartSimpleLight style={{ width: "1.5rem", height: "1.5rem" }} />
                                                    </div>
                                                </NavLink>
                                            ) : (
                                                isInCart ? (
                                                    <div className="flex items-center gap-4   bg-[#329967]  items-center justify-between  rounded-[4px] px-4">
                                                        <button className="border-2 text-[1.1rem] border-white border-[1px] h-[1.8rem] rounded-[4px] px-2 my-[6px] shadow-none  bg-[#329967] text-white" style={{ boxShadow: "none", transform: "scale(1)" }}
                                                            onClick={() => removeItem(cartItem.itemId)}>
                                                            Remove
                                                        </button>


                                                        <div className="flex items-center gap-[2px] border-[1px] border-white rounded-[4px] border-[#329967] h-fit my-auto bg-[#329967]">
                                                            <button className="text-[2rem] border-[#fff]  w-fit h-fit shadow-none text-[#329967] bg-[#329967] px-[1px] rounded-[4px]" style={{ boxShadow: "none", transform: "scale(1)" }} onClick={() => handleQuantityChange(id, cartItem.quantity - 1)}>
                                                                <IoMdRemoveCircle style={{ width: "1.8rem", height: "1.7rem", color: "white" }} />
                                                            </button>
                                                            <p className="text-[1.2rem] my-auto text-white">
                                                                {cartItem.quantity}
                                                            </p>
                                                            <button className="text-[2rem] border-[#fff] rounded-[4px] w-fit shadow-none text-[#329967] bg-[#329967] px-[1px]" style={{ boxShadow: "none", transform: "scale(1)" }} onClick={() => handleQuantityChange(id, cartItem.quantity + 1)}>
                                                                <IoMdAddCircle style={{ width: "1.8rem", height: "1.7rem", color: "white" }} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                ) : (
                                                    // If the item is not in the cart, render the "Add to Cart" button
                                                    <button className="" onClick={() => addProductToCart(product._id, itemquantity, product.name, product.quantity, product.price, product.image)}>
                                                        <div className="flex justify-center rounded-[4px] text-white text-[1rem] items-center gap-2 px-4 py-2 bg-[#329967]">
                                                            Add to Cart{" "}

                                                            <PiShoppingCartSimpleLight style={{ width: "1.5rem", height: "1.5rem" }} />
                                                        </div>
                                                    </button>
                                                )
                                            )}
                                    </div>
                                    <div className="mt-[1rem] pt-[1rem] border-t-2">
                                        <h2 className="text-[1.2rem] font-bold mb-4 underline" >Reviews</h2>
                                        <span>
                                            <span>
                                                {product.rating.map((obj) => (

                                                    <div key={obj._id} className="border-t-[1px] pt-2">
                                                        <div>
                                                            <div className='flex flex-row gap-2 items-center pr-2'>
                                                                <div className="flex items-center gap-2 text-[1rem] text-black">
                                                                    <img src={obj.userPhoto} alt="not" className='h-[2rem] w-[2rem] rounded-[2rem] border-[1px] border-[#329967]' />
                                                                    <h2 className='capitalize'>{obj.userName}</h2>
                                                                </div>
                                                            </div>
                                                            <p className="text-gray-700 text-base text-[1.2rem]">
                                                                Rating: {obj.star}
                                                                <div className="">
                                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                                        <span
                                                                            key={index}
                                                                            className={`text-[1.2rem] ${index < obj.star ? "text-yellow-500" : "text-gray-300"}`}
                                                                        >
                                                                            ★
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </p>
                                                        </div>
                                                        <p>{obj.review}</p>
                                                    </div>
                                                ))}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div >
        </>
    );
};

export default ProductDetails;