"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation, Coverflow, Scrollbar, A11y} from 'swiper/modules';
import { useState } from 'react';
import Link from 'next/link';
import { baseURL } from '@/api/baseURL';
import Image from 'next/image';


export default function CarouselGuidePlaces({guide_slug, title, dbData}) {
    //console.log(title + ' Places:', dbData)
    const slug = guide_slug;
    const [data, setData] = useState(dbData?.data)

    if(!data.length > 0){return '';}

    return (
        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto pt-[2rem] pb-[5rem]'>
                <section className='hidden lg:block'>
                    <div className='w-[100%] flex items-center justify-between'>
                        <h6 className="text-[2.5rem] font-semibold pb-4">
                            {title}
                        </h6>
                        <Link href={`/guide-place/${slug}`}>
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
                        className='card' >
                        {data.map((i, key) => (
                            <SwiperSlide key={key} className=' bg-white overflow-hidden drop-shadow-md hover:drop-shadow-xl'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-3'>
                                    <figure className='absolute w-[100%] h-[100%] object-cover zoom__inOut'>
                                    <Image 
                                        src={i?.place_images[0]?.image ? baseURL + i?.place_images[0]?.image : baseURL + 'assets/img/no-img.jpg'} 
                                        layout="fill"
                                        objectFit="cover"
                                        alt={i.name} />
                                    </figure>
                                </div>
                                <div className='pb-2 px-4'>
                                    <Link href={`/place/${i.id}`}>
                                        <p className='mb-2 font-semibold link__one'>
                                            {i.name}
                                        </p>
                                    </Link>
                                    {/* STAR */}
                                    {i?.rating?.rate &&
                                    <>
                                    {i?.rating?.rate > 0 &&
                                        <StarRate dbData={i?.rating} />
                                    }
                                    </>
                                    }
                                    <p>{i.city?.name}</p>
                                </div>
                            </SwiperSlide>      
                        ))}
                    </Swiper>
                </section>
                {/* RESPONSIVE */}
                <section className='lg:hidden block'>
                    <div className='w-[100%] flex items-center justify-between'>
                        <h6>
                            {title}
                        </h6>
                        <Link href={`/guide-place/${slug}`}>
                            <span className='font-semibold link__one'>View More</span>
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
                        className='card' >
                        {data.map((i, key) => (
                            <SwiperSlide key={key} className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='group w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-3 relative'>
                                    <figure className='absolute w-[100%] h-[100%] object-cover zoom__inOut'>
                                        <Image 
                                            src={i?.place_images[0]?.image ? baseURL + i?.place_images[0]?.image : baseURL + 'assets/img/no-img.jpg'} 
                                            layout="fill"
                                            objectFit="cover"
                                        alt={i.name} />
                                    </figure>
                                </div>
                                <div className='pb-2 px-4'>
                                    <Link href={`/place/${i.id}`}>
                                        <p className='mb-2 font-semibold link__one'>
                                            {i.name} 
                                        </p>
                                    </Link>
                                    {/* STAR */}
                                    {i?.rating?.rate &&
                                    <>
                                    {i?.rating?.rate > 0 &&
                                        <StarRate dbData={i?.rating} />
                                    }
                                    </>
                                    }
                                    <p>{i.city?.name}</p>
                                </div>
                            
                            </SwiperSlide>      
                        ))}
                    </Swiper>
                </section>
            </div>
        </section>
    )

}


