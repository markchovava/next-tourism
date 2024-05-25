"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa6";



export default function Grid8({title}) {
    const [data, setData] = useState(['a.jpg','b.jpg','c.jpg','d.jpg','e.jpg', 'a.jpg','b.jpg','c.jpg']);

  return (
    <section className='w-[100%]'>
        <div className='w-[90%] mx-auto pb-[5rem]'>
            <div className='w-[100%] flex items-center justify-between'>
                <h6 className="text-[2.5rem] font-semibold pb-4">{title}</h6>
                <Link href='#'>
                    <span className='font-semibold link__one'>View More</span>
                </Link>
            </div>
            <div className='grid lg:grid-cols-4 grid-cols-2 gap-8'>
                {/* COL */}
                {data.map((i, key) => (
                    <div key={key} className='group'>
                        <div className='relative w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-2'>
                            <img src={`./assets/img/${i}`} className='w-[100%] h-[100%] object-cover zoom__inOut' />
                            <span className='heart__icon'>
                                <FaRegHeart  />
                                <FaHeart />
                            </span>
                        </div>
                            <div className='pb-2 px-4'>
                                <Link href='#'>
                                    <p className='mb-2 font-semibold link__one'>
                                        Lorem ipsum dolor sit. 
                                    </p>
                                </Link>
                                <p className='mb-2 flex items-center justify-start gap-2'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaRegStar />
                                </p>
                                <p>Harare</p>
                            </div>
                    </div>

                ))}
            </div>
        </div>

    </section>
  )
}
