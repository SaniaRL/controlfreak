import CategoryToggle from '../../shared/category-ui/CategoryToggle'
import { CategoryToggleListProps } from '../../types/props/CategoryToggleListProps'

export default function CategoryToggleList({categories, activeCategories, setActiveCategory}: CategoryToggleListProps) {
  return(
    <div className='category-toggle-list'>
      {categories.map(category => {
          const active = activeCategories.some(c => c.id === category.id)
          return (
            <CategoryToggle 
              key={category.id}
              category={category}
              active={active}
              toggleActive={() => setActiveCategory(category.id!, !active)}
            />
          )
        }
      )}
    </div>
  )
}