import { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'

export default function Searchbar({ onSearch }: { onSearch: (searchTerm: string) => void }) {
	const [search, setSearch] = useState('')


	//Lägg till icon inte viktigt men

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value
		setSearch(newSearchTerm)
		onSearch(newSearchTerm)
	}

	return(
		<Form.Control
			className='search-input'
			type='text'
			placeholder='Search...'
			autoComplete='off'
			onChange={handleChange}
			value={search}
		/>
	)
}