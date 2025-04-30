import { Button } from "react-bootstrap";

function ChangeViewButton({ icon, view, alt, isActive, setView }
    : { icon: string, view: string, alt: string, isActive: boolean, setView: (view: string) => void }) {
    return(
        <Button 
        className={`view-button ${isActive ? 'active-view' : ''}`}
        onClick={() => setView(view)}>
            <img src={ icon } alt={ alt }/>
        </Button>
    );
}

export default ChangeViewButton