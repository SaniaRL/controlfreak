import Button from 'react-bootstrap/Button';

function DeleteButton() {
    return(
        <Button 
        className='edit-post-button'
        variant="light">
            <img src='/icons/bin_black.png' alt='garbage bin delete button' />
        </Button>
    );
}

export default DeleteButton