
import { useEffect } from 'react'
import { Category } from '../../types/dto/Category'

import './Category.css'

export default function CategoryDisplay({category, onClick}
	: {category: Category, onClick?: () => void}) {

	useEffect(() => {
		console.log(category)
	}, [category])

	return(
		<div
		className='category-display' 
		onClick={onClick}
		style={{
			backgroundColor: category.backgroundColor,
			color: category.textColor
		}}>
			{category.name}
		</div>
	)
}