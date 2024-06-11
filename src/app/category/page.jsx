import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import CategoryList from './components/CategoryList'
import { getCategories } from '@/api/getCategories'


export default async function page() {
  const categories = await getCategories();

  return (
    <div>
      {/* Bread Crumbs */}
      <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/category'>Categories</Link></li>
                    
                </ul>
            </div>
      </section>

      <CategoryList categories={categories} />
    </div>
  )
}
