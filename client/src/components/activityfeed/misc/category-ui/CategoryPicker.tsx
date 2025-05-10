import { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import { CategoryProps } from '../../../../types/props/CategoryProps'

import './Category.css'

export default function CategoryPicker({category, categories, onChange}: CategoryProps) {
	const [selectedCategory, setSelectedCategory] = useState(category)


	const handleSelect = (key: string | null | undefined) => {
    const selected = categories.find((c) => String(c.id) === key);
    if (selected) {
      setSelectedCategory(selected)
      onChange(selected)
    }
  }

	//TODO: Default först eventuellt mest vanlig idk går inte? skapa ny?

	return(
		<>
			<DropdownButton 
				className='category-picker'
				id='category-picker'
				title={selectedCategory.name}
				onSelect={handleSelect}
				style={{
					backgroundColor: selectedCategory.backgroundColor,
					color: selectedCategory.textColor}}>

				{categories.map(c => 
					<Dropdown.Item 
						key={c.id} 
						eventKey={c.id}
						style={{
							backgroundColor: c.backgroundColor,
							color: c.textColor}}>
						{c.name}
					</Dropdown.Item>)}
			</DropdownButton>
		</>
	)
}