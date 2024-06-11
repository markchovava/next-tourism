"use client";
import { baseURL } from '@/api/baseURL';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaRegHeart, FaHeart, FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoIosSearch } from 'react-icons/io'



export default function PlaceList({places}) {
    const [data, setData] = useState(places.data);
    const [search, setSearch] = useState({});
    const [isSearch, setIsSearch] = useState(false);
    /* PAGINATION */
    const [nextURL, setNextURL] = useState(places.links.next)
    const [prevURL, setPrevURL] = useState(places.links.prev)
    const config = {
        headers: {
        'Content-Type': 'application/json',
    }};
    /* PAGINATION DATA */
    async function paginationHandler(url) {
        try{
        const result = await axios.get(url, config)
        .then((response) => {
            setData(response.data.data)
            setPrevURL(response.data.links.prev)
            setNextURL(response.data.links.next)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }     
    }


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
                        { prevURL && 
                            <button
                                onClick={() => paginationHandler(prevURL)}
                                className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                                <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                                Prev 
                            </button>
                        }
                        { nextURL && 
                            <button 
                                onClick={() => paginationHandler(nextURL)}
                                className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                                Next <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out text-green-600' />
                            </button>
                        }
                    </div>
                    
                </div>
                {/* DATA */}
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-8 mb-8'>
                    {/* COL */}
                    {data.map((i, key) => (
                        <div key={key} className='group'>
                            <div className='relative w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-2'>
                                <img src={baseURL + i.place_images[0].image  } className='w-[100%] h-[100%] object-cover zoom__inOut' />
                                <span className='heart__icon'>
                                    <FaRegHeart  />
                                    <FaHeart />
                                </span>
                            </div>
                                <div className='pb-2 px-4'>
                                    <Link href={`/place/${i.id}`}>
                                        <p className='mb-2 font-semibold link__one'>
                                            {i.name} 
                                        </p>
                                    </Link>
                                    <p className='mb-2 flex items-center justify-start gap-2'>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar />
                                    </p>
                                    <p>{i.city?.name}</p>
                                </div>
                        </div>

                    ))}
                </div>
                {/* PAGINATION */}
                <div className='flex items-center justify-end gap-3'>
                        { prevURL && 
                            <button
                                onClick={() => paginationHandler(prevURL)}
                                className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                                <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                                Prev 
                            </button>
                        }
                        { nextURL && 
                            <button 
                                onClick={() => paginationHandler(nextURL)}
                                className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                                Next <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out text-green-600' />
                            </button>
                        }
                    </div>
            </div>

        </section>
    </>
  )
}
