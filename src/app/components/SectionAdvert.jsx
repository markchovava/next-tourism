"use client";
import { baseURL } from '@/api/baseURL';
import Image from 'next/image';
import React, { useState } from 'react'


export default function SectionAdvert({ dbData }) {
    const [data, setData] = useState(dbData?.data);

  return (
    <>
    {data &&
    <section className='w-[100%] mb-[4rem]'>
        <div className='w-[90%] relative mx-auto cursor-pointer bg-slate-100 overflow-hidden rounded-xl drop-shadow-lg'>
        <Image 
            src={baseURL + data?.landscape} 
            layout="fill"
            objectFit="cover"
            alt="Image" />
        </div>
    </section>
    }
    </>
  )
}
