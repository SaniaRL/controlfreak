import TaskItem from "./taskItem.tsx";
import "../../App.css"
import { useEffect, useState } from "react";
import CreateActivity from "./createActivity.tsx";
import ActivityFilterPanel from "./activityFilterPanel.tsx";
import { Task } from "../../types/Task.ts";

const BASE_URL = 'https://localhost:7159';

export default function ActivityfeedComponent() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState<Task[]>([])
    const [events, setEvents] = useState<Event[]>([])
    const combined = [...posts, ...events]

    //Upppdatera för att ha flera sidor eller hämta lite i taget

    useEffect (() => {
        const fetchPosts = async () => {
            setIsLoading(true);

            try {
                const taskResponse = await fetch(`${BASE_URL}/APIv1/posts/tasks?includeCompletedTasks=true`)
                const posts = (await taskResponse.json()) as Task[]; 

                setPosts(posts);

                const eventResponse = await fetch(`${BASE_URL}/APIv1/posts/events`)
                const events = (await eventResponse.json()) as Event[]; 

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
                {posts.map((post) => (
                    <TaskItem key={post.id} id={post.id} description={post.description} isCompleted={post.completed} />
                ))}
            </div>
        </div>
    );
}