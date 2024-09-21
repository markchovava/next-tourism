"use client";
import React, { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa6';



export default function StarRate({ dbData }) {
    const [data, setData] = useState(dbData);
    
  return (
    <>
        <div className='cursor-pointer mb-2 flex items-center justify-start gap-3'>
            {[...Array(5)].map((a, key) => {
                const currentIndex = key + 1;
                return (
                    <>
                        { currentIndex <= data.rate
                            ? <FaStar className='text-slate-600' />
                            : <FaRegStar className='text-slate-600' />
                        } 
                    </>
                )
            })}

        </div>
    </>
  )
}
