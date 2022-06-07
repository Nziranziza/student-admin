import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

import logo from '../assets/img/logo.png';
import Avatar from './avatar';

export default function Header(): JSX.Element {
  return (
    <Navbar className="header justify-content-between">
      <Navbar.Brand href="#">
        <div className="logo">
          <img className="img-fluid" src={logo} alt="logo" />
        </div>
        <span className="small d-none d-md-block text-muted">
          Student Administration Framework
        </span>
      </Navbar.Brand>
      <div className="d-flex align-items-center">
        <Avatar size="lg" firstName="Adam" secondName="Smith" />
        <Nav>
          <NavDropdown title="Adam" id="dropdown">
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Item>Notifications</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    </Navbar>
  );
}
