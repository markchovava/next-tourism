import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import UserView from './components/UserView'



export default function page({ params: { id }}) {
  return (
    <div>
        {/* Bread Crumbs */}
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/admin/user'>User List</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href={`/admin/user/${id}`}>View User</Link></li>
                </ul>
            </div>
        </section>

        {/* PAGE TITLE */}
        <section className='w-[100%]'>
          <div className='w-[90%] mx-auto flex items-center justify-center'>
            <h6 className='title__one'>
              User Info</h6>
          </div>
        </section>

        {/* BUTTON */}
        <section className='w-[100%]'>
          <div className='mx-auto w-[90%] flex items-center justify-end mb-[2rem]'>
            <Link href={`/admin/user/edit/${id}`} className='link__three'>
              Edit User
            </Link>
          </div>
        </section>

        {/* DELIVERY ADD */}
        <UserView id={id} />


    </div>
  )
}
