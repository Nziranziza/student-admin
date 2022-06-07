import { Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import { TabNavigation } from '../components';
import { TabOption } from '../components/tab-navigation';
import { useStudents, useStudyGroups } from '../hooks';

export default function Layout(): JSX.Element {
  const { data: students } = useStudents();
  const { data: studyGroups } = useStudyGroups();

  const getOptions = (): TabOption[] => {
    return [
      {
        title: 'Students',
        description: `${students.count} students registered`,
        link: '/'
      },
      {
        title: 'Study groups',
        description: `${studyGroups.count} study groups with ${studyGroups.studentCount} students`,
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
