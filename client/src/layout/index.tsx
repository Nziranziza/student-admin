import { Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';

import { Store } from '../store';
import { TabNavigation } from '../components';
import { TabOption } from '../components/tab-navigation';

export default function Layout() {
  const { state } = useContext(Store);

  const getOptions = (): TabOption[] => {
    const { students, studyGroups } = state;
    return [
      {
        title: 'Students',
        description: `${students.count} students registered`,
        link: '/'
      },
      {
        title: 'Study groups',
        description: `${studyGroups.length} study groups`,
        link: '/study-groups'
      }
    ]
  }

  return (
    <div>
      <TabNavigation options={getOptions()} />
      <Card>
        <Card.Body className="p-3 p-md-5">
          <Outlet />
        </Card.Body>
      </Card>
    </div>
  );
}
