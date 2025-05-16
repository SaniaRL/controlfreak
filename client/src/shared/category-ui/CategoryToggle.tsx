import { Form } from 'react-bootstrap'
import { CategoryToggleProps } from '../../types/props/CategoryToggleProps'

export default function CategoryToggle({category, active, toggleActive}: CategoryToggleProps) {
  return(
    <div 
      className={`category-toggle-wrapper ${!active && 'inactive-toggle'}`} 
      style={{
        background: category.backgroundColor,
        color: category.textColor
      }}>
        <Form.Check 
          checked={active} 
          onChange={toggleActive} />
        {category.name}
    </div>
  )
}