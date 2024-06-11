"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'


export default function TopNav() {
    const [isActive, setIsActive] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
    })
  return (
    <section className='bg__greenBlue text-white'>
        <div className='mx-auto w-[90%] py-2 flex items-center justify-between'>
            <ul className='flex items-center justify-start gap-4'>
                <li className='relative hover:text-green-100'>
                    <span onClick={() => setIsActive({one: !isActive.one})} className='cursor-pointer flex items-center justify-start gap-1'>
                    Settings <IoIosArrowDown /></span>
                    <ul className={`absolute z-100 ${isActive.one == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/app-info' className=''>App Info</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/role' className=''>Roles</Link>
                        </li>
                    </ul>
                </li>
                <li className='relative hover:text-green-100'>
                    <span 
                        onClick={() => setIsActive({two: !isActive.two})} 
                        className='cursor-pointer flex items-center justify-start gap-1'>
                        Users <IoIosArrowDown /></span>
                        <ul className={`absolute z-100 ${isActive.two == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                            <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                                <Link href='/admin/user/add' className=''>Add Users</Link>
                            </li>
                            <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                                <Link href='/admin/user' className=''>User List</Link>
                            </li>
                        </ul>
                </li>
                <li className='relative hover:text-green-100'>
                    <span 
                        onClick={() => setIsActive({three: !isActive.three})} 
                        className='cursor-pointer flex items-center justify-start gap-1'>
                        Places <IoIosArrowDown /></span>
                    <ul className={`absolute z-100 ${isActive.three == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/place/add' className=''>Add Place</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/place' className=''>Place List</Link>
                        </li>
                    </ul>
                </li>
                <li className='relative hover:text-green-100'>
                    <span 
                        onClick={() => setIsActive({eight: !isActive.eight})} 
                        className='cursor-pointer flex items-center justify-start gap-1'>
                        Provinces <IoIosArrowDown /></span>
                    <ul className={`absolute z-100 ${isActive.eight == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/province/add' className=''>Add Province</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/province' className=''>Province List</Link>
                        </li>
                    </ul>
                </li>
                <li className='relative hover:text-green-100'>
                    <span 
                        onClick={() => setIsActive({four: !isActive.four})} 
                        className='cursor-pointer flex items-center justify-start gap-1'>
                    Categories <IoIosArrowDown /></span>
                    <ul className={`absolute z-100 ${isActive.four == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/category/add' className=''>Add Category</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/category' className=''>Category List</Link>
                        </li>
                    </ul>
                </li>
                <li className='relative hover:text-green-100'>
                    <span 
                        onClick={() => setIsActive({five: !isActive.five})} 
                        className='cursor-pointer flex items-center justify-start gap-1'>
                        Cities <IoIosArrowDown /></span>
                    <ul className={`absolute z-100 ${isActive.five == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/city/add' className=''>Add City</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/city' className=''>City List</Link>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul className='flex items-center justify-start gap-4'>
                <li className='relative hover:text-green-100'>
                <span 
                    onClick={() => setIsActive({seven: !isActive.seven})} 
                    className='cursor-pointer flex items-center justify-start gap-1'>
                Profile <IoIosArrowDown /></span>
                <ul className={`absolute z-100 ${isActive.seven == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 right-[-0.5rem] w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                    <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                        <Link href='/admin/profile' className=''>Profile</Link>
                    </li>
                    <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                        <Link href='/admin/profile/email' className=''>Email</Link>
                    </li>
                    <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                        <Link href='/admin/prodile/password' className=''>Password</Link>
                    </li>
                    <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                        <Link href='/logout' className=''>Logout</Link>
                    </li>
                </ul>
            </li>
            </ul>
        </div>
    </section>
  )
}
