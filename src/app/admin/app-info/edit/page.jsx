import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import AppInfoEdit from './components/AppInfoEdit'
import { appInfoViewApiAction } from '@/actions/appInfoActions';


export default async function page() {
  const appInfoData = await appInfoViewApiAction();

  return (
    <div>
        {/* Bread Crumbs */}
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/admin/app-info'>View App Info</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/admin/app-info/edit'>Edit App Info</Link></li>
                </ul>
            </div>
        </section>

         {/* PAGE TITLE */}
         <section className='w-[100%]'>
          <div className='w-[90%] mx-auto flex items-center justify-center'>
            <h6 className='text-center font-black text-[3rem] pt-[3rem] pb-[2rem] text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-blue-600'>
              Edit AppInfo </h6>
          </div>
        </section>


         {/* BUTTON */}
         <section className='w-[100%]'>
          <div className='mx-auto w-[90%] flex items-center justify-end mb-8'>
            <Link href='/admin/app-info' className='text-white rounded-lg px-6 py-3 transition-all duration-200 ease-in-out bg-gradient-to-br from-green-500 to-blue-500 hover:gradient-to-br hover:from-blue-500 hover:to-green-600'>
              Veiw App Info
            </Link>
          </div>
        </section>

        <AppInfoEdit dbData={appInfoData} />

    </div>
  )
}
