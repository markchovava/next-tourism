import React from 'react'

import CategoryCarousel from '../components/CategoryCarousel'
import PlaceList from './components/PlaceList'

export default function page() {
  return (
    <div>
       
       <PlaceList />
       
       <CategoryCarousel title='Top Categories' />
    </div>
  )
}
