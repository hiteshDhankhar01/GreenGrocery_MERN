import { useContext, useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { authContext } from '../../context/Authcontext';
import { BASE_URL } from '../../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './style.css';
import { Autoplay, Navigation, Virtual } from 'swiper/modules';
import PropTypes from 'prop-types';
import header from '../../next.config'


const Slider = (props) => {
    const { token } = useContext(authContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = async () => {
        try {
            const response = await fetch(`${BASE_URL}/product/findProducts?key=${props.productCategory}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    header
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch data ${response.status} - ${response.statusText}`);
            }
            const responseData = await response.json();
            const { result } = responseData;
            setProducts(result);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    return (
        <div>
            <div className="categorySlider">
                <Swiper
                    // slidesPerView={5}
                    // spaceBetween={30}
                    slidesPerView={1}
                    spaceBetween={10}

                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    navigation={true}
                    autoplay={{
                        delay: 15000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation, Virtual]}
                    className="mySwiper h-[14rem] md:h-[21rem] px-[1.8rem]"
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={product._id} virtualIndex={index}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Slider;

Slider.propTypes = {
    productCategory: PropTypes.string.isRequired
}