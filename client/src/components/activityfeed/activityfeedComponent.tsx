import TaskItem from "./taskItem.tsx";
import "../../App.css"
import { useEffect, useState } from "react";
import CreateActivity from "./createActivity.tsx";
import ActivityFilterPanel from "./activityFilterPanel.tsx";
import { TaskData } from "../../types/TaskData.ts";
import { EventData } from "../../types/EventData.ts";
import EventItem from "./eventItem.tsx";

const BASE_URL = 'https://localhost:7159';

export default function ActivityfeedComponent() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [tasks, setTasks] = useState<TaskData[]>([])
    const [events, setEvents] = useState<EventData[]>([])
    type Activity = (TaskData & { type: 'task' }) | (EventData & { type: 'event' })

    const combined: Activity[] = [
      ...tasks.map(t => ({ ...t, type: 'task' as const })),
      ...events.map(e => ({ ...e, type: 'event' as const }))
    ];
    
    //Upppdatera för att ha flera sidor eller hämta lite i taget
    //Sortering
    //Filtrering

    useEffect (() => {
        const fetchPosts = async () => {
            setIsLoading(true);

            try {
                const taskResponse = await fetch(`${BASE_URL}/APIv1/posts/tasks?includeCompletedTasks=true`)
                const posts = (await taskResponse.json()) as TaskData[]; 

                setTasks(posts);

                const eventResponse = await fetch(`${BASE_URL}/APIv1/posts/events`)
                const events = (await eventResponse.json()) as EventData[]; 

                setEvents(events);

                console.log(posts);
                console.log(events);
            } catch (e: any) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [])

    if (isLoading) {
        return (
            <div className="activityfeed">
            <ActivityFilterPanel />
            <CreateActivity />
            <div className="activity-container">
                <div>Loading...</div>;
            </div>
        </div>
        )
    }

    if (error) {
        return (
            <div className="activityfeed">
            <ActivityFilterPanel />
            <CreateActivity />
            <div className="activity-container">
                <div>Something went wrong...</div>;
            </div>
        </div>
        )
    }
    
    return (
        <div className="activityfeed">
            <ActivityFilterPanel />
            <CreateActivity />
            <div className="activity-container">
                {combined.map((post) => (
                    post.type === 'event' ? (
                        <EventItem key={post.id} id={post.id} description={post.description} content={post.content} />                        
                    ) : (

                        <TaskItem key={post.id} id={post.id} description={post.description} isCompleted={post.completed} />                        
                    )
                ))}
            </div>
        </div>
    );
}