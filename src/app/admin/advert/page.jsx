import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

import AdvertList from './components/AdvertList'
import { advertListApiAction } from '@/actions/advertActions';



export default async function page() {
  const advertData = await advertListApiAction();

  return (
    <div>
      {/* Bread Crumbs */}
      <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/admin/advert'>Advert List</Link></li>
                    
                </ul>
            </div>
      </section>

    {/* PAGE TITLE */}
    <section className='w-[100%]'>
        <div className='w-[90%] mx-auto flex items-center justify-center'>
        <h6 className='title__one'>
          Advert List </h6>
        </div>
    </section>

      {/* LIST */}
      <AdvertList dbData={advertData} />
         

    </div>
  )
}
