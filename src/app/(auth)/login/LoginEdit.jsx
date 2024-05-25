"use client";

import Link from 'next/link';
import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';




export default function LoginEdit() {
  return (
    <section className='w-[100%]'>
        <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[8rem] pb-[5rem]'>
            <h6>Login</h6>
            <section className="w-[50%] mx-auto bg-white drop-shadow-lg rounded-lg overflow-hidden px-6 py-8">
                
                <div className='mb-4'>
                    <button className='text-white rounded-lg px-6 py-4 bg-gradient-to-br from-blue-500 to-green-600 hover:bg-gradient-to-br hover:from-green-500 hover:to-blue-600 transition-all duration-200 ease-in-out'>
                        Sign in with Gmail</button>
                </div>

                <div className='flex items-center justify-between gap-2 mb-4'>
                    <hr className='border-slate-500 w-[50%]' />
                    <span className=''>OR</span>
                    <hr className='border-slate-500 w-[50%]' />
                </div>

                <div className=' mb-[1.5rem]'> 
                    <Link href='/register' className='transition-all ease-in-out underline hover:no-underline text-green-600 hover:text-green-700'>
                        Create a new Account</Link>
                </div>

                <div className='mb-4'>
                    <p className='font-semibold mb-1'>Email:</p>
                    <input type='text' className='w-[100%] outline-none border border-slate-300 px-4 py-3 rounded-lg' />
                </div>
                <div className='mb-4'>
                    <p className='font-semibold mb-1'>Password:</p>
                    <input type='text' className='w-[100%] outline-none border border-slate-300 px-4 py-3 rounded-lg' />
                </div>

                {/* BUTTON */}
                <div className='w-[100%] flex items-center justify-center'>
                    <button className='flex items-center justify-center gap-3 group text-white duration-200 transition-all ease-in-out text-md rounded-full p-5 w-[20rem] bg-gradient-to-br from-green-600 to-cyan-700 hover:drop-shadow-md hover:bg-gradient-to-br hover:from-cyan-700 hover:to-green-600'>
                        Submit <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                    </button>
                </div>
        
            </section>
        </div>
    </section>
  )
}
