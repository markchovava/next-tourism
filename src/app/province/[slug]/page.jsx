import React from 'react'
import ProvinceCities from './components/ProvinceCities';
import { getProvinceBySlug, getProvinceCities } from '@/api/getProvinces';
import CarouselCategory from './components/CarouselCategory';
import { getCategories } from '@/api/getCategories';
import CarouselGuide from './components/CarouselGuide';
import { getGuides } from '@/api/getGuides';



export default async function page({ params: {slug} }) {
    const [cities, province, categoriesData, guidesData] = await Promise.all([
          getProvinceCities(slug), 
          getProvinceBySlug(slug),
          getCategories(),
          getGuides(),
        ]);

  return (
    <div>
        <ProvinceCities 
          cities={cities} 
          province={province} 
          slug={slug} />

        <CarouselCategory 
          title={'Category Listings'}
          province={province} 
          categoriesData={categoriesData} />

          <CarouselGuide 
            province_slug={slug} 
            title={'Travel Guides'} 
            dbData={guidesData} />
    
    </div>
  )
}
