import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import PlaceEdit from './components/PlaceEdit'
import { placeViewApiAction } from '@/actions/placeActions';
import { cityListAllApiAction } from '@/actions/cityActions';
import { provinceListAllApiAction } from '@/actions/provinceActions';



export default async function page({ params: {id} }) {
  const [placeData, cityData, provinceData] = await Promise.all([placeViewApiAction(id), cityListAllApiAction(), provinceListAllApiAction()]);


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

        {/* CHILD */}
        <PlaceEdit id={id} placeData={placeData} cityData={cityData} provinceData={provinceData} />


    </div>
  )
}
