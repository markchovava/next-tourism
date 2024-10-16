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
import { logoutAction } from "@/actions/authActions";



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
            const res = await logoutAction(getAuthToken())
            if(res.status == 1){
                removeAuthToken();
                removeRoleToken();
                toast.success(res?.message, darkBounce);
                setIsLogout(false) 
                router.push(`/login`);
            }
            setIsLogout(false) 
        } catch (error) {
            console.error(`Error: ${error}`)
            setIsLogout(false) 
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
        <section className="w-[100%] pt-[2rem] pb-[1rem]">
            <div className="w-[94%] mx-auto flex lg:flex-row flex-col items-center gap-4 justify-start py-4">
                <div className="lg:w-[20%] w-[100%] flex items-center justify-center">
                    <div className="text-[2rem] font-extrabold">
                        <Link href='/'>
                        <span className="text-green-700">Enjoy</span>
                        <span>Zimbabwe</span>
                        </Link>
                    </div>
                </div>
                <div className="lg:w-[45%] w-[100%]">
                    <div className="w-[96%] mx-auto border border-slate-300 rounded-full overflow-hidden flex items-center justify-start">
                        <input type="text" className="w-[90%] outline-none px-5 py-3" placeholder="Search places by name..." />
                        <button className="w-[5%] h-[100%] border-none outline-none flex items-center justify-center text-center">
                        <IoIosSearch className="text-2xl transition-all duration-300 ease-in-out hover:text-green-700"/>
                        </button>
                    </div>
                </div>
                <div className="lg:w-[35%] w-[100%] flex items-center justify-start">
                    <nav className="w-[100%] flex items-center lg:justify-end justify-center gap-3">
                        <ul className="flex justify-start items-center gap-1 text-[0.9rem]">
                        <li>
                            <Link href='/directory' className="p-2 rounded-full transition-all duration-100 ease-in-out text-slate-900 hover:bg-green-50 hover:drop-shadow flex items-center justify-center gap-1 ">
                            Directory Listings
                            </Link>
                        </li>
                        <li>
                            <Link href='/place' className="p-2 rounded-full transition-all duration-100 ease-in-out text-slate-900 hover:bg-green-50 hover:drop-shadow flex items-center justify-center gap-1">
                            Places to visit
                            </Link>
                        </li>
                        <li>
                            <Link href='/guide' className="p-2 rounded-full transition-all duration-100 ease-in-out text-slate-900 hover:bg-green-50 hover:drop-shadow flex items-center justify-center gap-1">
                            Travel Guide 
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
