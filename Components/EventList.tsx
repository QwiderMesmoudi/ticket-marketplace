"use client"
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'
import Spiner from './Spiner'
import { CalendarDays, Ticket } from 'lucide-react'
import EventCard from './EventCard'

const EventList = () => {

    const events = useQuery(api.events.get)
    
    const UpCommingEvents = events
    ?.filter((event) => new Date(event.eventDate).getTime() > Date.now()) 
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  
    if(!events) return <Spiner/>
    return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
            <div>
                <h1 className='text-3xl font-bold text-gray-900 '>UpComming Events</h1>
                <p className='mt-2 text-gray-600'>Discover & book tickets  for amazing events</p>
            </div>
            <div className='bg-white px-4 py-4 rounded-lg shadow-sm  border border-gray-100'>
                <div className='flex items-center gap-4 text-gray-600'>
                    <CalendarDays/>
                    <span className='font-medium'>
                          {UpCommingEvents?.length}  UpComming Events
                    </span>
                </div>
            </div>
        </div>
                    {/*Up Comming Events */}
             {
                UpCommingEvents?.length || 0  > 0 ? (
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                        {
                            UpCommingEvents?.map(event=>

                                <EventCard key={event._id} eventId={event._id} />
                            )
                        }

                    </div>
                )
             : (       
            <div className='bg-gray-50 mb-12 p-12 text-center rounded-lg'>
                <Ticket className='h-12 w-12 mx-auto text-gray-400 mb-4'/>
                <h3 className='text-lg font-medium text-gray-900'>No Events</h3>
                <p className='mt-1 text-gray-600'>Check later for Up new Events</p> 
            </div>

                )}

    </div>
  )
}

export default EventList
