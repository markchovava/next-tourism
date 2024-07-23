"use client";

import { baseURL } from "@/api/baseURL";
import Link from "next/link";
import { useState } from "react";
import { FaAngleRight, FaHeart, FaRegHeart } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoMdContact } from "react-icons/io";



export default function EventView({id, eventData}) {
    const [data, setData] = useState(eventData?.data);
    console.log(data)
  return (
    <>
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/event'>Events</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href={`/place/${data.id}`}>{data?.name}</Link></li>
                </ul>
            </div>
        </section>

        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto pt-[2rem] flex items-center justify-between'>
                <h5 className="mb-2">{data.name}</h5>
               
            </div>
        </section>

        <section className="w-[100%]">
            <div className="mx-auto w-[90%] pb-[5rem]">
                <div className="w-[100%] lg:aspect-[5/2] aspect-[5/3] overflow-hidden rounded-xl">
                    <img src={baseURL + data.landscape} alt={data?.name} className="w-[100%] h-[100%] object-cover" />
                </div>
                {/*  */}
                <div className="mx-auto w-[80%] pt-[2rem] pb-[3rem] text-xl">
                    <p>{data.description}</p>
                </div>
                {/*  */}
                <div className="mx-auto w-[80%] grid lg:grid-cols-2 grid-cols-1 gap-8">
                    {/*  */}
                    <div className="w-[100%] flex items-start justify-start  py-3">
                        <div className="w-[20%] flex items-center justify-center">
                            <IoMdContact className="text-[4rem] text-slate-600" />
                        </div>
                        <div className="border-l border-slate-200 px-6 text-xl font-light">
                            <p className="mb-3 flex items-center gap-4">
                                Address:
                                <span className="text-slate-700 font-normal">{data.address}</span>
                            </p>
                            <p className="mb-3 flex items-center gap-4">
                                Email:
                                <span className="text-slate-700 font-normal">{data.email}</span>
                            </p>
                            <p className="mb-3 flex items-center gap-4">
                                Phone:
                                <span className="text-slate-700 font-normal">{data.phone}</span>
                            </p>
                        </div>
                    </div>
                    {/*  */}
                    <div className="w-[100%] flex items-start justify-start  py-3">
                        <div className="w-[20%] flex items-center justify-center">
                            <MdDateRange className="text-[4rem] text-slate-600" />
                        </div>
                        <div className="border-l border-slate-200 px-6 text-xl font-light">
                            <p className="mb-3 flex items-center gap-4">
                                Date:
                                <span className="text-slate-700 font-normal">{data.date}</span>
                            </p>
                            <p className="mb-3 flex items-center gap-4">
                                Time:
                                <span className="text-slate-700 font-normal">{data.time}</span>
                            </p>
                            <p className="mb-3 flex items-center gap-4">
                                Venue:
                                <span className="text-slate-700 font-normal">
                                    {data.city?.name ? data.city?.name : 'Not added'}
                                </span>
                            </p>
                        </div>
                    </div> 
                </div>
            </div>
        </section>
    </>
  )
}
