import Link from 'next/link'
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

export default function NavigationMain() {
    const [isToggle, setIsToggle] = useState(false)
  return (
    <>
    {/* NAVIGATION */}
    <section className="w-[100%]">
    <nav className="w-[90%] lg:block hidden mx-auto border-b border-slate-200">
        <ul className="font-semibold flex justify-start items-center gap-4 h-[100%] text-black">
            <li className="py-2 ">
                <Link href='/' className="hover:text-green-600 ">Home</Link>
            </li>
            <li className="py-2 ">
                <Link href='/guide-place/places-to-visit' className="hover:text-green-600 ">Places to visit</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/things-to-see' className="hover:text-green-600 ">Things to see</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/special-activities' className="hover:text-green-600 ">Special Activities</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/where-to-eat-and-sleep' className="hover:text-green-600 ">Where to eat & sleep</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/entertainment' className="hover:text-green-600 ">Entertainment</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/holiday-resorts' className="hover:text-green-600 ">Holiday Resorts</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/historical-buildings' className="hover:text-green-600 ">Historical Buildings</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/wildlife-heritage' className="hover:text-green-600 ">Wildlife Heritage</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/national-heritage' className="hover:text-green-600 ">National Heritage</Link>
            </li>
           
        </ul>
    </nav>

    {/* RESPONSIVE NAVIGATION */}
    <div className='mx-auto w-[90%] lg:hidden flex items-center justify-end'>
        <button className='text-xl py-3' onClick={() => setIsToggle(!isToggle)}>
            {isToggle === true ? <MdOutlineClose /> : <GiHamburgerMenu />}
        </button>
    </div>
    {isToggle == true &&
    <nav className="w-[90%] block lg:hidden mx-auto border-b border-slate-200">
        <ul className="font-semibold flex flex-col justify-start items-center gap-4 h-[100%] text-black">
            <li className="py-2 ">
                <Link href='/' className="hover:text-green-600 ">Home</Link>
            </li>
            <li className="py-2 ">
                <Link href='/guide-place/places-to-visit' className="hover:text-green-600 ">Places to visit</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/things-to-see' className="hover:text-green-600 ">Things to see</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/special-activities' className="hover:text-green-600 ">Special Activities</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/where-to-eat-and-sleep' className="hover:text-green-600 ">Where to eat & sleep</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/entertainment' className="hover:text-green-600 ">Entertainment</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/holiday-resorts' className="hover:text-green-600 ">Holiday Resorts</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/historical-buildings' className="hover:text-green-600 ">Historical Buildings</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/wildlife-heritage' className="hover:text-green-600 ">Wildlife Heritage</Link>
            </li>
            <li className="py-2">
                <Link href='/guide-place/national-heritage' className="hover:text-green-600 ">National Heritage</Link>
            </li>
           
        </ul>
    </nav>
    }
    </section>
    </>
  )
}
