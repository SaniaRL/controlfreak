import { Button } from "react-bootstrap";

function ChangeViewButton({ icon, view, alt, isActive, setView }
    : { icon: string, view: string, alt: string, isActive: boolean, setView: (view: string) => void }) {
    return(
        <Button 
        className='view-button'
        onClick={() => setView(view)}>
            <img className={ isActive ? 'active-view' : '' } src={ icon } alt={ alt }/>
        </Button>
    );
}

export default ChangeViewButton