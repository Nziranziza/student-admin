import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export default function TabNavigation() {
  return (
    <Nav variant="tabs">
      <Nav.Item className="col-6 col-md-4">
        <NavLink className="p-3 p-md-5 h-100 d-flex flex-column shadow-sm text-decoration-none nav-link" to="/">
          <span className="fw-bold">STUDENTS</span>
          <span>125 student registered</span>
        </NavLink>
      </Nav.Item>
      <Nav.Item className="col-6 col-md-4">
        <NavLink className="p-3 p-md-5 ms-md-3 h-100 d-flex flex-column shadow-sm text-decoration-none nav-link" to="/study-groups">
           <span className="fw-bold">STUDY GROUPS</span>
          <span>6 study groups with 42 students</span>
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}