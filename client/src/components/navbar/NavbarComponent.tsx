import { ButtonGroup, Container, Navbar} from "react-bootstrap";
import '../../App.css'
import ChangeViewButton from "../../shared/ChangeViewButton";
import './Navbar.css'

function NavbarComponent({ currentView, setView }: { currentView: string, setView: (view: string) => void }) {

  return (
    <>
        <Navbar 
        className="navbar justify-content-between">
            <Container>
              <Navbar.Brand href="#">Control Freak</Navbar.Brand>
              <ButtonGroup>
                <ChangeViewButton 
                icon={"/icons/calendar_icon.png"} 
                view={"calendar"} 
                alt={"calendar view icon"} 
                isActive={currentView === "calendar"}
                setView={setView} />
                <ChangeViewButton 
                icon={"/icons/activity_feed.png"} 
                view={"activity"} 
                alt={"activityfeed view icon"} 
                isActive={currentView === "activity"}
                setView={setView} />
              </ButtonGroup>
            </Container>
        </Navbar>
    </>
  );
}

export default NavbarComponent
