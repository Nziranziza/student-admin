import { Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import TabNavigation from '../components/tab-navigation';

export default function Layout() {
  return (
    <div>
      <TabNavigation />
      <Card>
        <Card.Body className="p-3 p-md-5">
          <Outlet />
        </Card.Body>
      </Card>
    </div>
  );
}
