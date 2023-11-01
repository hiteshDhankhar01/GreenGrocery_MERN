import { PiShoppingCartSimpleLight } from "react-icons/pi";
import mango from "../../assets/image/mango.jpg";
import apple from "../../assets/image/apple.jpg";
import banana from "../../assets/image/banana.jpg";

const Discound = [
    {
        title: "Mango",
        price: "45",
        image: mango,
    },
    {
        title: "Apple",
        price: "5",
        image: apple,
    },
    {
        title: "Banana",
        price: "7",
        image: banana,
    },
    {
        title: "Apple",
        price: "5",
        image: apple,
    },
    {
        title: "Banana",
        price: "7",
        image: banana,
    },
    // ... other items
];

const Fruits = () => {
    return (
        <div>
            <div className="">
                <div className="flex flex-row items-center justify-between py-2">
                    <h1 className="text-[2rem]">Fruits</h1>
                    <a className="text-[1rem]" href="/fruits">View All</a>
                </div>
                <div className="flex gap-3 mx-auto">
                    {Discound.map((item, index) => (
                        <div key={index} className="w-[19rem] max-w-sm rounded overflow-hidden shadow-lg">
                            <div className="image h-[14rem]">
                                <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                            </div>
                            <div className="flex-col gap-2 p-3">
                                <div className="font-bold text-xl mb-2 capitalize">{item.title}</div>
                                <p className="text-gray-700 text-base">
                                    {`Price: ₹${item.price}`}
                                </p>
                                <div className="flex text-white text-[16px] items-center gap-2 px-4 py-2 bg-green-800">
                                    Add to Cart <PiShoppingCartSimpleLight style={{ width: "2rem", height: "2rem" }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Fruits;



// import { PiShoppingCartSimpleLight } from "react-icons/pi"

// const Discound = [
//     {
//         title: "mango",
//         price: "45",
//         image: "apple.jpg"
//     },
//     {
//         title: "apple",
//         price: "5",
//         image: "/apple.jpg"
//     },
//     {
//         title: "banana",
//         price: "7",
//         image: "./apple.jpg"
//     },
//     {
//         title: "mango",
//         price: "66",
//         image: "assets/apple.jpg"
//     },
//     {
//         title: "mango",
//         price: "5",
//         image: "/assets/apple.jpg"
//     },


// ]

// const Fruits = () => {
//     return (
//         <div>
//             <div className="container">
//             <div className="flex flex-row items-center justify-between py-2">
//                     <h1 className="text-[2rem]">Fruits</h1>
//                     <a className="text-[1rem]" href="/allfruit" >View All</a>
//                 </div>
//                 <div className="flex gap-3 mx-auto">
//                     {Discound.map((item, index) => (
//                         <div key={index} className="w-[19rem] max-w-sm rounded overflow-hidden shadow-lg">
//                             {/* Image source should be updated */}
//                             <div className="image h-[14rem]">
//                                 <img className="w-full h-full object-cover" src={item.image} alt={item.image} />
                                
//                             </div>

//                             <div className="flex-col gap-2 p-3">

//                                 <div className="font-bold text-xl mb-2 capitalize">{item.title}</div>
//                                 <p className="text-gray-700 text-base">
//                                     {`Price: ₹${item.price}`}
//                                 </p>

//                                 <div className=" flex text-white text-[16px] items-center gap-2 px-4 py-2 bg-green-800">
//                                     Add to Cart <PiShoppingCartSimpleLight style={{ width: "2rem", height: "2rem" }} />
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Fruits;


