import { useState } from 'react'
import { UpdatePayload } from '../../../types/data/UpdatePayload'
import { EventData } from '../../../types/data/EventData'
import EventItem from './EventItem'


export default function ActivityList({events, onDataChange}
    : {events: EventData[], onDataChange: (updates?: UpdatePayload) => void}) {


        //Logik om den ska redigeras eller inte och vilken som ska redigeras


    return(
        <div className="activity-container">
        { events.map((event) => (    
            <EventItem onDataChange={onDataChange} key={event.id} event={event} />                        
        ))}
    </div>


    )

}