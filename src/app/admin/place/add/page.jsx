import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import PlaceAdd from './components/PlaceAdd'
import { cityListAllApiAction } from '@/actions/cityActions';
import { provinceListAllApiAction } from '@/actions/provinceActions';



export default async function page() {
  const [cityData, provinceData] = await Promise.all([cityListAllApiAction(), provinceListAllApiAction()]);

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
                    <li><Link href='/admin/place/add'>Add Place</Link></li>
                </ul>
            </div>
        </section>

        {/* PAGE TITLE */}
        <section className='w-[100%]'>
          <div className='w-[90%] mx-auto flex items-center justify-center'>
            <h6 className='title__one'>
              Add Place</h6>
          </div>
        </section>

         {/* BUTTON */}
         <section className='w-[100%]'>
          <div className='mx-auto w-[90%] flex items-center justify-end mb-8'>
            <Link href='/admin/place' className='link__three'>
              Place List
            </Link>
          </div>
        </section>

        {/* ADD */}
        <PlaceAdd cityData={cityData} provinceData={provinceData} />


    </div>
  )
}
