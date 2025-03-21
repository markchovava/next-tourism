"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation, Coverflow, Scrollbar, A11y} from 'swiper/modules';
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useState } from 'react';
import Link from 'next/link';
import { baseURL } from '@/api/baseURL';




export default function CarouselGuide({ city_slug, title, dbData }) {
    const [data, setData] = useState(dbData?.data)

    return (
        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto pb-[5rem]'>
                <section className='hidden lg:block '>
                    <div className='w-[100%] flex items-center justify-between pb-4'>
                        <h6 className="text-[2.5rem] font-semibold ">
                            {title}
                        </h6>
                        <Link href='/guide'>
                            <span className='font-semibold link__one'>View More</span>
                        </Link>
                    </div>
                    <Swiper 
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        effect="fade"
                        spaceBetween={30}
                        slidesPerView={4}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className='card__transparent' >
                        {data?.map((i, key) => (
                            <SwiperSlide key={key} className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-3'>
                                    <img src={i?.portrait ? baseURL + i?.portrait : baseURL + 'assets/img/no-img.jpg'} className='absolute w-[100%] h-[100%] object-cover zoom__inOut' />
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                                    </div>
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[2rem] font-bold flex items-end px-3 pb-4'>
                                        <Link 
                                        href={`/city/guide/${city_slug}/${i.slug}/`} 
                                        className='link__two leading-tight'>
                                            {i.name}
                                        </Link>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>      
                        ))}
                    </Swiper>
                </section>
                {/*  */}
                <section className='lg:hidden block'>
                    <div className='w-[100%] flex items-center justify-between pb-3'>
                        <h6 className="text-[2.5rem] font-semibold">
                            {title}
                        </h6>
                        <Link href='/guide' className='flex items-center justify-center'>
                            <span className='flex items-center justify-center font-semibold link__one'>View More</span>
                        </Link>
                    </div>
                    <Swiper 
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        effect="fade"
                        spaceBetween={30}
                        slidesPerView={1.5}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className='card__transparent' >
                        {data.map((i, key) => (
                            <SwiperSlide key={key} className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-3'>
                                    <img src={ i?.portrait ? baseURL + i?.portrait : baseURL + 'assets/img/no-img.jpg' } className='absolute w-[100%] h-[100%] object-cover zoom__inOut' />
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                                    </div>
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[2rem] font-bold flex items-end px-3 pb-4'>
                                        <Link href={`/guide/${i.slug}`} className='link__two'>
                                            {i.name}
                                        </Link>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>      
                        ))}
                    </Swiper>
                </section>
            </div>
        </section>
    )
}
