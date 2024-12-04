"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { FaCaretRight, FaPhoneAlt } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';



export default function Footer({ appInfoData }) {
    const [data, setData] = useState(appInfoData?.data)

  return (
    <section className='w-[100%] bg-gradient-to-br from-green-500 to-cyan-800'>
        <div className='w-[90%] text-white mx-auto'>
            <section className='w-[100%] flex lg:flex-row flex-col items-start justify-between gap-5 py-12'>
                {/* LOGO */}
                <div className='lg:w-[40%] w-[100%] px-3'>
                    <h5 className='font-extrabold text-[2rem]'>Enjoy
                        <span className='text-black'>Zimbabwe</span>
                    </h5>
                    <p>
                        At Enjoy Zimbabwe, we're passionate about bringing 
                        high-quality experience to the people.
                    </p>
                    <div className='flex items-center justify-start'>

                    </div>
                </div>
                {/* LINKS */}
                <div className='lg:w-[30%] w-[100%] px-3'>
                    <h5 className='text-[2rem] tracking-wide font-bold mb-2'>
                        Our Links
                    </h5>
                    
                    <Link href='/about-us' className='hover:translate-x-2 transition-all duration-300 ease-in-out  flex items-center justify-start gap-2'>
                        <FaCaretRight /> About Us 
                    </Link>
                    <Link href='/contact' className='hover:translate-x-2 transition-all duration-300 ease-in-out  flex items-center justify-start gap-2'>
                        <FaCaretRight /> Contact Us
                    </Link>
                    <Link href='/register' className='hover:translate-x-2 transition-all duration-300 ease-in-out  flex items-center justify-start gap-2'>
                        <FaCaretRight /> Register
                    </Link>
                    <Link href='/login' className='hover:translate-x-2 transition-all duration-300 ease-in-out  flex items-center justify-start gap-2'>
                        <FaCaretRight /> Login
                    </Link>  
                </div>
                <div className='lg:w-[30%] w-[100%] px-3'>
                    <h5 className='text-[2rem] tracking-wide font-bold mb-3'>
                        Our Address
                    </h5>
                    {/* Address */}
                    <div className='flex items-center justify-start gap-3 mb-2'>
                        <div className=''>
                            <FaMapLocationDot />
                        </div>
                        <div>
                            {data?.address}
                        </div>
                    </div>
                    {/*  */}
                    <div className='flex items-center justify-start gap-3 mb-2'>
                        <div className=''>
                            <FaPhoneAlt />
                        </div>
                        <div>
                            {data?.phone}
                        </div>
                    </div>
                    {/* email */}
                </div>
            </section>

            <section className='mx-auto w-[100%] border-t border-slate-300 pt-2 pb-4 flex items-center justify-end text-slate-100'>
                Developed and Maintained By FL Developers.
            </section>
        </div>
    </section>
  )
}
