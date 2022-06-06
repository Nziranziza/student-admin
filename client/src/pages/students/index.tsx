import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback } from 'react';

import {
  SearchInput,
  Avatar,
  Table,
  Modal,
  CheckBoxGroup
} from '../../components';
import { useStudents, useStudyGroups } from '../../hooks';
import { Column } from '../../components/table';
import { studentDataToRows } from '../../utilities';
import { StudentInputs } from '../../services/student';
import { StudyGroupList, StudentForm } from './components'

const columns: Column[] = [
  {
    title: '',
    render: () => <Form.Check type='checkbox' />,
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
  const { loading, data, onSearch, onPageChange, onCreate } = useStudents();
  const [showModal, setShowModal] = useState(false);
  const { data: groups, loading: groupsLoading } = useStudyGroups();

  const handleStudentCreate = (form: StudentInputs) => {
    onCreate(form);
    setShowModal(false);
  };

  const onGroupFilterChange = useCallback(
    (groupIds: string[]) => {
      onSearch({
        groups: groupIds,
      });
    },
    [onSearch]
  );

  return (
    <div>
      <Row>
        <Col md='3' className='pe-md-5'>
          <div>
            <label className='mb-2 text-muted'>SEARCH FOR NAME</label>
            <SearchInput
              onSearch={(keyWord: string) =>
                onSearch({
                  search: keyWord,
                })
              }
            />
          </div>
          <div className='mt-3 mt-md-5 mb-3'>
            <label className='text-muted mb-2'>FILTERS FOR STUDY GROUPS</label>
            <CheckBoxGroup
              options={groups.map(({ name, id }) => ({
                label: name,
                value: id,
              }))}
              onChange={onGroupFilterChange}
              loading={groupsLoading}
            />
          </div>
        </Col>
        <Col md='9'>
          <Table
            tableTitle={
              <>
                <FontAwesomeIcon icon={faUserAlt} />
                <span className='fw-bolder ms-3'>{data.count} students</span>
              </>
            }
            pageSize={data?.pageSize}
            className='mt-3 mt-md-5'
            data={studentDataToRows(data?.data)}
            columns={columns}
            dataLength={data?.count}
            loading={loading}
            onPageChange={onPageChange}
            onAddItem={() => setShowModal(true)}
            emptyStateMessage='No students available!'
          />
        </Col>
      </Row>
      <Modal
        title='Add a new student'
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <StudentForm onSubmit={handleStudentCreate} />
      </Modal>
    </div>
  );
}
