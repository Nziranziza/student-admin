import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

import SearchInput from '../components/search-input';
import Avatar from '../components/avatar';
import { useStudents } from '../hooks';
import Table, { Column } from '../components/table';
import { studentDataToRows } from '../utilities';

const studyGroups = [
  'Typography',
  'Biologists',
  'Chemistry Capital',
  'Web designers',
  'Black magicians',
  'Gamer boys',
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

const columns: Column[] = [
  {
    title: '',
    render: () => <Form.Check type="checkbox" />,
  },
  {
    title: '',
    render: (item: any) => <Avatar firstName={item.name} />,
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Sex',
    key: 'sex',
  },
  {
    title: 'Place and Date of Birth',
    key: 'placeDateOfBirth',
  },
  {
    title: 'Groups',
    key: 'groups',
    render: (item: any) => <StudyGroupList data={item.groups} />,
  },
];

export default function Students() {
  const { loading, data } = useStudents();
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
              {studyGroups.map((label, index) => (
                <Form.Check key={index} label={label} type="checkbox" />
              ))}
            </Form>
          </div>
        </Col>
        <Col md="9">
          <Table
            tableTitle={
              <>
                <FontAwesomeIcon icon={faUserAlt} />
                <span className="fw-bolder ms-3">125 students</span>
              </>
            }
            pageSize={data?.pageSize}
            className="mt-3 mt-md-5"
            data={studentDataToRows(data?.data)}
            columns={columns}
            dataLength={data?.count}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
}
