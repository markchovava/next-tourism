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
import { darkBounce } from "@/utils/roastifyDark";
import NavigationMain from "./NavigationMain";



export default function Header() {
    const router = useRouter();
    const { getAuthToken, removeAuthToken } = tokenAuth();
    const { removeRoleToken } = tokenRole();
    const [isLogout, setIsLogout] = useState(false);


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
                toast.success(response.data.message, darkBounce);
                setIsLogout(false) 
                router.push(`/login`);
                setTimeout(() => {
                    window.location.reload();
                  }, 2000);
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
        {getAuthToken() &&
            <TopNav />
        }
        <section className="w-[100%] ">
            <div className="w-[90%] mx-auto flex lg:flex-row flex-col items-center gap-4 justify-start py-4">
                <div className="lg:w-[20%] w-[100%] flex items-center justify-center">
                    <div className="text-[4rem] font-extrabold">
                        <Link href='/'>
                            <span className="text-green-600">Z</span>
                            <span className="text-yellow-500">N</span>
                            <span className="text-red-600">A</span>
                            <span className="text-black">C</span>
                        </Link>
                    </div>
                </div>
                <div className="w-[100%]">
                    <div className="w-[96%] mx-auto border border-slate-300 rounded-full overflow-hidden flex items-center justify-start">
                        <input type="text" className="w-[90%] outline-none px-5 py-3" placeholder="Search places by name..." />
                        <button className="w-[5%] h-[100%] border-none outline-none flex items-center justify-center text-center">
                        <IoIosSearch className="text-2xl transition-all duration-300 ease-in-out hover:text-green-700"/>
                        </button>
                    </div>
                </div>
                <div className="w-[30%] flex items-center justify-start">
                    <nav className="w-[100%] flex items-center lg:justify-end justify-center gap-4">
                        <ul className="flex justify-start items-center gap-3">
                        <li>
                            <Link href='/directory' className="p-3 rounded-full transition-all duration-100 ease-in-out text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-1">
                            Directory
                            </Link>
                        </li>
                        <li>
                            <Link href='/place' className="p-3 rounded-full transition-all duration-100 ease-in-out text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-1">
                            Places 
                            </Link>
                        </li>
                        <li>
                            <Link href='/guide' className="p-3 rounded-full transition-all duration-100 ease-in-out text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-1">
                            Guides 
                            </Link>
                        </li>
                        </ul>
                        {getAuthToken() ? 
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
        
        {/*  */}
        <NavigationMain />
    </>
  )
}
