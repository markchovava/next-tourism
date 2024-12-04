"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'



export default function AdvertView({ id, dbData }) {
  const [data, setData] = useState(dbData?.data);

  if(!data){ return ( <Loader /> ) }


  return (
    <section className='w-[100%]'>
        <div className='mx-auto w-[90%] pb-[4rem] text-lg'>
          {/*  */}
          {data?.landscape &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Landscape:</div>
            <div className='w-[80%]'>
              <div className='h-[10rem] aspect-[5/1] bg-slate-100 rounded-xl drop-shadow-lg overflow-hidden'>
                <img src={baseURL + data?.landscape} className='w-[100%] h-[100%] object-cover' />
              </div>
            </div>
          </div>
          }
          {/*  */}
          {data?.portrait &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Portrait:</div>
            <div className='w-[80%]'>
              <div className='h-[12rem] aspect-[10/7] bg-slate-100 rounded-xl overflow-hidden'>
                <img src={baseURL + data?.portrait} className='w-[100%] h-[100%] object-cover' />
              </div>
            </div>
          </div>
          }
          {/*  */}
          {data?.name &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>Name:</div>
            <div className='w-[80%] font-semibold'>{data?.name}</div>
          </div>
          }
          {/*  */}
          {data?.description &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>Description:</div>
            <div className='w-[80%] font-semibold'>{data?.description}</div>
          </div>
          }
          {/*  */}
          {data?.priority &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] '>Priority:</div>
            <div className='w-[80%] font-semibold'>
              <span className='px-2 py-1 rounded-lg bg-green-700 text-white'>
                {data?.priority}</span>
            </div>
          </div>
          }
          {/*  */}
          {data?.href &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Link:</div>
            <div className='w-[80%] font-semibold flex items-center justify-start gap-2'>
              {data?.href}
            </div>
          </div>
          }
          {/*  */}
          {data?.slug && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Slug:</div>
            <div className='w-[80%] font-semibold'>{data?.slug}</div>
          </div>
          }
          {data?.user?.name && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Author:</div>
            <div className='w-[80%]  font-semibold'>
              {data?.user?.name ? data?.user?.name : data?.user?.email }
            </div>
          </div>
          }
        </div>
    </section>
  )
}
