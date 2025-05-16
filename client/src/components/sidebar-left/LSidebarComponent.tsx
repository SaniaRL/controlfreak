import { CategoryToggleListProps } from '../../types/props/CategoryToggleListProps'
import CategoryToggleList from './CategoryToggleList'

export default function LSidebarComponent({categories, activeCategories, setActiveCategory}: CategoryToggleListProps) {
	return (
		<div className='sidebar sidebar-left'>
			<h5 className='text-center fw-light'>Show Categories</h5>
			<CategoryToggleList categories={categories} activeCategories={activeCategories} setActiveCategory={setActiveCategory} />
		</div>
	)
}