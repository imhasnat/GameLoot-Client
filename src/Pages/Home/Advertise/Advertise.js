import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import ad from '../../../assets/advertise.gif'

import { Autoplay, Pagination, Navigation } from "swiper";

const Advertise = () => {

    const { data: advertises = [], isLoading } = useQuery({
        queryKey: ['advertises'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/product/advertise`)
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className={`${advertises.length ? 'block mx-auto w-9/12 mt-10' : 'hidden'}`}>
            <h1 className='text-4xl font-bold text-center mb-5'><span className='text-primary font-bold'>Advertised</span> Products</h1>
            <div className='flex justify-around'>
                <div className="hidden md:flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                    <img src={ad} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                </div>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"

                >
                    <div className=''>
                        {
                            advertises?.map((advertise, i) =>
                                <SwiperSlide key={i}>
                                    <img className='w-48' src={advertise.imageUrl} alt="t" />
                                </SwiperSlide>)
                        }
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default Advertise;