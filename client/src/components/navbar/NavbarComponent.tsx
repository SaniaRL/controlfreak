import { Container, Navbar} from "react-bootstrap";
import '../../App.css'

function NavbarComponent() {
  return (
    <>
        <Navbar 
        className="navbar justify-content-between">
            <Container>
                <Navbar.Brand href="#">Navbar</Navbar.Brand>
                <Navbar.Text>placeholder</Navbar.Text>
            </Container>
        </Navbar>
    </>
  );
}

export default NavbarComponent
