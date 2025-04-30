import { useState, useEffect } from 'react'

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
		<section className='search-section'>
			<div className='search-input-div'>
				<input
					className='search-input'
					type='text'
					placeholder='Search...'
					autoComplete='off'
					onChange={handleChange}
					value={search}
				/>
			</div>
		</section>
	);
}

export default Searchbar