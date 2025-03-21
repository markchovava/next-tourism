"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'



export default function PlaceView({ id, dbData }) {
  const [data, setData] = useState(dbData?.data);


  if(!data){ return ( <Loader /> ) }


  return (
    <section className='w-[100%] text-lg'>
        <div className='mx-auto w-[90%] pb-[4rem]'>
          {/*  */}
          {data?.place_images.length > 0 &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Image:</div>
            <div className='w-[80%] grid grid-cols-3 gap-6'>
            {data?.place_images.map((i, key) => (
                <div className='w-[100%] aspect-[5/3] rounded-xl overflow-hidden'>
                  <img 
                    src={i?.image ? baseURL + i?.image : baseURL + 'assets/img/no-img.jpg'} 
                    className='w-[100%] h-[100%] object-cover' />
                </div>
            ))}
            </div>
          </div>
          }
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>Name:</div>
            <div className='w-[80%] font-semibold'>{data?.name}</div>
          </div>
          {/*  */}
          {data?.priority && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%]'>Priority:</div>
            <div className='w-[80%] font-semibold'>{data?.priority}</div>
          </div>
          }
          {/*  */}
          {data?.address &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Address:</div>
            <div className='w-[80%] font-semibold'>{data?.address}</div>
          </div>
          }
          {/*  */}
          {data?.phone &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Phone:</div>
            <div className='w-[80%] font-semibold'>{data?.phone}</div>
          </div>
          }
          {/*  */}
          {data?.email &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Email:</div>
            <div className='w-[80%] font-semibold'>{data?.email}</div>
          </div>
          }
          {/*  */}
          {data?.website &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Website:</div>
            <div className='w-[80%] font-semibold'>{data?.website}</div>
          </div>
          }
          {/*  */}
          {data?.description &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Description:</div>
            <div className='w-[80%] font-semibold'>{data?.description}</div>
          </div>
          }
          {/*  */}
          {data?.slug &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Slug:</div>
            <div className='w-[80%] font-semibold'>{data?.slug}</div>
          </div>
          }
          {/*  */}
          {data?.city?.name &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>City:</div>
            <div className='w-[80%] font-semibold'>
              {data?.city?.name ? data?.city?.name : 'Not yet added.'}
            </div>
          </div>
          }
          {/*  */}
          {data?.guides?.length > 0 &&
            <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
              <div className='w-[20%] '>Guides:</div>
              <div className='w-[80%] font-semibold'>
                {data?.guides?.map((i, key) => (
                  <>
                    <span key={key} className='italic text-blue-700 font-semibold'>
                      {key+1 < data?.guides?.length ? i?.name + ', ' : i?.name} 
                    </span>
                  </>
                ))}
              </div>
            </div>
          }
          {/*  */}
          {data?.categories?.length > 0 &&
            <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
              <div className='w-[20%] '>Categories:</div>
              <div className='w-[80%] font-semibold'>
                {data?.categories.map((i, key) => (
                  <>
                    <span key={key} className='italic text-green-700 font-semibold'>{key+1 < data?.categories.length ? i?.name + ', ' : i?.name} </span>
                  </>
                ))}
              </div>
            </div>
          }
          {/*  */}
          {data?.province?.name && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>Province:</div>
            <div className='w-[80%] font-semibold'>
              {data?.province?.name ? data?.province?.name : 'Not yet added.'}
            </div>
          </div>
          }
          {data?.user?.name &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>Author:</div>
            <div className='w-[80%] font-semibold'>
              {data?.user?.name ? data?.user?.name : data?.user?.email }
            </div>
          </div>
          }
        </div>
    </section>
  )
}
