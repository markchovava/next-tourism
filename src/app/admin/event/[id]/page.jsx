import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import EventView from './components/EventView'


export default function page({params: {id} }) {
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
                    <li><Link href={`/admin/event/${id}`}>View Event</Link></li>
                </ul>
            </div>
        </section>
        {/* PAGE TITLE */}
        <section className='w-[100%]'>
          <div className='w-[90%] mx-auto flex items-center justify-center'>
            <h6 className='title__one'>
               View Event</h6>
          </div>
        </section>
        {/* BUTTON */}
        <section className='w-[100%]'>
          <div className='mx-auto w-[90%] flex items-center justify-end mb-8'>
            <Link 
                href={`/admin/event/edit/${id}`} 
                className='link__three'>
                Edit Event
            </Link>
          </div>
        </section>

        {/*  */}
        <EventView id={id} />


    </div>
  )
}
