import Button from 'react-bootstrap/Button'

function DeleteButton({ id, onDelete }: { id: number, onDelete: (id: number) => void }) {
    return(
        <Button 
        className='edit-post-button'
        variant="light"
        onClick={() => onDelete(id)}>
            <img src='/icons/bin_black.png' alt='garbage bin delete button' />
        </Button>
    );
}

export default DeleteButton