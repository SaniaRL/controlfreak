import { TagEditProps } from '../../../../types/props/TagEditProps'
import Tag from './Tag'
import './TagDisplay.css'

export default function TagDisplay({tags, tagEditProps}: {
  tags: string[]
  tagEditProps?: TagEditProps
}) {
  // const[newState, setNewState] = useState(tags)


  // const handleDeleteTag = (tag: string) => {
  //   const tags = tags.filter(t => t !== tag)
  //   // setNewState(updatedTags)
  //   tagEditProps?.onDelete(tag)
  // }
  
  return(
    <div className='tag-container'>
      {tags.map(t => 
        <Tag 
          key={t}
          tag={t}
          {...(tagEditProps && { editProps: tagEditProps })}/>
      )}
    </div>
  )
}