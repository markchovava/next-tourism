import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import CategoryList from './components/CategoryList'
import { getCategories } from '@/api/getCategories'
import CarouselGuide from '../components/CarouselGuide'
import { getGuides } from '@/api/getGuides'


export default async function page() {
  const [categories, guidesData] = await Promise.all([getCategories(), getGuides() ]);

  return (
    <>
      {/* Bread Crumbs */}
      <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/category' className='font-medium'>Categories</Link></li>
                    
                </ul>
            </div>
      </section>

      <CategoryList categories={categories} />

      <CarouselGuide title={'Travel Guides'} dbData={guidesData} />

      
    </>
  )
}
