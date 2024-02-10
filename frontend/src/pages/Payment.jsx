import { useContext } from "react";
import { BASE_URL } from "../config";
import { authContext } from "../context/Authcontext";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const Payment = ({ isPaymentSuccessful }) => {
    const { user, token } = useContext(authContext)
    const { fetchCartItems, } = useContext(CartContext);



    const PaymentSuccessful = async () => {
        try {
            const response = await fetch(`${BASE_URL}/payment/payment-successfull/${user?._id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchCartItems();
            }
        } catch (error) {
            console.log(error)
        }


    }

    if(isPaymentSuccessful){
        PaymentSuccessful()
    }

    return (
        <div className={`p-auto bg-gray-100 h-screen ${isPaymentSuccessful ? 'success' : 'failure'}`}>
            <div className="bg-white p-6 md:mx-auto">
                <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto my-6">
                    {isPaymentSuccessful ? (
                        <g>
                            <circle cx="12" cy="12" r="12" fill="white" />
                            <path
                                fill="green"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                            />
                        </g>
                    ) : (
                        <g>
                            <circle cx="12" cy="12" r="12" fill="red" />
                            <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2" />
                            <line x1="6" y1="18" x2="18" y2="6" stroke="white" strokeWidth="2" />
                        </g>
                    )}
                </svg>

                <div className="text-center">
                    <h3 className={`md:text-2xl text-base font-semibold text-center ${isPaymentSuccessful ? 'text-gray-900' : 'text-gray-900'}`}>
                        {isPaymentSuccessful ? 'Payment Done!' : 'Payment Failed!'}
                    </h3>
                    <p className="text-gray-600 my-2">
                        {isPaymentSuccessful
                            ? 'Thank you for completing your secure online payment.'
                            : 'Oops! It seems there was an issue with your payment. Please try again or contact support for assistance.'}
                    </p>
                    <div className="py-10 text-center">
                        <NavLink to="/" className={`px-12 ${isPaymentSuccessful ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'} text-white font-semibold py-3`}>
                            GO BACK
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
