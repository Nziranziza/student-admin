import { Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import SearchInput from '../components/search-input';
import Avatar from '../components/avatar';
import { useStudents } from '../hooks';
import Table, { Column } from '../components/table';
import { studentDataToRows } from '../utilities';
import Modal from '../components/modal';
import { StudentInputs } from '../services/student';

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

type FormInput = {
  type: 'date' | 'text' | 'email' | 'radio';
  label: string;
  placeholder?: string;
  options?: string[];
  name: keyof StudentInputs;
};

type StudentFormProps = {
  onSubmit: (form: StudentInputs) => void;
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

const studentFormInput: FormInput[] = [
  {
    type: 'text',
    label: 'Name',
    placeholder: 'Name',
    name: 'name',
  },
  {
    type: 'email',
    label: 'Email address',
    placeholder: 'Enter email',
    name: 'email',
  },
  {
    type: 'text',
    label: 'Place of Birth',
    placeholder: 'Place of birth',
    name: 'placeOfBirth',
  },
  {
    type: 'date',
    label: 'Date of Birth',
    placeholder: 'Date of Birth',
    name: 'dateOfBirth',
  },
  {
    type: 'radio',
    label: 'Gender',
    options: ['Male', 'Female'],
    name: 'sex',
  },
];

function StudentForm({ onSubmit }: StudentFormProps) {
  const [form, setForm] = useState<StudentInputs>({
    name: '',
    sex: 'Male',
    placeOfBirth: '',
    dateOfBirth: '',
    email: '',
  });
  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    onSubmit(form)
  };

  const onInputChange = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {studentFormInput.map(
          ({ label, placeholder, options = [], type, name }) => {
            if (type === 'radio') {
              return (
                <Col md="6" key={name}>
                  <Form.Group className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    {options.map((option) => (
                      <Form.Check
                        type="radio"
                        key={option}
                        label={option}
                        name={name}
                        checked={form[name] === option}
                        onChange={() => onInputChange(name, option)}
                      />
                    ))}
                  </Form.Group>
                </Col>
              );
            }
            return (
              <Col md="6" key={name}>
                <Form.Group className="mb-3">
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    onChange={(e) => onInputChange(name, e.target.value)}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={form[name] || ''}
                  />
                </Form.Group>
              </Col>
            );
          }
        )}
      </Row>
      <div className="d-flex justify-content-end">
        <Button className="text-end" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}

export default function Students() {
  const { loading, data, onSearch, onPageChange, onCreate } = useStudents();
  const [showModal, setShowModal] = useState(false);

  const handleStudentCreate = (form: StudentInputs) => {
    onCreate(form);
    setShowModal(false);
  };

  return (
    <div>
      <Row>
        <Col md="3" className="pe-md-5">
          <div>
            <label className="mb-2 text-muted">SEARCH FOR NAME</label>
            <SearchInput onSearch={onSearch} />
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
            onPageChange={onPageChange}
            onAddItem={() => setShowModal(true)}
          />
        </Col>
      </Row>
      <Modal
        title="Add a new student"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <StudentForm onSubmit={handleStudentCreate} />
      </Modal>
    </div>
  );
}
