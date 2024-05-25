import React from 'react'
import { FaArrowRightLong, FaRegStar } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'



export default function ReviewEdit({ id }) {
  return (
    <section className='w-[100%] pb-[5rem]'>
        {/*  */}
        <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[8rem] pb-[2rem]'>
            <h4 className='text-[3.5rem] font-semibold'>Edit Review.</h4>    
        </div>
        {/*  */}
        <div className='mx-auto w-[90%] mb-[5rem]'>
            <section className='flex lg:flex-row flex-col justify-start items-center gap-8'>
                <div className='lg:w-[25rem] w-[100%] rounded-xl aspect-[10/7] bg-green-400'>
                </div>
                <div className='text-lg'>
                    <h4 className='mb-3 font-semibold text-3xl'>Lorem, ipsum dolor.</h4>
                    <p className='mb-2'> 
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea fugiat dolorum, 
                        animi sit mollitia quo! Lorem ipsum dolor sit amet consectetur adipisicing 
                        elit. Explicabo nulla adipisci dolores nam saepe, 
                        consectetur iusto sequi praesentium. Iste, velit.
                    </p>
                    <p className='mb-2'> 
                        <span className='font-bold'>Contact: </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing 
                        elit. 
                    </p>
                </div>
            </section>
        </div>
        {/*  */}
        <div className='mx-auto w-[80%]'>
            <h5 className='mb-4'>Write your Review</h5>
            {/*  EMAIL */}
            <div className='mb-4'>
                <div className='font-semibold mb-1'>Email:</div>
                <input 
                type='text' 
                placeholder='Enter Email here...'
                className='outline-none border border-slate-300 px-5 py-4 rounded-xl w-[100%]' />
            </div>
            {/* REVIEW */}
            <div className='mb-4'>
                <div className='font-semibold mb-1'>Review out of 5:</div>
                <p className='text-xl cursor-pointer mb-2 flex items-center justify-start gap-3'>
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                </p>
            </div>
            {/* TEXT AREA */}
            <div className='mb-4'>
                <div className='font-semibold mb-1'>Review:</div>
                <textarea  
                placeholder='Write your Review here...'
                className='outline-none border border-slate-300 h-[10rem] px-5 py-4 rounded-xl w-[100%]'></textarea>
            </div>
            {/* BUTTON */}
            <div className='w-[100%] flex items-center justify-center mb-4'>
                <button className='flex items-center justify-center gap-3 group text-white duration-200 transition-all ease-in-out text-lg rounded-full px-5 py-6 w-[20rem] bg-gradient-to-br from-green-600 to-cyan-700 hover:bg-gradient-to-br hover:from-cyan-700 hover:to-green-600'>
                    Submit <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                </button>
            </div>
        </div>
    </section>
  )
}
