import React from 'react'
import ProvinceCities from './components/ProvinceCities';
import { getProvinceBySlug, getProvinceCities } from '@/api/getProvinces';
import CarouselCategory from './components/CarouselCategory';
import { getCategoriesOne } from '@/api/getCategories';



export default async function page({ params: {slug} }) {
    const [cities, province, categoriesOne] = await Promise.all([
          getProvinceCities(slug), 
          getProvinceBySlug(slug),
          getCategoriesOne()
        ]);

  return (
    <div>
        <ProvinceCities 
          cities={cities} 
          province={province} 
          slug={slug} />

        <CarouselCategory 
          title={'Top Categories'}
          province={province} 
          categoriesOne={categoriesOne} />
    </div>
  )
}
