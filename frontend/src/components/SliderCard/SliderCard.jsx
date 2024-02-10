// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider1 from "../../assets/image/slider1.jpg";
import Slider2 from "../../assets/image/slider2.jpg";
import Slider3 from "../../assets/image/slider3.jpg";
import Slider4 from "../../assets/image/slider4.jpg";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css'

// import required modules
import { Autoplay, Pagination,} from 'swiper/modules';

const SliderCard = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                
                modules={[Autoplay, Pagination,]}
                className="mySwiper h-[15rem] md:h-[21rem] mt-[4rem]"
            >
                <SwiperSlide>
                    <div className="vcv" style={{ backgroundImage: `url(${Slider1})` }}>
                        <div className="pl-2 md:pl-[4rem]">
                            <h2 className='vvv flex flex-start text-[2rem]   md:text-[3rem] mt-[2rem]'>Shop Fresh <div className=' text-[#329967] ml-[1rem]'> Fruit </div></h2>
                            <h2 className='vvv flex flex-start  text-[2rem]   md:text-[3rem]'>and <div className=' text-[#329967] mx-[1rem]'> vegetabel </div>Today</h2>
                            <p className='vvv flex flex-start text-[.9rem]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad.</p>
                            <button className='text-[1rem] md:text-[1.6rem] bg-[#329967] text-white p-2 rounded-xl  flex flex-start ml-4 mt-4'><b>Shop Now</b></button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="vcv" style={{ backgroundImage: `url(${Slider2})` }}>
                        <div className=" pl-2 md:pl-[4rem] text-white">
                            <h2 className='vvv flex flex-start   text-[2rem]   md:text-[3rem] mt-[2rem]'>Shop Fresh <div className=' text-[#F70101] ml-[1rem]'> Fruit </div></h2>
                            <h2 className='vvv flex flex-start   text-[2rem]   md:text-[3rem]'>and <div className=' text-[#F70101] mx-[1rem]'> vegetabel </div>Today</h2>
                            <p className='vvv flex flex-start text-[.9rem]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad.</p>
                            <button className='text-[1rem] md:text-[1.6rem] bg-[#F70101] text-white p-2 rounded-xl  flex flex-start ml-4 mt-4'><b>Shop Now</b></button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="vcv" style={{ backgroundImage: `url(${Slider3})` }}>
                        <div className=" pl-2 md:pl-[4rem] text-white">
                            <h2 className='vvv flex flex-start   text-[2rem]   md:text-[3rem] mt-[2rem]'>Shop Fresh <div className=' text-[#F27E02] ml-[1rem]'> Fruit </div></h2>
                            <h2 className='vvv flex flex-start  text-[2rem]   md:text-[3rem]'>and <div className=' text-[#F27E02] mx-[1rem]'> vegetabel </div>Today</h2>
                            <p className='vvv flex flex-start text-[.9rem]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad.</p>
                            <button className='text-[1rem] md:text-[1.6rem] bg-[#F27E02] text-white p-2 rounded-xl  flex flex-start ml-4 mt-4'><b>Shop Now</b></button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="vcv" style={{ backgroundImage: `url(${Slider4})` }}>
                        <div className=" pl-2 md:pl-[4rem] text-black ">
                            <h2 className='vvv  flex flex-start   text-[2rem]   md:text-[3rem] mt-[2rem]'>Shop Fresh <div className=' text-[#e7a608] ml-[1rem]'> Fruit </div></h2>
                            <h2 className='vvv flex flex-start  text-[2rem]   md:text-[3rem]'>and <div className=' text-[#e7a608] mx-[1rem]'> vegetabel </div>Today</h2>
                            <p className='vvv flex flex-start text-[.9rem]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad.</p>
                            <button className='text-[1rem] md:text-[1.6rem] bg-[#e7a608] text-white p-2 rounded-xl  flex flex-start ml-4 mt-4'><b>Shop Now</b></button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default SliderCard;
