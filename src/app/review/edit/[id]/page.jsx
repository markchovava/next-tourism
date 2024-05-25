import React from 'react'
import ReviewEdit from './components/ReviewEdit'



export default function page({ params: {id}}) {
  return (
    <div>
        <ReviewEdit id={id} />
    </div>
  )
}
