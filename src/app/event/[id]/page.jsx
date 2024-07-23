
import React from 'react'
import EventView from './components/EventView'
import { getEvent } from '@/api/getEvents'



export default async function page({ params: {id} }) {
    const eventData = await getEvent(id)



  return (
    <>
    <EventView id={id} eventData={eventData} />
    </>
  )
}
