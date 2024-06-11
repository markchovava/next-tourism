import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

import RoleEdit from './components/RoleEdit'

export default function page({ params: {id} }) {
  return (
    <div>
        {/* Bread Crumbs */}
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/admin/role'>Role List</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href={`/admin/role/edit/${id}`}>Edit Role</Link></li>
                </ul>
            </div>
        </section>

        {/* PAGE TITLE */}
        <section className='w-[100%]'>
          <div className='w-[90%] mx-auto flex items-center justify-center'>
            <h6 className='title__one'>
              Edit Role</h6>
          </div>
        </section>

         {/* BUTTON */}
         <section className='w-[100%]'>
          <div className='mx-auto w-[90%] flex items-center justify-end mb-8'>
            <Link href={`/admin/role/${id}`} className='link__three'>
              View Role
            </Link>
          </div>
        </section>

        {/* DELIVERY ADD */}
        <RoleEdit id={id} />


    </div>
  )
}
