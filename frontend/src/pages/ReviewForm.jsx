import { useContext, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { authContext } from "../context/Authcontext";
import { BASE_URL } from "../config";

function ReviewForm(props) {
    const { user, token } = useContext(authContext);
    const [review, setReview] = useState("");
    const reviewTextareaRef = useRef(null);
    const [star, setStar] = useState(0);

    const handleClose = (e) => {
        e.preventDefault();
        props.toggle();
    };

    const handleInputChange = (e) => {
        setReview(e.target.value);
    };

    const reviewProduct = async (event) => {
        event.preventDefault();
        const userId = user?._id;
        const userPhoto = user?.photo;
        const userName = user?.name;

        // Check if star value is 0 or textarea is empty
        if (star === 0 || review.trim() === "") {
            toast.error("Please provide a star rating and review before submitting.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/product/review/${props.itemId}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ star, review, userName, userPhoto, userId }),
            });

            const { message } = await response.json();

            if (!response.ok) {
                throw new Error(message);
            }
            toast.success(message);
            props.toggle();
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };


    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="mt-[2px] pt-[0px] ">
                    <div className="w-full flex justify-end">
                        <button className="right-0" onClick={handleClose} style={{ boxShadow: "none", transform: "scale(1)" }}>
                            <IoMdClose style={{ width: "1.5rem", height: "1.5rem" }} />
                        </button>
                    </div>
                    <h2 className="text-[1rem] cursor-default">Write Review about Product</h2>

                    <form onSubmit={reviewProduct}>
                        <div className="mt-4 w-full">
                            {/* Rating Star */}
                            <div>
                                <div className="">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <span
                                            key={index}
                                            data-star-id={index + 1}
                                            className={`text-2xl cursor-pointer ${index < star ? "text-yellow-500" : "text-gray-300"
                                                }`}
                                            onClick={() => setStar(index + 1)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                onChange={handleInputChange}
                                ref={reviewTextareaRef}
                                id="review"
                                className="w-full p-2 mt-2 border-[2px] rounded focus:outline-none resize-none normal-case"
                                rows="3"
                                placeholder="Share your thoughts about this product..."
                            ></textarea>
                        </div>
                        <div className="w-full flex justify-end">
                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-[#329967] text-white rounded over:bg-blue-600"
                            >
                                Submit Review
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm;

// <div className="mt-[2px] pt-[2px] border-t-2">
//                                                 <form onSubmit >
//                                                     <div className="mt-4 w-full ">

//                                                         {/* ratingStar */}
//                                                         <div>
//                                                             <div className="">
//                                                                 {Array.from({ length: 5 }).map((_, index) => (
//                                                                     <span
//                                                                         key={index}
//                                                                         data-star-id={index + 1}
//                                                                         className={`text-2xl cursor-default ${index < star ? "text-yellow-500" : "text-gray-300 "}`}
//                                                                         onClick={() => setStar(index + 1)}
//                                                                     >
//                                                                         ★
//                                                                     </span>
//                                                                 ))}
//                                                             </div>
//                                                         </div>
//                                                         <textarea
//                                                             // onChange={handelInputChange}
//                                                             // ref={reviewTextareaRef}
//                                                             id="review"
//                                                             className="w-full p-2 mt-2 border-[2px]  rounded focus:outline-none  resize-none normal-case"
//                                                             rows="3"
//                                                             placeholder="Share your thoughts about this product..."
//                                                         ></textarea>

//                                                     </div>
//                                                     <div className="w-full flex justify-end">
//                                                         <button type="submit" className="mt-4 px-4 py-2 bg-[#329967] text-white  rounded over:bg-blue-600">
//                                                             Submit Review
//                                                         </button>
//                                                     </div>

//                                                 </form>
//                                             </div>


{/* <button onClick={props.toggle}>Close</button> */ }
