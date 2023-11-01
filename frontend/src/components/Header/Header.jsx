import { useContext, useState } from 'react';
import Logo from '../../assets/image/main.png'
//import defaultProfile from '../../assets/image/defaultProfile.jpg'
import { TfiSearch } from 'react-icons/tfi'
import { AiOutlineMenu } from 'react-icons/ai'
import { authContext } from '../../context/Authcontext';
import { BiSolidLogIn } from 'react-icons/bi'
import { BASE2_URL } from '../../config';
//import { PiShoppingCartSimpleLight } from "react-icons/pi";
import ProductCard from '../product/ProductCard';

function Header() {
    const { user, token } = useContext(authContext)
    const [searchValue, setSearchValue] = useState('')
    const [products, setProducts] = useState([])

    const handleInputChange = async (e) => {

        const searchValue = e.target.value
        setSearchValue(searchValue)
        console.log(searchValue)
        try {
            const response = await fetch(`${BASE2_URL}/product/findProducts?key=${searchValue}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer${token}`
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to Fetch Data`)
            }


            const responseData = await response.json()
            const { result } = responseData
            console.log(result)
            setProducts(result)
        } catch (error) {
            console.log(`error` + error)

        }
    }



    return (
        <>
            <nav className="container bg-[#eee] p-2 flex items-center justify-between shadow-2xl border-b-2 border-gry-500">
                {/* left side */}
                <div className="flex items-center">
                    <div className="flex items-center gap-5 text-[1rem]">
                        <div className='hidden'><AiOutlineMenu /></div>
                        <a href="/"><img style={{ width: "45px" }} src={Logo} alt="Logo" /></a>
                        <a href="/fruits" className="text-black hover:text-green-700">Fruits</a>
                        <a href="/vegetabels" className="text-black hover:text-green-700">Vegitables</a>
                    </div>

                </div>
                {/* middle */}
                <div className="flex items-center rounded-[2px] border-[1px] mx-4 border-black bg-white">
                    <input
                        onChange={handleInputChange}
                        type="text"
                        id='searchInput'
                        placeholder="Search"
                        className="text-[1.6rem] rounded-[px] capitalize px-1 bg-white text-gray-800 focus:outline-none focus:border-none"
                    />
                    <button className='h-[100%] border-l-[1px] border-black  rounded-[px] bg-[#329967] w-full pl-2'>
                        <TfiSearch style={{ width: "2rem", height: "2.5rem", color: "white" }} />
                    </button>
                </div>

                {/* Right Side  */}
                <div className="flex items-center ">
                    <div className=" md:flex">

                        {token && user ?
                            (<div className='flex flex-row gap-2 items-center pr-2'>
                                <a href="/profile" className="flex items-center gap-2 text-[1.2rem] text-black hover:text-[#329967]">
                                    <img src={user?.photo} alt="" className='h-[2.5rem] w-[2.5rem] rounded-[2rem] border-[2px] border-[#329967]' />
                                    <h2 className='capitalize'>{user?.name}</h2>
                                </a>
                            </div>)
                            :
                            (<button className=' bg-[#329967] text-white  rounded-[5px] px-2 text-[1.6rem] ml-2'>
                                <a className='flex items-center' href="/login"> <BiSolidLogIn color='white' /> Sign in</a></button>)
                        }
                    </div>
                </div>

            </nav>
            {/* searchPage */}



            {searchValue.length > 0 &&
                <div className='bg-white container h-[100%]'>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col   w-[80%] mt-4">
                            <h2 className="text-[1.4rem] semibold">{`Showing results for "${searchValue}"`}</h2 >
                            <nav className="flex text-[1.2rem]">
                                <li className="list-none"><a href="/">Home</a></li>
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
            }
        </>
    );
}

export default Header;

