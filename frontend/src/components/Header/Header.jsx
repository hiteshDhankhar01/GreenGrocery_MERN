import { useContext, useState, useEffect } from 'react';
import Logo from '../../assets/image/main.png';
import { TfiSearch } from 'react-icons/tfi';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiSolidLogIn } from 'react-icons/bi';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { IoMdClose } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { authContext } from '../../context/Authcontext';
import { CartContext } from '../../context/CartContext';
import { BASE_URL } from '../../config';
import ProductCard from '../product/ProductCard';

function Header() {
    const { user, token } = useContext(authContext);
    const { cartData, fetchCartItems } = useContext(CartContext);
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState([]);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        // Fetch cart items when the component mounts
        fetchCartItems();
    }, [fetchCartItems]);

    const handleInputChange = async (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);

        try {
            const response = await fetch(
                `${BASE_URL}/product/findProducts?key=${searchValue}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to Fetch Data`);
            }

            const responseData = await response.json();
            const { result } = responseData;
            setProducts(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <nav className="containerzz bg-[#eee] p-2 flex items-center justify-between shadow-2xl border-b-2 border-gry-500">
                {/* Left side */}
                <div className="flex items-center">
                    <div className="flex items-center md:gap-5 gap-[2px] text-[1rem]">
                        <div onClick={() => setMenu(true)} className="md:hidden">
                            <AiOutlineMenu style={{ width: '2.5rem', height: '2rem', color: 'black' }} />
                        </div>
                        <div>
                            {menu && (
                                <div className="fixed top-0 left-0 w-[50%] p-2 h-full bg-white z-50">
                                    <div className="w-full flex justify-end">
                                        <button className="right-0" onClick={() => setMenu(false)} style={{ boxShadow: "none", transform: "scale(1)" }}>
                                            <IoMdClose style={{ width: "1.8rem", height: "1.8rem" }} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center sm:hidden">
                                        <NavLink onClick={() => setMenu(false)} to="/profile" className="border-t-2  border-b-2 w-full text-center">My Account</NavLink>
                                        <NavLink onClick={() => setMenu(false)} to="/about" className="border-b-2 w-full text-center">About</NavLink>
                                        <NavLink onClick={() => setMenu(false)} to="/orders" className="border-b-2 w-full text-center">My Order</NavLink>

                                    </div>
                                </div>
                            )}
                        </div>
                        <NavLink to="/" style={{ width: '45px' }}>
                            <img style={{ width: '45px' }} src={Logo} alt="Logo" />
                        </NavLink>
                        <NavLink to="/about" className="text-black hover:text-green-700 font-medium hidden md:block">
                            About
                        </NavLink>
                        <NavLink to="/orders" className="font-medium text-black hover:text-green-700 hidden md:block">
                            My Order
                        </NavLink>
                    </div>
                </div>
                {/* Middle */}
                <div className="flex items-center rounded-[2px] border-[1px] mx-1 border-gray-300 bg-white">
                    {searchValue.length === 0 && (
                        <div className="h-[100%] border-black rounded-[px] w-fit pl-2">
                            <TfiSearch style={{ width: '1.5rem', height: '2rem', color: 'black' }} />
                        </div>
                    )}
                    <input
                        onChange={handleInputChange}
                        type="text"
                        id="searchInput"
                        placeholder="Search"
                        className="text-[1.4rem] w-[100%] sm:w-full rounded-[px] capitalize px-1 bg-white text-gray-800 focus:outline-none focus:border-none"
                    />
                </div>
                {/* Right Side */}
                <div className="flex items-center ">
                    <div className="md:flex">
                        {token && user ? (
                            <div className="flex gap-2 items-center relative">
                                <NavLink to="/mycart" className="relative">
                                    {cartData && cartData.length !== null && cartData.length !== 0 &&
                                        <span className="absolute top-[-8px] right-[-12px] z-10 bg-red-500 text-[15px] font-medium px-2 rounded-[2rem] text-white">
                                            {cartData.length}
                                        </span>
                                    }
                                    <button className="border-2 text-[2rem] border-[#329967] rounded-[3px] w-fit shadow-none text-[#329967] hover:px-[2px] bg-[#329967] hover:text-white" style={{ boxShadow: "none", transform: "scale(1)" }}>
                                        <PiShoppingCartSimpleLight style={{ width: "2.5rem", height: "2.5rem", color: "white" }} />
                                    </button>
                                </NavLink>
                                <div className="flex flex-row gap-2 items-center pr-2">
                                    <NavLink
                                        to="/profile"
                                        className="flex flex-row items-center gap-2 text-[1.2rem] text-black hover:text-[#329967] hidden sm:block"
                                    >
                                        <img src={user?.photo} alt="" className='h-[2.5rem] w-[2.5rem] rounded-[2rem] border-[2px] border-[#329967]' />
                                        <h2 className='capitalize hidden md:block'>{user?.name}</h2>
                                    </NavLink>
                                </div>
                            </div>
                        ) : (
                            <button className="bg-[#329967] text-white rounded-[5px] px-2 text-[1.6rem] ml-2">
                                <NavLink className="flex items-center" to="/login">
                                    <BiSolidLogIn color="white" /> Sign in
                                </NavLink>
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Search Page */}
            {searchValue.length > 0 && (
                <div className="bg-white">
                    <div className="flex flex-col items-center h-[100%] min-h-screen'">
                        <div className="flex flex-col   w-[80%] mt-4">
                            <h2 className="text-[1.4rem] semibold">{`Showing results for "${searchValue}"`}</h2 >
                            <nav className="flex text-[1.2rem]">
                                <li className="list-none"><NavLink to="/">Home</NavLink></li>
                                <div className="mx-1">/</div>
                                <li className="list-none">Search</li>
                            </nav>
                        </div>
                        <div className='font-semibold flex text-start w-[80%] mt-2 text-[2rem]' >
                            {searchValue.length > 0 && products.length < 1 && <div>
                                No result found
                            </div>}
                        </div>
                        <div>
                            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 hover:bg-red py-4">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;




// import { useContext, useState, useEffect } from 'react';
// import Logo from '../../assets/image/main.png'
// //import defaultProfile from '../../assets/image/defaultProfile.jpg'
// import { TfiSearch } from 'react-icons/tfi'
// import { AiOutlineMenu } from 'react-icons/ai'
// import { authContext } from '../../context/Authcontext';
// import { BiSolidLogIn } from 'react-icons/bi'
// import { BASE_URL } from '../../config';
// import ProductCard from '../product/ProductCard';
// import { PiShoppingCartSimpleLight } from "react-icons/pi";
// import { CartContext } from "../../context/CartContext";
// import { NavLink } from 'react-router-dom';
// import { IoMdClose } from 'react-icons/io'

// function Header() {
//     const { user, token } = useContext(authContext)
//     const [searchValue, setSearchValue] = useState('')
//     const [products, setProducts] = useState([])
//     const [menu, setMenu] = useState(false)

//     const { cartData, fetchCartItems, } = useContext(CartContext);

//     useEffect(() => {
//         // Fetch cart items when the component mounts
//         fetchCartItems();
//     }, [fetchCartItems]);

//     const handleInputChange = async (e) => {

//         const searchValue = e.target.value
//         setSearchValue(searchValue)
//         try {
//             const response = await fetch(`${BASE_URL}/product/findProducts?key=${searchValue}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer${token}`
//                 }
//             })

//             if (!response.ok) {
//                 throw new Error(`Failed to Fetch Data`)
//             }


//             const responseData = await response.json()
//             const { result } = responseData
//             setProducts(result)
//         } catch (error) {
//             console.log(`error` + error)

//         }
//     }

//     console.log(menu)


//     return (
//         <>
//             <nav className="containerzz bg-[#eee] p-2 flex items-center justify-between shadow-2xl border-b-2 border-gry-500">
//                 {/* left side */}
//                 <div className="flex items-center">
//                     <div className="flex items-center md:gap-5 gap-[2px] text-[1rem]">
//                         <div onClick={() => setMenu(true)} className='md:hidden'>
//                             <AiOutlineMenu style={{ width: "2.5rem", height: "2rem", color: "black" }} />
//                         </div>
//                         <div  >
//                             {menu && (
//                                 <div className='fixed top-0 left-0 w-[50%] p-2  h-full bg-white z-50'>
//                                     <div className="w-full flex justify-end">
//                                         <button className="right-0" onClick={() => setMenu(false)} style={{ boxShadow: "none", transform: "scale(1)" }}>
//                                             <IoMdClose style={{ width: "1.8rem", height: "1.8rem" }} />
//                                         </button>
//                                     </div>
//                                     <div className="flex flex-col items-center sm:hidden">
//                                         <NavLink onClick={() => setMenu(false)} to="/profile" className="border-t-2  border-b-2 w-full text-center">My Account</NavLink>
//                                         <NavLink onClick={() => setMenu(false)} to="/about" className="border-b-2 w-full text-center">About</NavLink>
//                                         <NavLink onClick={() => setMenu(false)} to="/orders" className="border-b-2 w-full text-center">My Order</NavLink>

//                                     </div>
//                                 </div>
//                             )}

//                         </div>
//                         <NavLink to="/" style={{ width: "45px" }}>
//                             <img style={{ width: "45px" }} src={Logo} alt="Logo" />
//                         </NavLink>
//                         {/* <NavLink to="/orders" className="text-black hover:text-green-700">My Orders</NavLink> */}
//                         <NavLink to="/about" className="text-black hover:text-green-700 font-medium hidden md:block">About</NavLink>
//                         <NavLink to="/orders" className="font-medium text-black hover:text-green-700 hidden md:block">My Order</NavLink>
//                     </div>

//                 </div>
//                 {/* middle */}
//                 <div className="flex items-center rounded-[2px] border-[1px] mx-1 border-gray-300 bg-white">

//                     {searchValue.length == 0 && <div className='h-[100%]  border-black  rounded-[px] w-fit pl-2'>
//                         <TfiSearch style={{ width: "1.5rem", height: "2rem", color: "black" }} />
//                     </div>}
//                     <input
//                         onChange={handleInputChange}
//                         type="text"
//                         id='searchInput'
//                         placeholder="Search"
//                         className="text-[1.4rem] w-[100%] sm:w-full rounded-[px] capitalize px-1 bg-white text-gray-800 focus:outline-none focus:border-none"
//                     />
//                 </div>

//                 {/* Right Side  */}
//                 <div className="flex items-center ">
//                     <div className=" md:flex">

//                         {token && user ?
//                             (
//                                 <div className='flex gap-2 items-center relative' >
//                                     <NavLink to="/mycart" className="relative">

// {cartData && cartData.length !== null && cartData.length !== 0 &&
//     <span className="absolute top-[-8px] right-[-12px] z-10 bg-red-500 text-[15px] font-medium px-2 rounded-[2rem] text-white">
//         {cartData.length}
//     </span>
// }
// <button className="border-2 text-[2rem] border-[#329967] rounded-[3px] w-fit shadow-none text-[#329967] hover:px-[2px] bg-[#329967] hover:text-white" style={{ boxShadow: "none", transform: "scale(1)" }}>
//     <PiShoppingCartSimpleLight style={{ width: "2.5rem", height: "2.5rem", color: "white" }} />
// </button>
//                                     </NavLink>
//                                     <div className='flex flex-row gap-2 items-center pr-2'>
//                                         <NavLink to="/profile" className="flex flex-row items-center gap-2 text-[1.2rem] text-black hover:text-[#329967] hidden sm:block">
// <img src={user?.photo} alt="" className='h-[2.5rem] w-[2.5rem] rounded-[2rem] border-[2px] border-[#329967]' />
// <h2 className='capitalize hidden md:block'>{user?.name}</h2>
//                                         </NavLink>
//                                     </div>

//                                 </div>
//                             )
//                             :
//                             (<button className=' bg-[#329967] text-white  rounded-[5px] px-2 text-[1.6rem] ml-2'>
//                                 <NavLink className='flex items-center' to="/login"> <BiSolidLogIn color='white' /> Sign in</NavLink></button>)
//                         }
//                     </div>
//                 </div>

//             </nav>
//             {/* searchPage */}



//             {searchValue.length > 0 &&
//                 <div className='bg-white '>
// <div className="flex flex-col items-center h-[100%] min-h-screen'">
//     <div className="flex flex-col   w-[80%] mt-4">
//         <h2 className="text-[1.4rem] semibold">{`Showing results for "${searchValue}"`}</h2 >
//         <nav className="flex text-[1.2rem]">
//             <li className="list-none"><NavLink to="/">Home</NavLink></li>
//             <div className="mx-1">/</div>
//             <li className="list-none">Search</li>
//         </nav>
//     </div>
//     <div className='font-semibold flex text-start w-[80%] mt-2 text-[2rem]' >
//         {searchValue.length > 0 && products.length < 1 && <div>
//             No result found
//         </div>}
//     </div>
//     <div>
//         <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 hover:bg-red py-4">
//             {products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//             ))}
//         </div>
//     </div>
// </div>
//                 </div>
//             }
//         </>
//     );
// }

// export default Header;

