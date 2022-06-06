import { useState, useContext } from 'react';
import { Form, Col, Row, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  IconDefinition,
  faAdd,
} from '@fortawesome/free-solid-svg-icons';

import { Avatar } from '../../../components';
import { StudyGroupInputs } from '../../../services/studyGroup';
import { Store } from '../../../store';
import { useStudyGroupMembers } from '../../../hooks';

type FormInput = {
  type: 'input' | 'textarea';
  label: string;
  placeholder: string;
  name: keyof StudyGroupInputs;
};

type StudyGroupFormProps = {
  onSubmit: (form: StudyGroupInputs) => void;
  value?: Partial<StudyGroupInputs>;
  students?: any[];
  type?: 'create' | 'update';
  groupId?: number;
};

const studyGroupFormInput: FormInput[] = [
  {
    type: 'input',
    label: 'Name',
    placeholder: 'Enter group name',
    name: 'name',
  },
  {
    type: 'input',
    label: 'Group leader',
    placeholder: 'Enter group leader',
    name: 'leader',
  },
  {
    type: 'input',
    label: 'Working time',
    placeholder: 'Tuesday, 2PM',
    name: 'time',
  },
  {
    type: 'textarea',
    label: 'Subject',
    placeholder: 'Describe this group',
    name: 'subject',
  },
];
type StudentItemProp = {
  name: string;
  icon?: IconDefinition;
  onClick?: () => void
};

function StudentItem({ name, icon = faTrash, onClick }: StudentItemProp) {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div className='d-flex align-items-center'>
        <Avatar size='sm' firstName={name} />
        <span className='ms-2'>{name}</span>
      </div>
      <Button onClick={onClick} variant='' className='shadow-none'>
        <FontAwesomeIcon size='xs' icon={icon} color='#E05E6A' />
      </Button>
    </div>
  );
}

type StudentPickerProps = {
  options: any[],
  onSelect: any
}

function StudentPicker({ options = [], onSelect }: StudentPickerProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='secondary'>Add a member</Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option: any) => (
          <Dropdown.Item key={option.id} onClick={() => onSelect(option)}>
            <StudentItem name={option.name} icon={faAdd} />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

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

  const { state } = useContext(Store);
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

  const handleRemoveGroupMember = (student: any) => {
    if (!groupId) return;
    onRemove(groupId, student);
    setStudents(_students.filter(st => st.id !== student.id))
  };

  const handleAddGroupMember = (student: any) => {
    if (!groupId) return;
    onAdd(groupId, student);
    setStudents([
      student,
      ..._students
    ])
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={isUpdate ? 8 : 12}>
          <Row>
            {studyGroupFormInput.map(({ label, placeholder, type, name }) => {
              return (
                <Col md='6' key={name}>
                  <Form.Group className='mb-3'>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                      onChange={(e) => onInputChange(name, e.target.value)}
                      name={name}
                      as={type}
                      placeholder={placeholder}
                      value={form[name] || ''}
                    />
                  </Form.Group>
                </Col>
              );
            })}
          </Row>
          {isUpdate && (
            <StudentPicker
              options={state.students.data.filter(
                (item: any) =>
                  !_students.find((student) => student.id === item.id)
              )}
              onSelect={handleAddGroupMember}
            />
          )}
        </Col>
        <div className='vr p-0'></div>
        {isUpdate && (
          <Col>
            <div className='h6 text-secondary'>Group members</div>
            <div>
              {_students.map((student) => (
                <StudentItem
                  name={student.name}
                  key={student.id}
                  onClick={() => handleRemoveGroupMember(student)}
                />
              ))}
            </div>
          </Col>
        )}
      </Row>
      <div className='d-flex justify-content-end'>
        <Button disabled={!form.name} className='text-end' type='submit'>
          Save
        </Button>
      </div>
    </Form>
  );
}
