import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link } from "react-router-dom";
Link

const ProductCard = ({ product }) => {
    const { name, price, categories, _id, image, quantity, oldPrice } = product

    const consol = () => {
        return "hi"
    }

    const discountPercentage = ((oldPrice - price) / oldPrice) * 100;

    return (
        // <div className="effect w-[17rem] max-w-sm rounded overflow-hidden shadow-lg">
        //     <Link to={`/product/${_id}`}>
        //         <div >
        //             <div className="image h-[12rem]">
        //                 <img className="w-full h-full object-cover" src={image} alt={name} />
        //             </div>
        //             <div className="flex-col gap-2 p-3">
        //                 <div className="font-bold text-xl mb-2 capitalize">{name}</div>
        //                 <p className="text-gray-700 text-base">categorie-{categories}</p>
        //                 <p className="text-gray-700 text-base">{`Price: ₹${price}`}</p>
        //             </div>
        //         </div>
        //     </Link>
        //     <button className="rounded-[2rem] right-0">
        //         <div className="flex rounded-[2rem] text-white text-[16px] items-center gap-2 px-4 py-2 bg-green-800">
        //             Add to Cart <PiShoppingCartSimpleLight style={{ width: "2rem", height: "2rem" }} />
        //         </div>
        //     </button>
        // </div>

        <Link to={`/product/${_id}`} className="cursor-auto">
            <div className="effect w-[14rem] max-w-sm rounded overflow-hidden shadow-lg">
                <div className="image h-[9rem]">
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
                    <div className="flex justify-between mt-2"> {/* Add this div */}
                        <button onClick={consol} className="rounded-[4px] ml-[4rem]">
                            <div className=" flex rounded-[4px] text-white text-[12px] items-center gap-2 px-4 py-2  bg-green-800">
                                Add to Cart <PiShoppingCartSimpleLight style={{ width: "1.5rem", height: "1.5rem" }} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default ProductCard



{/* <div className="effect w-[17rem] max-w-sm rounded overflow-hidden shadow-lg">
                <div className="image h-[12rem]">
                    <img className="w-full h-full object-cover" src={image} alt={name} />
                </div>
                <div className="flex-col gap-2 p-3">
                    <div className="font-bold text-xl mb-2 capitalize">{name}</div>
                    <p className="text-gray-700 text-base">
                        categorie-{categories}</p>
                    <p className="text-gray-700 text-base">
                        {`Price: ₹${price}`}
                    </p>
                    <button className=" rounded-[2rem] right-0 ">
                        <div className="flex rounded-[2rem] text-white text-[16px] items-center gap-2 px-4 py-2 bg-green-800">
                            Add to Cart <PiShoppingCartSimpleLight style={{ width: "2rem", height: "2rem" }} />
                        </div>
                    </button>
                </div>
            </div> */}