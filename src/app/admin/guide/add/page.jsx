import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import GuideAdd from './components/GuideAdd';



export default function page() {

  
  return (
    <div>
        {/* Bread Crumbs */}
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/admin/guide'>Guide List</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/admin/guide/add'>Add Guide</Link></li>
                </ul>
            </div>
        </section>
        {/* PAGE TITLE */}
        <section className='w-[100%]'>
          <div className='w-[90%] mx-auto flex items-center justify-center'>
            <h6 className='title__one'>
              Add Guide</h6>
          </div>
        </section>
         {/* BUTTON */}
         <section className='w-[100%]'>
          <div className='mx-auto w-[90%] flex items-center justify-end'>
            <Link href='/admin/guide' className='link__three'>
              Guides List
            </Link>
          </div>
        </section>

        {/* ADD */}
        <GuideAdd />


    </div>
  )
}
