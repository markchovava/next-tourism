
import React from 'react'
import { getEvents } from '@/api/getEvents'
import EventList from './components/EventList'



export default async function page({ params: {id} }) {
    const eventsData = await getEvents()



  return (
    <>
    <EventList id={id} eventsData={eventsData} />
    </>
  )
}
