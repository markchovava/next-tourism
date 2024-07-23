"use client"
import React, { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa6'

export default function StarRating({rating, setRating}) {
    

  return (
    <>
        <p className='text-xl cursor-pointer mb-2 flex items-center justify-start gap-3'>
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
                        { currentIndex <= rating 
                            ? <FaStar className='text-slate-600' />
                            : <FaRegStar className='text-slate-600' />
                        }
                       
                    </label>
                    </>
                )
            })}
        </p>
    </>
  )
}
