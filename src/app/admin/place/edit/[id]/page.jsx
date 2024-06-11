import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import PlaceEdit from './components/PlaceEdit'



export default function page({ params: {id} }) {
  return (
    <div>
        {/* Bread Crumbs */}
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/admin/place'>Place List</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href={`/admin/place/edit/${id}`}>Edit Place</Link></li>
                </ul>
            </div>
        </section>

        {/* PAGE TITLE */}
        <section className='w-[100%]'>
          <div className='w-[90%] mx-auto flex items-center justify-center'>
            <h6 className='title__one'>
              Edit Place</h6>
          </div>
        </section>

         {/* BUTTON */}
         <section className='w-[100%]'>
          <div className='mx-auto w-[90%] flex items-center justify-end mb-8'>
            <Link href={`/admin/place/${id}`} className='link__three'>
              View Place
            </Link>
          </div>
        </section>

        {/* DELIVERY ADD */}
        <PlaceEdit id={id} />


    </div>
  )
}
