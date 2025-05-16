import { CategoryToggleListProps } from "../../types/props/CategoryToggleListProps";
import CategoryToggleList from "./CategoryToggleList";

export default function LSidebarComponent({categories, activeCategories, setActiveCategory}: CategoryToggleListProps) {
	return (
		<div className='sidebar sidebar-left bg-body-tertiary'>
			<CategoryToggleList categories={categories} activeCategories={activeCategories} setActiveCategory={setActiveCategory} />
		</div>
	)
}