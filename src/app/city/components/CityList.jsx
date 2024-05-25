"use client";
import CategoryCarousel from '@/app/components/CategoryCarousel';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaRegHeart, FaHeart, FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoIosSearch } from 'react-icons/io'

export default function CityList() {
    const [data, setData] = useState([
        {city: 'Harare', img:'a.jpg'},
        {city: 'Bulawayo', img:'b.jpg'},
        {city: 'Mutare', img:'c.jpg'},
        {city: 'Hwange', img:'d.jpg'},
        {city: 'Chitungwiza', img:'e.jpg'},
        {city: 'Plumtree', img:'a.jpg'},
        {city: 'Inyanga', img:'b.jpg'},
        {city: 'Bindura', img:'c.jpg'},
    ]);
  return (
    <div>
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[10rem] pb-[5rem]'>
                <h6>Find your a city to visit</h6>
                <div className="w-[80%] mx-auto border border-slate-300 rounded-full overflow-hidden flex items-center justify-start">
                    <input 
                        type="text" 
                        className="w-[90%] outline-none px-5 py-4 border-r border-slate-200" placeholder="Search places by name..." />
                   
                    <button className="w-[10%] h-[100%] border-none outline-none flex items-center justify-center text-center">
                        <IoIosSearch className="text-2xl transition-all duration-300 ease-in-out hover:text-green-800 hover:drop-shadow-md"/>
                    </button>
            
                </div>
            </div>
        </section>

        {/*  */}
        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto pb-[5rem]'>
                <div className='w-[100%] flex items-center justify-between pb-3'>
                    <h6 className="text-[2.5rem] font-semibold">
                        Cities
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
                        <div key={key} className='relative group w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-3'>
                            <img src={`./assets/img/${i.img}`} className='absolute w-[100%] h-[100%] object-cover zoom__inOut' />
                            <span className='heart__icon'>
                                <FaRegHeart  />
                                <FaHeart />
                            </span>
                            <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                            </div>
                            <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[2rem] font-bold flex items-end px-3 pb-4'>
                                <Link href='/city/1' className='link__two'>
                                    {i.city} 
                                </Link>
                                
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

        <CategoryCarousel title='Top Categories' />

    </div>
  )
}
