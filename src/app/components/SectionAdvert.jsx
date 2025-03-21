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
        <div className='w-[90%] relative mx-auto '>
        <figure className='aspect-[5/1] w-[100%] cursor-pointer bg-slate-100 overflow-hidden rounded-xl drop-shadow-lg'>
          <Image 
              src={data?.landscape ? baseURL + data?.landscape : baseURL + 'assets/img/no-img.jpg'} 
              layout="fill"
              objectFit="cover"
              alt="Image" />

        </figure>
        </div>
    </section>
    }
    </>
  )
}
