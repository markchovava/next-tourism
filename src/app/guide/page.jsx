import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import GuideList from './components/GuideList'
import { getGuides } from '@/api/getGuides'


export default async function page() {
  const guidesData = await getGuides();

  return (
    <div>
      {/* Bread Crumbs */}
      <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/guide'>Guides</Link></li>
                    
                </ul>
            </div>
      </section>

      <GuideList guidesData={guidesData} />
    </div>
  )
}
