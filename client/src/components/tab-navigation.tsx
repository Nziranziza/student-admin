import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export type TabOption = {
  title: string;
  description: string;
  link: string
};

type TabNavigationProps = {
  options: TabOption[]
}

export default function TabNavigation({
  options
}: TabNavigationProps): JSX.Element {
  return (
    <Nav variant="tabs">
      {options.map(({ title, description, link }) => <Nav.Item key={title} className="col-6 col-md-4 me-2">
        <NavLink className="p-3 p-md-5 h-100 d-flex flex-column shadow-sm text-decoration-none nav-link" to={link}>
          <span className="fw-bold">{title}</span>
          <span>{description}</span>
        </NavLink>
      </Nav.Item>)}
    </Nav>
  );
}