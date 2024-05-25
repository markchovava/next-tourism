import Link from 'next/link'
import React from 'react'
import { FaArrowLeftLong, FaArrowRightLong, FaRegStar, FaStar } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'

export default function page() {
  return (
    <div>
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[10rem] pb-[5rem]'>
                <h6>Find your a place to review to visit</h6>
                <div className="w-[80%] mx-auto border border-slate-300 rounded-full overflow-hidden flex items-center justify-start">
                    <input 
                        type="text" 
                        className="w-[90%] outline-none px-5 py-4 border-r border-slate-200" 
                        placeholder="Search places by name..." />
                   
                    <button className="w-[10%] h-[100%] border-none outline-none flex items-center justify-center text-center">
                        <IoIosSearch className="text-2xl transition-all duration-300 ease-in-out hover:text-green-800 hover:drop-shadow-md"/>
                    </button>
            
                </div>
            </div>
        </section>
        {/*  */}
        <section className='w-[100%]'>
            <div className='mx-auto w-[80%] mb-[5rem]'>
                <section className='flex justify-start items-center gap-8 pb-[2rem] mb-[2rem] border-b border-slate-300'>
                    <div className='w-[20rem] rounded-xl aspect-[10/7] bg-green-400'>
                    </div>
                    <div className='text-lg'>
                        <Link href='/review/edit/1' className='link__one'>
                            <h4 className='mb-3 font-semibold text-[2rem]'>
                                Sheraton Hotel
                            </h4>
                        </Link>
                        <p className='mb-2 flex items-center justify-start gap-2 text-green-800'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                        </p>
                        <p className='italic text-green-800'>Harare</p>
                        <p className='mb-2'> 
                            <span className='font-bold'>Contact: </span>
                            Lorem ipsum dolor sit amet consectetur adipisicing 
                            elit. 
                        </p>
                    </div>
                </section>
                {/*  */}
                <section className='flex justify-start items-center gap-8 pb-[2rem] mb-[2rem] border-b border-slate-300'>
                    <div className='w-[20rem] rounded-xl aspect-[10/7] bg-green-400'>
                    </div>
                    <div className='text-lg'>
                        <Link href='/review/edit/1' className='link__one'>
                            <h4 className='mb-3 font-semibold text-[2rem]'>
                                Sheraton Hotel
                            </h4>
                        </Link>
                        <p className='mb-2 flex items-center justify-start gap-2 text-green-800'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                        </p>
                        <p className='italic text-green-800'>Harare</p>
                        <p className='mb-2'> 
                            <span className='font-bold'>Contact: </span>
                            Lorem ipsum dolor sit amet consectetur adipisicing 
                            elit. 
                        </p>
                    </div>
                </section>

              
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

    </div>
  )
}
