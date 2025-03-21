"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { BsArrowRight } from "react-icons/bs";
import { useState } from 'react';
import { baseURL } from '@/api/baseURL';



export default function SliderMainPlaces({ dbData }) {
    const [data, setData] = useState(dbData?.data);


  return (
    <>
    {data && 
    <div className='w-[100%] relative z-0 pb-[5rem]'>
        {data.length > 0 &&
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            navigation
            effect
            pagination={{
            clickable: true,
            }}
            speed={1500}
            loop={true}
            autoplay={{
            delay: 8000,
            disableOnInteraction: true,
            }}
            className='z-[-100] text-white'
            slidesPerView={1} >
            {data.map((i, key) => (
            <SwiperSlide key={key}>
            <div 
                style={{ backgroundImage: `url(${ i?.place_images[0]?.image ? baseURL + i?.place_images[0]?.image : baseURL + 'assets/img/no-img.jpg' })`}}
                className='w-full relative lg:aspect-[5/2] aspect-[5/4] bg-center bg-fixed bg-blue-200 bg-cover'>
                <div className='absolute z-10 bg-gradient-to-t from-black to-transparent opacity-80 bottom-0 left-0 w-[100%] h-[60%]'></div>
                <div className='absolute z-20 top-0 left-0 w-[100%] h-[100%]'>
                    <section className='mx-auto w-[90%] h-[100%] flex flex-col items-start justify-end'>
                        <p className='px-3 uppercase leading-tight font-light tracking-[0.3rem] text-xl drop-shadow-lg'>Zimbabwe World Heritage Sites</p>
                        <h5 className='px-3 py-2 mb-6 text-[3.5rem] leading-tight font-bold w-[50%]'>
                            {i.name}
                        </h5>

                        <div className='px-3 mb-[3rem]'>
                            <Link href={`/place/${i.id}`} className='link__four group'>
                                View More <BsArrowRight className='group-hover:translate-x-2 transition-all duration-150 ease-in-out' />
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
            </SwiperSlide>
            ))}

        </Swiper>
        }
    </div>
    }
    </>
  )
}
