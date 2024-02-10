import { useContext, useEffect, useState } from 'react'
import ProductCard from '../product/ProductCard'
import { authContext } from '../../context/Authcontext'
import { BASE_URL } from '../../config'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const FruitVe = (props) => {
    const { token } = useContext(authContext)

    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProduct()
    }, [])

    const getAllProduct = async () => {
        try {
            const response = await fetch(`${BASE_URL}/product/findProducts?key=${props.productCategoryNew}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data ${response.status} - ${response.statusText}`);
            }

            const responseData = await response.json();
            const { result } = responseData;

            setProducts(result);
        } catch (error) {
            console.log("error is" + error);
        }
    };


    return (
        <div className="bg-gray-100" >
            <div className="flex flex-col items-center">
                <div className="flex flex-col mt-[2rem] mb-[1.5rem]   w-[90%]">
                    <h2 className="text-[2rem]">All <span className='capitalize'>{props.productCategoryNew}s</span></h2 >
                    <nav className="flex text-[1.2rem] gap-2">
                        <li className="list-none hover:text-[#329967]"><NavLink to="/">Home</NavLink></li>
                        <div className="mx-1">/</div>
                        <li className="list-none">All <span className='capitalize'>{props.productCategoryNew}s</span></li>
                    </nav>
                </div>
                <div>
                    <div className='flex items-center mx-auto justify-center bg-gray-100 '>
                        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 hover:bg-red py-4">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>





    )
}

export default FruitVe
