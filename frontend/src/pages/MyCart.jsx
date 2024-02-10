import { useContext, useEffect, useState } from "react";
import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io";
import { PulseLoader } from "react-spinners";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js'
import { BASE_URL } from "../config";
import { authContext } from "../context/Authcontext";

const MyCart = () => {
    const { token } = useContext(authContext);
    const [loading, setLoading] = useState(false)
    const { cartData, fetchCartItems, addProductToCart, removeItem } = useContext(CartContext);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity >= 1) {
            addProductToCart(productId, newQuantity);
        } else {

            removeItem(productId);
        }
        // location.reload();
    };



    const totalPrice = cartData
        ? cartData.reduce((total, item) => {
            return total + item.itemPrice * item.quantity;
        }, 0)
        : 0;

    const makePayment = async () => {
        setLoading(true)
        try {
            const stripe = await loadStripe("pk_test_51OFVHXSJXUwhezWr6fa660O9ltKDcgcn7jdPZjriOFzoqO5r6omeTfcwRm5VZLgzCPoZkTYuJHVPlUyUQheJvmVl00O6oEZMX1");

            const response = await fetch(`${BASE_URL}/payment/create-cheakout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ products: cartData }),
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return;
            }

            const responseData = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: responseData.sessionId, // Use the correct key based on your server's response
            });

            if (result.error) {
                console.log(result.error);
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='h-[100%] w-[80%] mx-auto min-h-screen py-4'>

            <div>
                <div className='h-[100%] w-[80%] mx-auto'>
                    <NavLink to="/orders" className="bg-[#329967] text-[1.3rem] text-white hover:text-white border-b-[2px] p-2 rounded">My Orders</NavLink>
                    <div className="flex flex-col pt-[2rem] mb-[1.5rem]   w-[90%]">
                        <h2 className="text-[2rem]"><span className='capitalize'>My Cart</span></h2 >
                        <nav className="flex text-[1.2rem] gap-2">
                            <li className="list-none hover:text-[#329967]"><NavLink to="/">Home</NavLink></li>
                            <div className="mx-1">/</div>
                            <li className="list-none">All <span className='capitalize'>My Cart</span></li>
                        </nav>
                    </div>


                    <div className="">

                        {/* cartData && cartData.length !== null && cartData.length !== 0  */}
                        {cartData && cartData.length !== null && cartData.length !== 0 ? (
                            <div>
                                {Array.isArray(cartData) && cartData.map((item) => (

                                    <div key={item.itemId} className="flex text-center px-auto  mb-4">
                                        <div className="image f-1/2 mr-[2rem] flex items-center justify-center">
                                            <div className="h-[5rem] w-[5rem]  ">
                                                <img src={item.itemImage} alt='' className=" w-full h-full object-cover rounded-[1rem]" />
                                            </div>

                                        </div>
                                        <div className="flex-1 f-1/2 text-start pl-[2rem]  border-l-2 w-[30rem]">
                                            <div className="bg-white flex-col text-start gap-2 ">
                                                <div className="font-bold text-xl mb-2 capitalize">
                                                    {item.itemName}
                                                </div>

                                                <p className="text-gray-700 text-base text-[1rem]">

                                                    {`Price: ₹${item.itemPrice}`}
                                                    <span className="text-[grey]">
                                                        {(item.quantity > 1) && ` X ${item.quantity} = ₹${item.itemPrice * item.quantity}`}
                                                    </span>

                                                </p>
                                                <p className="text-gray-700 text-base">
                                                    {item.itemQuantity}
                                                    <span className="text-[grey]">
                                                        <span className="text-[grey]">
                                                            {item.quantity > 1 && ` X ${item.quantity} = `}
                                                            {item.quantity > 1
                                                                ? (parseFloat(item.itemQuantity) * item.quantity >= 1000
                                                                    ? `${((parseFloat(item.itemQuantity) * item.quantity) / 1000).toFixed(2)} kg`
                                                                    : `${(parseFloat(item.itemQuantity) * item.quantity).toFixed(2)} g`
                                                                )
                                                                : ''}
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mx-auto text-start pl-[2rem]  border-l-2 ">
                                            <div className="flex items-center justify-center cursor-pointer">
                                                <div className="border-2 flex rounded-[2rem] border-[#329967]">
                                                    <button className="border-2 text-[2rem] border-[#fff] rounded-[2rem]  w-fit   shadow-none text-[#329967]  bg-[#329967] " style={{ boxShadow: "none", transform: "scale(1)" }} onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}><IoMdRemoveCircle style={{ width: "2rem", height: "2rem", color: "white" }} /></button>
                                                    <p className="text-[1.2rem] my-auto px-3" >
                                                        {item.quantity}
                                                    </p>
                                                    <button className="border-2 text-[2rem] border-[#fff] rounded-[2rem]  w-fit   shadow-none text-[#329967]  bg-[#329967] " style={{ boxShadow: "none", transform: "scale(1)" }} onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}><IoMdAddCircle style={{ width: "2rem", height: "2rem", color: "white" }} /></button>
                                                </div>
                                            </div>
                                            <div className="mx-auto">
                                                <button className="border-2 text-[1.4rem] border-[#329967] rounded-[2rem] px-2 my-2 bg-green-50 shadow-none text-[#329967] hover:bg-[#329967] hover:text-white" style={{ boxShadow: "none", transform: "scale(1)" }}
                                                    onClick={() => removeItem(item.itemId)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="w-full mt-[2rem] text-[1.2rem] flex justify-between  text-white w-fit p-2 rounded-[4px]  items-center">
                                    <h2 className="bg-green-50 h-fit p-2 rounded-xl border-2 border-[#329967] text-[#329967] items-center">{cartData.length} {cartData.length <= 1 ? 'item' : 'items'} with Price ₹ {totalPrice.toFixed(2)}</h2>
                                    <button onClick={makePayment} className='text-[1.6rem] bg-[#329967] text-white p-2 rounded-xl  flex  ml-4  '><b>
                                        {loading ? <PulseLoader size={10} color="white" /> : 'Buy Now'}</b></button>
                                </div>
                                <div className="flex justify-end">
                                    {/*                                     
                                    <button oncl className='text-[1.6rem] bg-[#329967] text-white p-2 rounded-xl  flex  ml-4 mt-4 '><b>Buy Now</b></button> */}


                                </div>
                            </div>
                        ) : (
                            <div >
                                No items
                            </div>
                        )}

                    </div>


                </div>
            </div>
        </div >
    );
};



export default MyCart;