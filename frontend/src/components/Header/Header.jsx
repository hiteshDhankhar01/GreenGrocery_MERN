import { useContext, useState, useEffect } from 'react';
import Logo from '../../assets/image/main.png';
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineMenu } from 'react-icons/ai';
import { BiSolidLogIn } from 'react-icons/bi';
import { CgClose } from "react-icons/cg";
import { NavLink } from 'react-router-dom';
import { authContext } from '../../context/Authcontext';
import { CartContext } from '../../context/CartContext';
import { BASE_URL } from '../../config';
import ProductCard from '../product/ProductCard';





const HeaderPro = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, token } = useContext(authContext);
    const { cartData, fetchCartItems } = useContext(CartContext);
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState([]);
    

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }


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
        <div>
            <div className="stickey top-0 left-0 right-0 py-3 mx-auto bg-[#eee] [#329967] flex justify-between items-center z-50">
                {/* Logo */}
                <div className="text-black pl-2 flex">
                    <NavLink to="/" className="relative  flex my-auto ">
                        <img className='w-[45px]' src={Logo} alt="" />
                        <h1 className=' font-bold text-[1.5rem] hidden md:flex my-auto ml-2 text-[#329967] '>GreenGrocery</h1>
                    </NavLink>


                </div>

                <div className="sm:min-w-[22rem]">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={handleInputChange}
                        className="aw-[100vh] text-[1rem] w-full px-2 py-1 border  focus:outline-none border-[#329967]"
                    />
                </div>


                {/* Mobile Menu and Search Bar */}
                <div className="md:hidden flex items-center ">


                    {/* Mobile Menu Button */}
                    <button onClick={toggleNavbar} className="text-[#329967] pr-2  shadow-none" style={{ boxShadow: "none", transform: "scale(1)" }}>
                        {isOpen ? <CgClose className='h-[2rem] w-[2rem] ' /> : <AiOutlineMenu className='h-[2rem] w-[2rem]' />}
                    </button>
                </div>

                {/* Desktop Menu and Search Bar */}
                <div className="hidden md:flex items-center gap-4 pr-4">
                    {token && user ? (
                        <>

                            {/* Desktop Menu Links */}


                            <button className=" border-2 ] border-[#329967]   w-fit px-2  bg-green-50 shadow-none text-[#329967] hover:bg-[#329967] hover:text-white" style={{ boxShadow: "none", transform: "scale(1)" }}>
                                <NavLink to="/mycart" className="relative  flex my-auto ">
                                    {cartData && cartData.length !== null && cartData.length !== 0 &&

                                        <span className="absolute top-[-8px] right-[-12px] z-10 bg-red-500 text-white text-[15px] font-medium px-2 rounded-[2rem]  ">
                                            {cartData.length}
                                        </span>
                                    }
                                    <span className='my-auto'>
                                        Cart
                                    </span>
                                    <div className='my-auto'>
                                        <IoCartOutline className='h-[2rem] w-[2rem] ' />
                                    </div>
                                </NavLink>
                            </button>

                            <button className="border-2 ] border-[#329967]   w-fit px-2  bg-green-50 shadow-none text-[#329967] hover:bg-[#329967] hover:text-white" style={{ boxShadow: "none", transform: "scale(1)" }}>
                                <NavLink to="/profile" className="relative  flex my-auto ">
                                    <span className='my-auto'>
                                        Account
                                    </span>
                                    <div className='my-auto'>
                                        <RiAccountCircleLine className='h-[2rem] w-[2rem]' />
                                    </div>
                                </NavLink>
                            </button>
                        </>
                    ) : (
                        <button className="border-2 px-2  border-[#329967]   w-fit ] bg-green-50 shadow-none text-[#329967] hover:bg-[#329967] hover:text-white" style={{ boxShadow: "none", transform: "scale(1)" }}>
                            <NavLink to="/login" className="relative  flex my-auto ">
                                <span className='my-auto text-[1.5rem]'>
                                    Login
                                </span>
                                <div className='my-auto'>
                                    <BiSolidLogIn className='h-[2rem] w-[2rem]' />
                                </div>
                            </NavLink>
                        </button>
                    )}
                </div>

                {/* Mobile Menu Links */}
                {isOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-[#329967] p-4 z-30">
                        {token && user ? (
                            <>
                            <a href="/profile" className="block text-white mb-2">Account</a>
                            <a href="/mycart" className="block text-white mb-2">My Cart</a>
                            <a href="/orders" className="block text-white mb-2">My Orders</a>
                        </>
                        ) : (
                            <>
                                <a href="/login" className="block text-white mb-2">Login</a>
                            </>
                            )
                        }
                    </div>
                )}
            </div>
            {/* Search Page */}
            {
                searchValue.length > 0 && (
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
                )
            }
        </div >



    )
}

export default HeaderPro