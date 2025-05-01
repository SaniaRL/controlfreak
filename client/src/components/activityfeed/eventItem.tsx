import { Card } from 'react-bootstrap'
import UpdateButton from '../../shared/UpdateButton'
import DeleteButton from '../../shared/DeleteButton'
import { EventData } from '../../types/EventData';
import './ActivityFeed.css'

function EventItem({event}: {event: EventData}) {
	const deletePost = async (id: number) => {
		//Set loading set error
		try {
			await fetch(`https://localhost:7159/posts/event/${id}/delete`, {
					method: 'DELETE',
			});
		} catch (error) {
				console.error('Error deleting task:', error);
		}
		}; 

	return(
		<Card className='event-item'>
			<div className='event-item-head'>
				<p>{event.title}</p>
				<div className='dates'>
					<p>{new Date(event.start).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}</p>
					<p>{new Date(event.end).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}</p>
				</div>
				<div className='event-item-options'>
						<UpdateButton />
						<DeleteButton id={Number(event.id)} onDelete={deletePost} />
				</div>
			</div>
			<div className='event-item-body'>
			<p>{event.content}</p>
			<p>category name</p>
			</div>
		</Card>
	);
}

export default EventItem