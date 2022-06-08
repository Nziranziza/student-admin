import { FunctionComponent, useState } from 'react';
import { Form, Col, Row, Button, ListGroup } from 'react-bootstrap';

import { StudyGroupInputs } from '../../../services/studyGroup';
import { useStudyGroupMembers, useStudents } from '../../../hooks';
import { GetStudentResponse } from '../../../services/student';
import { StudentItem, StudentPicker } from './';

type FormInput = {
  type?: 'input' | 'textarea';
  label: string;
  placeholder: string;
  name: keyof StudyGroupInputs;
  size?: number;
};

type StudyGroupFormProps = {
  onSubmit: (form: StudyGroupInputs) => void;
  value?: Partial<StudyGroupInputs>;
  students?: GetStudentResponse[];
  type?: 'create' | 'update';
  groupId?: number;
};

type ColFormInputProps = {
  value: string | undefined;
  onInputChange: (key: string, value: string) => void;
};

const ColFormInput: FunctionComponent<FormInput & ColFormInputProps> = ({
  size = 6,
  name,
  label,
  placeholder,
  type = 'input',
  value,
  onInputChange,
}) => {
  return (
    <Col md={size}>
      <Form.Group className='mb-3'>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          onChange={(e) => onInputChange(name, e.target.value)}
          name={name}
          as={type}
          placeholder={placeholder}
          value={value || ''}
        />
      </Form.Group>
    </Col>
  );
};

export default function StudyGroupForm({
  onSubmit,
  value = {},
  type = 'create',
  students = [],
  groupId,
}: StudyGroupFormProps): JSX.Element {
  const [form, setForm] = useState<StudyGroupInputs>({
    name: '',
    leader: '',
    time: '',
    subject: '',
    ...value,
  });
  const [_students, setStudents] = useState(students);

  const { onSearch, data, loading } = useStudents();
  const { onRemove, onAdd } = useStudyGroupMembers();

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    onSubmit(form);
  };

  const onInputChange = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const isUpdate = type === 'update';

  const handleRemoveGroupMember = (student: GetStudentResponse) => {
    if (!groupId) return;
    onRemove(groupId, student);
    setStudents(_students.filter((st) => st.id !== student.id));
  };

  const handleAddGroupMember = (student: GetStudentResponse) => {
    if (!groupId) return;
    onAdd(groupId, student);
    setStudents([student, ..._students]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={isUpdate ? 8 : 12} className="d-flex flex-column justify-content-between">
          <Row>
            <ColFormInput
              onInputChange={onInputChange}
              value={form.name}
              name='name'
              placeholder='Enter group name'
              label='Name'
            />
            <ColFormInput
              onInputChange={onInputChange}
              value={form.leader}
              name='leader'
              placeholder='Enter group leader'
              label='Group leader'
            />
            <ColFormInput
              onInputChange={onInputChange}
              value={form.time}
              name='time'
              placeholder='Tuesday, 2PM'
              label='Working time'
              size={isUpdate ? 6 : 12}
            />
            {isUpdate && (
              <Col md='6' className='d-flex align-items-end'>
                <StudentPicker
                  options={data.data.filter(
                    (item) =>
                      item.enrollments.length < 4 && !_students.find((student) => student.id === item.id)
                  )}
                  onSelect={handleAddGroupMember}
                  onSearch={(keyword) =>
                    onSearch({
                      search: keyword,
                    })
                  }
                  loading={loading}
                />
              </Col>
            )}
            <ColFormInput
              onInputChange={onInputChange}
              value={form.subject}
              name='subject'
              placeholder='Describe this group'
              label='Subject'
              type='textarea'
              size={12}
            />
          </Row>
          <div className='d-flex justify-content-end mt-2'>
            <Button disabled={!form.name} className='text-end' type='submit'>
              Save
            </Button>
          </div>
        </Col>
        <div className='vr p-0'></div>
        {isUpdate && (
          <Col>
            <div className='h6 text-secondary'>Group members</div>
            <ListGroup variant="flush">
              {_students.map((student) => (
                <ListGroup.Item className="py-1 px-2 border-0" action as="li" key={student.id}>
                  <StudentItem
                    name={student.name}
                    onClick={() => handleRemoveGroupMember(student)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        )}
      </Row>
    </Form>
  );
}
