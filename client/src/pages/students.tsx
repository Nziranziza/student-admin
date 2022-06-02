import { Row, Col, Form, Table, Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import SearchInput from '../components/search-input';
import Avatar from '../components/avatar';

const studyGroups = [
  'Typography',
  'Biologists',
  'Chemistry Capital',
  'Web designers',
  'Black magicians',
  'Gamer boys',
];

const students = [
  {
    name: 'John Doe Smith',
    sex: 'Male',
    placeOfBirth: 'Budapest',
    dateOfBirth: '1989.05.21',
    groups: ['Biologists', 'Typography', 'Chemistry Capital', 'Gamer Boys'],
  },
  {
    name: 'Peter Erdosi',
    sex: 'Male',
    placeOfBirth: 'Budapest',
    dateOfBirth: '1989.05.21',
    groups: ['Biologists'],
  },
  {
    name: 'Rebecaa Truli',
    sex: 'Male',
    placeOfBirth: 'Budapest',
    dateOfBirth: '1989.05.21',
    groups: ['Biologists'],
  },
  {
    name: 'Ted Bundy',
    sex: 'Male',
    placeOfBirth: 'Budapest',
    dateOfBirth: '1989.05.21',
    groups: ['Web designers', 'Chemistry Capital'],
  },
  {
    name: 'Rob Thorton',
    sex: 'Male',
    placeOfBirth: 'Budapest',
    dateOfBirth: '1989.05.21',
    groups: ['Web designers'],
  },
];

type StudyGroupListProps = {
  data: string[];
};

function StudyGroupList({ data }: StudyGroupListProps) {
  if (data.length > 2) {
    return (
      <span>
        {data.slice(0, 2).join(',')} and{' '}
        <span className="text-primary">{data.length - 2} more</span>
      </span>
    );
  }
  return <span>{data.join(',')}</span>;
}

function PageSwitcher() {
  return (
    <Nav variant="pills" defaultActiveKey="#1">
      <Nav.Item>
        <Nav.Link href="#1">1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#2">2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#3">3</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default function Students() {
  return (
    <div>
      <Row>
        <Col md="3" className="pe-md-5">
          <div>
            <label className="mb-2 text-muted">SEARCH FOR NAME</label>
            <SearchInput />
          </div>
          <div className="mt-3 mt-md-5 mb-3">
            <label className="text-muted mb-2">FILTERS FOR STUDY GROUPS</label>
            <Form>
              {studyGroups.map((label) => (
                <Form.Check label={label} type="checkbox" />
              ))}
            </Form>
          </div>
        </Col>
        <Col md="9">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
            <div className="d-none d-md-block">
              <FontAwesomeIcon icon={faUserAlt} />
              <span className="fw-bolder ms-2">125 Students</span>
            </div>
            <Button variant="secondary ms-md-3">
              <FontAwesomeIcon icon={faEdit} />
              <span className="ms-2">New</span>
            </Button>
            </div>
            <PageSwitcher />
          </div>
          <Table responsive="md" className="mt-3 mt-md-5">
            <thead>
              <tr>
                <th>
                  <Form.Check type="checkbox" />
                </th>
                <th></th>
                <th className="text-muted">Name</th>
                <th className="text-muted">Sex</th>
                <th className="text-muted">Place and Date of Birth</th>
                <th className="text-muted text-end">Groups</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td>
                    <Avatar firstName={student.name} />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.sex}</td>
                  <td>
                    {student.placeOfBirth},{student.dateOfBirth}
                  </td>
                  <td className="text-end">
                    {<StudyGroupList data={student.groups} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
