import { useState } from 'react'
import { Button } from 'react-bootstrap'

import { TagEditProps } from '../../types/props/TagEditProps'
import Tag from './Tag'

import './TagDisplay.css'

export default function TagDisplay({tags, tagEditProps, searchTerm}: {
  tags?: string[]
  tagEditProps?: TagEditProps
  searchTerm?: string
}) {
  const [open, setOpen] = useState(false)

  return(
    <div className='tag-display'>
      <div className='tag-wrapper'>
        {tagEditProps 
          ? <Button 
            className='tag-btn'
            onClick={() => setOpen(!open)}>
              +
            </Button>
          : <p className='tag'>
              #
            </p>
        }
      </div>
      <div className='tag-container'>
        {open &&
          <Tag 
            key={''}
            tag={''}
            autofocus={true}
            cantClose={true}
            {...(tagEditProps && { editProps: tagEditProps })}/>
        }
        {tags?.map(t => 
          <Tag 
            key={t}
            tag={t}
            {...(tagEditProps && { editProps: tagEditProps })}
            searchTerm={searchTerm}
            />
        )}
      </div>
    </div>
  )
}