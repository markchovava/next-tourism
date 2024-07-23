"use client"
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6'

export default function page() {
    const [rating, setRating] = useState(null);
    console.log(rating)

  return (
    <>
        Text
        <div className='flex items-center gap-3 text-xl py-8 mx-auto w-[90%]'>
            {[...Array(5)].map((i, key) => {
                const currentIndex = key + 1;
                return (
                    <>
                    <label>
                        <input 
                            type='radio' 
                            name='rate' 
                            className='hidden'
                            value={currentIndex} 
                            onClick={() => setRating(currentIndex)}
                        />
                        <FaStar
                            className={currentIndex <= rating ? 'text-green-600' : 'text-slate-600'} 
                        />
                    </label>
                    </>
                )
            })}
        </div>
    </>
  )
}
