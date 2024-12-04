"use client";
import { baseURL } from '@/api/baseURL';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import StarRate from './StarRate';



export default function GridPlaces({title, placesOne}) {
    const [data, setData] = useState(placesOne.data);

  return (
    <section className='w-[100%]'>
        <div className='w-[90%] mx-auto pb-[5rem]'>
            <div className='w-[100%] flex items-center justify-between'>
                <h6 className="text-[2.5rem] font-semibold pb-4">{title}</h6>
                <Link href='/place'>
                    <span className='font-semibold link__one'>View More</span>
                </Link>
            </div>
            <div className='grid lg:grid-cols-4 grid-cols-2 gap-8'>
                {/* COL */}
                {data.map((i, key) => (
                    <div key={key} className='group'>
                        <div className='relative w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-2'>
                            <img src={baseURL + i.place_images[0].image} className='w-[100%] h-[100%] object-cover zoom__inOut' />
                           
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
                    </div>

                ))}
            </div>
        </div>

    </section>
  )
}
