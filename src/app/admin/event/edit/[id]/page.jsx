import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import EventEdit from './components/EventEdit'
import { getCitiesAll } from '@/api/getCities';



export default async function page({ params: {id} }) {
  const citiesData = await getCitiesAll();

  
  return (
    <div>
        {/* Bread Crumbs */}
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/admin/event'>Event List</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href={`/admin/event/edit/${id}`}>Edit Event</Link></li>
                </ul>
            </div>
        </section>
        {/* PAGE TITLE */}
        <section className='w-[100%]'>
          <div className='w-[90%] mx-auto flex items-center justify-center'>
            <h6 className='title__one'>
              Edit Event</h6>
          </div>
        </section>
         {/* BUTTON */}
         <section className='w-[100%]'>
          <div className='mx-auto w-[90%] flex items-center justify-end mb-8'>
            <Link href={`/admin/event/${id}`} className='link__three'>
              View Event
            </Link>
          </div>
        </section>

        {/* DELIVERY ADD */}
        <EventEdit id={id} citiesData={citiesData} />


    </div>
  )
}
