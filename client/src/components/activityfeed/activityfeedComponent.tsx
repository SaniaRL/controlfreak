import ActivityItem from "./activityItem";
import "../../App.css"
import { useEffect, useState } from "react";
import { Post } from "../../types/Post.ts"

const BASE_URL = 'https://localhost:7159';

export default function ActivityfeedComponent() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([])

    //Upppdatera för att ha flera sidor eller hämta lite i taget

    useEffect (() => {
        const fetchPosts = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${BASE_URL}/posts?includeCompletedTasks=true`)
                const posts = (await response.json()) as Post[]; 

                setPosts(posts);

                console.log(posts);
            } catch (e: any) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something went wrong!</div>
    }
    
    return (
        <div className="activityfeed">
            //Ändra detta till att mappa poster
            <div className="post-container">
                {posts.map((post) => (
                    <ActivityItem key={post.id} description={post.description} isCompleted={post.isCompleted} />
                ))}
            </div>
        </div>
    );
}