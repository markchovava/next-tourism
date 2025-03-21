import React from 'react'
import ProvinceCities from './components/ProvinceCities';
import { getProvinceBySlug, getProvinceCities } from '@/api/getProvinces';
import CarouselCategory from './components/CarouselCategory';
import { getCategories } from '@/api/getCategories';
import CarouselGuide from './components/CarouselGuide';
import { getGuides } from '@/api/getGuides';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa6';
import CarouselGuidePlaces from './components/CarouselGuidePlaces';
import { provinceGuidePlacesAction } from '@/actions/provinceActions';
import { guideViewAction } from '@/actions/guidesActions';



export default async function page({ params: {slug} }) {
    const guide_slug1 = 'things-to-see'
    const guide_slug2 = 'special-activities'
    const guide_slug3 = 'entertainment'
    const [cities, 
      province, 
      categoriesData, 
      guidesData, 
      places1Data, 
      guide1Data,
      places2Data,
      guide2Data,
      places3Data,
      guide3Data,
    ] = await Promise.all([
          getProvinceCities(slug), 
          getProvinceBySlug(slug),
          getCategories(),
          getGuides(),
          provinceGuidePlacesAction(slug, guide_slug1),
          guideViewAction(guide_slug1),
          provinceGuidePlacesAction(slug, guide_slug2),
          guideViewAction(guide_slug2),
          provinceGuidePlacesAction(slug, guide_slug3),
          guideViewAction(guide_slug3),
        ]);



  return (
    <div>
      {/* Bread Crumbs */}
      <section className='w-[100%]'>
        <div className='mx-auto w-[90%] border-b border-slate-200'>
          <ul className='flex items-center justify-start gap-2 py-2'>
            <li><Link href='/'>Home</Link></li>
            <li><FaAngleRight /></li>
            <li><Link href='/province'>Province</Link></li>                 
            <li><FaAngleRight /></li>
            <li><Link href='/province'>{province?.data?.name}</Link></li>                 
          </ul>
        </div>
      </section>

      <ProvinceCities 
        cities={cities} 
        province={province} 
        slug={slug} />

      <CarouselGuidePlaces
        guide_slug={guide_slug1}
        title={guide1Data?.data?.name ?? ''}
        dbData={places1Data} 
      /> 

      <CarouselGuidePlaces
        guide_slug={guide_slug2}
        title={guide2Data?.data?.name ?? ''}
        dbData={places2Data} 
      />  

      <CarouselGuidePlaces
        guide_slug={guide_slug3}
        title={guide3Data?.data?.name ?? ''}
        dbData={places3Data} 
      />  

      <CarouselGuide 
        province_slug={slug} 
        title={'Travel Guides'} 
        dbData={guidesData} />

        <CarouselCategory 
          title={'Category Listings'}
          province={province} 
          categoriesData={categoriesData} />

    
    </div>
  )
}
