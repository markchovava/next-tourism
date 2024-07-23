import React from 'react'
import PlaceView from './components/PlaceView'
import { getPlace } from '@/api/getPlaces';
import { getReviewsByPlace } from '@/api/getReviews';




export default async function page({ params: {id} }) {
  const [placeData, reviewsData] = await Promise.all([getPlace(id), getReviewsByPlace(id)]);

  return (
    <div>
        <PlaceView placeData={placeData} reviewsData={reviewsData} />
    </div>
  )
}
