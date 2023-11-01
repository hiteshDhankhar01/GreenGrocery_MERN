import { useEffect, useContext, useState } from "react";
import { BASE2_URL } from "../config";
import { authContext } from "../context/Authcontext";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const ProductDetails = () => {
    const { token } = useContext(authContext);
    const url = window.location.href;
    const parts = url.split('/');
    const id = parts[parts.length - 1];

    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        try {
            const response = await fetch(`${BASE2_URL}/product/productDetails/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                const { result } = responseData;
                console.log(result)
                setProduct(result);
            } else {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-4 flex flex-col items-center">
            {product && (
                <div className="w-[80%] mx-auto flex items-center text-center px-auto ">
                    <div className="flex text-center px-auto">
                        <div className="image f-1/2 mr-[2rem]">
                            <div className="h-[25rem] w-[25rem] ">
                                <img src={product.image} alt={product.name} className=" w-full h-full object-cover rounded-[1rem]" />
                            </div>

                        </div>
                        <div className="flex-1 f-1/2 text-start pl-[2rem]  border-l-2">
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
                                    Rating: {product.averageRating}
                                    <div className="">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span
                                                key={index}
                                                className={`text-2xl ${index < product.
                                                    averageRating ? "text-yellow-500" : "text-gray-300"}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </p>

                                <div className="flex justify-between mt-2">
                                    <button className="rounded-[4px] ">
                                        <div className=" flex rounded-[4px] text-white text-[12px] items-center gap-2 px-4 py-2  bg-[#329967]">
                                            Add to Cart <PiShoppingCartSimpleLight style={{ width: "1.5rem", height: "1.5rem" }} />
                                        </div>
                                    </button>
                                </div>
                                <div className="mt-[1rem] pt-[1rem] border-t-2">
                                    <div>
                                        <h2>
                                            <b className="text-[1.2rem]">Naveen </b>
                                            <span> ★★★★★</span>
                                        </h2>
                                        <p>It is a good product</p>
                                    </div>
                                    <div className="mt-4 w-full">
                                        <label htmlFor="review" className="text-lg font-semibold">
                                            Write a Review:
                                        </label>
                                        <textarea
                                            id="review"
                                            className="w-full p-2 mt-2 border rounded"
                                            rows="4"
                                            placeholder="Share your thoughts about this product..."
                                        ></textarea>
                                    </div>
                                    {/* Submit Review Button */}
                                    <button className="mt-4 px-4 py-2 bg-[#329967] text-white  rounded over:bg-blue-600">
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;


// const discountPercentage = ((oldPrice - price) / oldPrice) * 100;



// import { useEffect, useContext } from "react";
// // import image from "../assets/image/apple.jpg"
// import { BASE2_URL } from "../config";
// import { authContext } from "../context/Authcontext";


// const ProductDetails = () => {
//     const { token } = useContext(authContext)

//     const url = window.location.href; // Get the current URL
//     const parts = url.split('/'); // Split the URL by '/'
//     const id = parts[parts.length - 1]; // Get the last part of the URL as the id


//     console.log(`${BASE2_URL}/product/productDetails/${id}`)
//     useEffect(() => {
//         getProductDetails()
//     }, [])
//     // Replace these dummy values with actual product data
//     const getProductDetails = async () => {
//         try {
//             const response = fetch(`${BASE2_URL}/product/productDetails/${id}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 },
//             })

//             if (response.ok) {
//                 // If the response status is 200 (OK), parse the JSON response
//                 const responseData = await response.json();
//                 const { result } = responseData;
//                 console.log(result);
//             } else {
//                 // Handle non-OK responses (e.g., error responses)
//                 console.error(`Error: ${response.status} - ${response.statusText}`);
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     };

//     return (
//         <div className="p-4 flex flex-col items-center">
//             {/* Top */}
//             <div className="w-80% mx-auto flex items-center text-center">
//                 <div className="flex">
//                     <div className="image h-80 w-80">
//                         <img src="" alt='sdf' className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1">
//                         <h2 className="text-2xl font-semibold mt-4">erer</h2>
//                         <p className="text-xl mt-2">Price: $ 566</p>
//                         <div className="flex items-center mt-2">
//                             <p className="text-lg">Rating:</p>
//                             <div className="ml-2">
//                                 {/* Display rating stars here */}



//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Bottom */}
//
//         </div>


// {Array.from({ length: 5 }).map((_, index) => (
//     <span
//         key={index}
//         className={`text-2xl ${index < product.rating ? "text-yellow-500" : "text-gray-300"}`}
//     >
//         ★
//     </span>
// ))}


// <div className="p-4  px-[3rem] flex items-center ">
//     {/* top */}
//     <div className="mx-auto flex items-center text-center ">
//         <div className="flex gap-[2rem] flex-col">
//             <div className="flex image h-[20rem] w-[20rem] f-1/2">
//                 <img src={image} alt={product.name} className="w-full h-full object-cover" />
//             </div>
//             <div className="flex flex-col f-1/2">
//                 <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
//                 <p className="text-xl mt-2">Price: $ {product.price}</p>
//                 <div className="flex items-center mt-2">
//                     <p className="text-lg">Rating:</p>
//                     <div className="ml-2">
//                         {/* You can display rating stars here */}
//                         {Array.from({ length: 5 }).map((_, index) => (
//                             <span
//                                 key={index}
//                                 className={`text-2xl ${index < product.rating ? "text-yellow-500" : "text-gray-300"
//                                     }`}>
//                                 ★
//                             </span>))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     {/* bottom */}
//     <div>

//         <div className="border-b-[1px] p-2 border-[#e5e7eb] rounded-[4px]">
//             <h2><b className="text-[1.2rem]">Naveen </b><span className="text-yellow-500"> ★★★★★</span></h2>
//             <p>It is a good product</p>
//         </div>
//         <div className="border-b-[1px] p-2 border-[#e5e7eb] rounded-[4px]">
//             <h2><b className="text-[1.2rem]">Naveen </b><span className="text-yellow-500"> ★★★★★</span></h2>
//             <p>It is a good product</p>
//         </div>
//         <div className="border-b-[1px] p-2 border-[#e5e7eb] rounded-[4px]">
//             <h2><b className="text-[1.2rem]">Naveen </b><span className="text-yellow-500"> ★★★★★</span></h2>
//             <p>It is a good product</p>
//         </div>
//         <div className="border-b-[1px] p-2 border-[#e5e7eb] rounded-[4px]">
//             <h2><b className="text-[1.2rem]">Naveen </b><span className="text-yellow-500"> ★★★★★</span></h2>
//             <p>It is a good product</p>
//         </div>
//         <div className="mt-4 w-full">
//             <label htmlFor="review" className="text-lg font-semibold">
//                 Write a Review:
//             </label>
//             <textarea
//                 id="review"
//                 className="w-full p-2 mt-2 border rounded"
//                 rows="4"
//                 placeholder="Share your thoughts about this product..."
//             ></textarea>
//         </div>

//         {/* Submit Review Button */}
//         <button className="mt-4 px-4 py-2 bg-[#329967] text-white rounded">
//             Submit Review
//         </button>
//     </div>
// </div>
//     );
// };

// export default ProductDetails;
