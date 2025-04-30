import "../../App.css"
import { useState } from "react"
import CreateActivity from "./createActivity.tsx"
import ActivityFilterPanel from "./filter-components/ActivityFilterPanel.tsx"
import EventItem from "./eventItem.tsx"
import { CalendarEvent } from "../../types/CalendarEvent.ts"

// const BASE_URL = 'https://localhost:7159'

export default function ActivityfeedComponent() {
    // const [error, setError] = useState();
    // const [isLoading, setIsLoading] = useState(false)
    const [searchResults, setSearchResults] = useState<CalendarEvent[]>([])
    // const [events, setEvents] = useState<CalendarEvent[]>([])
    
    // useEffect (() => {
    //     const fetchPosts = async () => {
    //         setIsLoading(true)
    //         try {
    //             const eventResponse = await fetch(`${BASE_URL}/APIv1/events/calendar`)
    //             const events = (await eventResponse.json()) as CalendarEvent[]

    //             setEvents(events)

    //             console.log(events)
    //         } catch (e: any) {
    //             setError(e)
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }
    //     fetchPosts()
    // }, [])

    // if (isLoading) {
    //     return (
    //         <div className="activityfeed">
    //         <ActivityFilterPanel updateSearchResults={setSearchResults}/>
    //         <CreateActivity />
    //         <div className="activity-container">
    //             <div>Loading...</div>;
    //         </div>
    //     </div>
    //     )
    // }

    // if (error) {
    //     return (
    //         <div className="activityfeed">
    //         <ActivityFilterPanel updateSearchResults={setSearchResults}/>
    //         <CreateActivity />
    //         <div className="activity-container">
    //             <div>Something went wrong...</div>;
    //         </div>
    //     </div>
    //     )
    // }
    
    return (
        <div className="activityfeed">
            <ActivityFilterPanel updateSearchResults={setSearchResults}/>
            <CreateActivity />
            <div className="activity-container">
                { searchResults.map((event) => (    
                    <EventItem key={event.id} id={event.id} description={event.title} content={event.content} />                        
                ))}
            </div>
        </div>
    );
}