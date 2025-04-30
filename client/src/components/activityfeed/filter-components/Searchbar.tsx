import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';

const BASE_URL = 'https://localhost:7159';

function Searchbar({ updateSearchResults }: { updateSearchResults: React.Dispatch<React.SetStateAction<any[]>> }) {
	const [search, setSeach] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSeach(e.target.value)
	}

	useEffect (() => {
		const delayDebounce = setTimeout(async () => {
			if(search === "") {
				const eventResponse = await fetch(`${BASE_URL}/APIv1/events/calendar`)
				const events = await eventResponse.json()
				updateSearchResults(events)			
			} else {		
				fetch(`${BASE_URL}/APIv1/events/search/${search}`)
					.then(response => response.json())
					.then(data => updateSearchResults(data))
			}	
		}, 300)
	return () => clearTimeout(delayDebounce)	
	}, [search]) 

	return(
		<section>
			<Form.Control
				className='search-input'
				type='text'
				placeholder='Search...'
				autoComplete='off'
				onChange={handleChange}
				value={search}
			/>
		</section>
	)
}

export default Searchbar