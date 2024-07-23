"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlineClose } from 'react-icons/md'



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
        nine: false,
        ten: false,
        eleven: false,
    })
    const [isToggle, setIsToggle] = useState(false)
  return (
    <>
    <section className='bg__greenBlue text-white'>
        {/* NAVIGATION */}
        <div className='mx-auto w-[90%] hidden py-2 lg:flex items-center justify-between'>
            <ul className='flex items-center justify-start gap-4'>
                {/*  */}
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
                {/*  */}
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
                {/*  */}
                <li className='relative hover:text-green-100'>
                    <span 
                        onClick={() => setIsActive({nine: !isActive.nine})} 
                        className='cursor-pointer flex items-center justify-start gap-1'>
                        Events <IoIosArrowDown /></span>
                    <ul className={`absolute z-100 ${isActive.nine == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/event/add' className=''>Add Event</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/event' className=''>Event List</Link>
                        </li>
                    </ul>
                </li>
                {/*  */}
                <li className='relative hover:text-green-100'>
                    <span 
                        onClick={() => setIsActive({ten: !isActive.ten})} 
                        className='cursor-pointer flex items-center justify-start gap-1'>
                        Adverts <IoIosArrowDown /></span>
                    <ul className={`absolute z-100 ${isActive.ten == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/advert/add' className=''>Add Advert</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/advert' className=''>Advert List</Link>
                        </li>
                    </ul>
                </li>
                {/*  */}
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
                <li className='relative hover:text-green-100'>
                    <span 
                        onClick={() => setIsActive({eleven: !isActive.eleven})} 
                        className='cursor-pointer flex items-center justify-start gap-1'>
                        Guides <IoIosArrowDown /></span>
                    <ul className={`absolute z-100 ${isActive.eleven == true ? 'block' : 'hidden'} drop-shadow-md top-[135%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/guide/add' className=''>Add Guide</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                            <Link href='/admin/guide' className=''>Guide List</Link>
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

        {/* RESPONSIVE NAVIGATION */}
        <div className='mx-auto w-[90%] lg:hidden flex items-center justify-end'>
            <button className='text-xl py-3' onClick={() => setIsToggle(!isToggle)}>
                {isToggle === true ? <MdOutlineClose /> : <GiHamburgerMenu />}
            </button>
        </div>
        {isToggle &&
        <div className='mx-auto w-[90%] py-2 lg:hidden flex flex-col items-center justify-between'>
            <ul className='flex flex-col items-center justify-center gap-2'>
                {/* SETTINGS */}
                <li className='relative w-[100%]'>
                    <span onClick={() => setIsActive({one: !isActive.one})} className='w-[100%] py-1 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Settings <IoIosArrowDown /></span>

                    <ul className={`relative ${isActive.one == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-slate-200 bg-gradient-to-br from-green-700 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/app-info' className=''>App Info</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/role' className=''>Roles</Link>
                        </li>
                    </ul>
                </li>
                {/* USERS */}
                <li className='relative w-[100%]'>
                    <span onClick={() => setIsActive({two: !isActive.two})} className='w-[100%] py-2 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Users <IoIosArrowDown /></span>

                    <ul className={`relative ${isActive.two == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-slate-200 bg-gradient-to-br from-green-700 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/user/add' className=''>Add User</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/user' className=''>User List</Link>
                        </li>
                    </ul>
                </li>
                {/* PLACES */}
                <li className='relative w-[100%]'>
                    <span onClick={() => setIsActive({three: !isActive.three})} className='w-[100%] py-2 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Places <IoIosArrowDown /></span>

                    <ul className={`relative ${isActive.three == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-slate-200 bg-gradient-to-br from-green-700 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/place/add' className=''>Add Place</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/place' className=''>Place List</Link>
                        </li>
                    </ul>
                </li>
                {/* PROVINCES */}
                <li className='relative w-[100%]'>
                    <span onClick={() => setIsActive({four: !isActive.four})} className='w-[100%] py-2 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Provinces <IoIosArrowDown /></span>

                    <ul className={`relative ${isActive.four == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-slate-200 bg-gradient-to-br from-green-700 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/province/add' className=''>Add Province</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/province' className=''>Province List</Link>
                        </li>
                    </ul>
                </li>
                {/* Events */}
                <li className='relative w-[100%]'>
                    <span onClick={() => setIsActive({five: !isActive.five})} className='w-[100%] py-2 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Events <IoIosArrowDown /></span>

                    <ul className={`relative ${isActive.five == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-slate-200 bg-gradient-to-br from-green-700 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/event/add' className=''>Add Event</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/event' className=''>Event List</Link>
                        </li>
                    </ul>
                </li>
                {/* ADVERTS */}
                <li className='relative w-[100%]'>
                    <span onClick={() => setIsActive({six: !isActive.six})} className='w-[100%] py-2 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Adverts <IoIosArrowDown /></span>

                    <ul className={`relative ${isActive.six == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-slate-200 bg-gradient-to-br from-green-700 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/advert/add' className=''>Add Advert</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/advert' className=''>Advert List</Link>
                        </li>
                    </ul>
                </li>
                {/* CATEGORY */}
                <li className='relative w-[100%]'>
                    <span onClick={() => setIsActive({seven: !isActive.seven})} className='w-[100%] py-2 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Categories <IoIosArrowDown /></span>

                    <ul className={`relative ${isActive.seven == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-slate-200 bg-gradient-to-br from-green-700 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/category/add' className=''>Add Category</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/category' className=''>Category List</Link>
                        </li>
                    </ul>
                </li>
                {/* CITY */}
                <li className='relative w-[100%]'>
                    <span onClick={() => setIsActive({eight: !isActive.eight})} className='w-[100%] py-2 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Cities <IoIosArrowDown /></span>

                    <ul className={`relative ${isActive.eight == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-slate-200 bg-gradient-to-br from-green-700 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/city/add' className=''>Add City</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/city' className=''>City List</Link>
                        </li>
                    </ul>
                </li>
                {/* GUIDE */}
                <li className='relative w-[100%]'>
                    <span onClick={() => setIsActive({nine: !isActive.nine})} className='w-[100%] py-2 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Guides <IoIosArrowDown /></span>

                    <ul className={`relative ${isActive.nine == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-slate-200 bg-gradient-to-br from-green-700 to-blue-700`}>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/guide/add' className=''>Add Guide</Link>
                        </li>
                        <li className='w-[100%] hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 text-center px-3 py-2'>
                            <Link href='/admin/guide' className=''>Guide List</Link>
                        </li>
                    </ul>
                </li>
                
               
            </ul>
            <ul className='flex items-center justify-center gap-4 py-[1rem]'>
                <li className='relative w-[100%]'>
                <span 
                    onClick={() => setIsActive({ten: !isActive.ten})} 
                    className='w-[100%] py-2 hover:text-green-100 text-center cursor-pointer flex items-center justify-center gap-2'>
                    Profile <IoIosArrowDown />
                </span>
                <ul className={`relative ${isActive.ten == true ? 'block' : 'hidden'} w-[100vw] drop-shadow-md transition-all ease-in-out duration-150 border border-white bg-gradient-to-br from-green-600 to-blue-700`}>
                    <li className='w-[100%] text-center hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                        <Link href='/admin/profile' className=''>Profile</Link>
                    </li>
                    <li className='w-[100%] text-center hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                        <Link href='/admin/profile/email' className=''>Email</Link>
                    </li>
                    <li className='w-[100%] text-center hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                        <Link href='/admin/prodile/password' className=''>Password</Link>
                    </li>
                    <li className='w-[100%] text-center hover:bg-gradient-to-br hover:from-blue-700 hover:to-green-600 px-3 py-2'>
                        <Link href='/logout' className=''>Logout</Link>
                    </li>
                </ul>
            </li>
            </ul>
        </div>
        }
    </section>
    </>
  )
}
