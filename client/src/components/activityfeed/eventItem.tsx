import { Card } from "react-bootstrap";
import UpdateButton from "../../shared/updateButton";
import DeleteButton from "../../shared/deleteButton";


function EventItem({id, description, content}: {id: number, description: string, content: string}) {


	const deletePost = async (id: number) => {


		//Få med i body om det är event eller task och ha samma kontroller? olika kontroller?
		try {
			await fetch(`https://localhost:7159/posts/event/${id}/delete`, {
					method: 'DELETE',
			});
		} catch (error) {
				console.error('Error deleting task:', error);
		}
		}; 

	return(
		<Card className='activity-item'>
			<p>{description}</p>
			<p>{content}</p>
			<div className='activity-item-options'>
					<UpdateButton />
					<DeleteButton id={id} onDelete={deletePost} />
			</div>
		</Card>
	);
}

export default EventItem