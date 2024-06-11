"use client";
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/tokens/tokenAuth";
import { tokenRole } from "@/tokens/tokenRole";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Bounce, toast } from "react-toastify";
import TopNav from "./TopNav";



export default function Header() {
    const router = useRouter();
    const { getAuthToken, removeAuthToken } = tokenAuth();
    const { removeRoleToken } = tokenRole();
    const [isLogout, setIsLogout] = useState(false);
    const [auth, setAuth] = useState(getAuthToken());


    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${getAuthToken()}`, 
        }
    }
    /* LOGOUT */
    async function postLogout() {
        try{
            const result = await axiosClientAPI.get(`logout`, config)
            .then((response) => {
                removeAuthToken();
                removeRoleToken();
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                  });
                setIsLogout(false) 
                router.push(`/login`);
                setTimeout(() => {
                    window.location.reload();
                  }, 1000);
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        } 
    } 


    useEffect(() => {
        isLogout == true && postLogout();
    }, [isLogout])


  return (
    <>
        {/* TOP AREA */}
        <TopNav />
        <section className="w-[100%] ">
            <div className="w-[90%] mx-auto flex items-center gap-4 justify-start py-4">
                <div className="w-[20%]">
                    <div className="text-[4rem] font-extrabold">
                        <Link href='/'>
                            <span className="text-green-600">Z</span>
                            <span className="text-yellow-500">N</span>
                            <span className="text-red-600">A</span>
                            <span className="text-black">C</span>
                        </Link>
                    </div>
                </div>
                <div className="w-[50%]">
                <div className="w-[96%] mx-auto border border-slate-300 rounded-full overflow-hidden flex items-center justify-start">
                    <input type="text" className="w-[90%] outline-none px-5 py-3" placeholder="Search places by name..." />
                    <button className="w-[5%] h-[100%] border-none outline-none flex items-center justify-center text-center">
                    <IoIosSearch className="text-2xl transition-all duration-300 ease-in-out hover:text-green-700"/>
                    </button>
                </div>
                </div>
                <div className="w-[30%] flex items-center justify-start">
                <nav className="w-[100%] flex items-center justify-end gap-4">
                    <ul className="flex justify-start items-center gap-3">
                    <li>
                        <Link href='/place' className="p-3 rounded-full transition-all duration-100 ease-in-out text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-1">
                        Places <IoIosArrowDown />
                        </Link>
                    </li>
                    <li>
                        <Link href='/review/add' className="p-3 rounded-full transition-all duration-100 ease-in-out text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-1">
                        Review <IoIosArrowDown />
                        </Link>
                    </li>
                    <li>
                        <Link href='#' className="p-3 rounded-full transition-all duration-100 ease-in-out text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-1">
                        More <IoIosArrowDown />
                        </Link>
                    </li>
                    </ul>
                    {auth ? 
                    <button
                        onClick={() => setIsLogout(true) }
                        className="transition-all ease-in-out duration-100 rounded-full bg-gradient-to-br from-green-500 to-cyan-800 hover:text-transparent hover:bg-gradient-to-br hover:bg-clip-text hover:from-green-600 hover:to-cyan-700 border border-white hover:border-green-600 px-4 py-3 text-white">
                        Logout
                    </button>
                    :
                    <Link 
                        href='/login'
                        className="transition-all ease-in-out duration-100 rounded-full bg-gradient-to-br from-green-500 to-cyan-800 hover:text-transparent hover:bg-gradient-to-br hover:bg-clip-text hover:from-green-600 hover:to-cyan-700 border border-white hover:border-green-600 px-4 py-3 text-white">
                        Login
                    </Link>

                    }
                    
                </nav>
                </div>
            </div>
        </section>
        {/* NAVIGATION */}
        <section className="w-[100%]">
            <nav className="w-[90%] mx-auto border-b border-slate-200">
                <ul className="font-semibold flex justify-start items-center gap-4 h-[100%] text-black">
                    <li className="py-2 ">
                        <Link href='/city' className="hover:text-green-700 ">Cities</Link>
                    </li>
                    <li className="py-2 ">
                        <Link href='/place' className="hover:text-green-700 ">Hotels</Link>
                    </li>
                    <li className="py-2">
                        <Link href='/place' className="hover:text-green-700 ">Restaurants</Link>
                    </li>
                    <li className="py-2">
                        <Link href='#' className="hover:text-green-700 ">Car Rentals</Link>
                    </li>
                    <li className="py-2"><Link href='#' className="hover:text-green-700 ">Resorts</Link></li>
                    <li className="py-2"><Link href='#' className="hover:text-green-700 ">Accommodation</Link></li>
                    <li className="py-2"><Link href='#' className="hover:text-green-700 ">Things to do</Link></li>
                </ul>
            </nav>
        </section>
    </>
  )
}
