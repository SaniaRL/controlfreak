import Button from 'react-bootstrap/Button'

export default function UpdateButton() {
    return(
        <Button 
        className='edit-post-button'
        variant="light">
            <img src='/icons/edit_black.png' alt='pencil edit button' />
        </Button>
    )
}