"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaRegHeart, FaHeart, FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoIosSearch } from 'react-icons/io'



export default function PlaceList() {
    const [data, setData] = useState([
        'a.jpg','b.jpg','c.jpg','d.jpg','e.jpg', 
        'a.jpg','b.jpg','c.jpg', ,'c.jpg','d.jpg',
        'e.jpg', 'a.jpg'
    ]);

    return (
    <>
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[10rem] pb-[5rem]'>
                <h6>Find your best place to visit</h6>
                <div className="w-[80%] mx-auto border border-slate-300 rounded-full overflow-hidden flex items-center justify-start">
                    <input 
                        type="text" 
                        className="w-[50%] outline-none px-5 py-4 border-r border-slate-200" placeholder="Search places by name..." />
                    <select 
                        type="text" 
                        className="w-[40%] outline-none px-5 py-3 border-r border-slate-200" 
                        placeholder="Search places by name...">
                        <option>Select an option</option>
                        <option>Harare</option>
                        <option>Bulawayo</option>
                    </select>
                    <button className="w-[10%] h-[100%] border-none outline-none flex items-center justify-center text-center">
                        <IoIosSearch className="text-2xl transition-all duration-300 ease-in-out hover:text-green-800 hover:drop-shadow-md"/>
                    </button>
            
                </div>
            </div>
        </section>
        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto pb-16'>
                <div className='w-[100%] flex items-center justify-between pb-3'>
                    <h6 className="text-[2.5rem] font-semibold">
                        Places
                    </h6>
                    {/* PAGINATION */}
                    <div className='flex items-center justify-end gap-3'>
                        <button
                            className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                            <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                            Prev 
                        </button>
                        <button 
                            className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                            Next <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out text-green-600' />
                        </button>
                    </div>
                    
                </div>
                {/* DATA */}
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-8 mb-8'>
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
                {/* PAGINATION */}
                <div className='flex items-center justify-end gap-3'>
                        <button
                            className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                            <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                            Prev 
                        </button>
                        <button 
                            className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                            Next <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out text-green-600' />
                        </button>
                    </div>
            </div>

        </section>
    </>
  )
}
