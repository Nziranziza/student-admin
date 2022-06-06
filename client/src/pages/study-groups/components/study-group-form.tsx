import { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

import { StudyGroupInputs } from '../../../services/studyGroup';

type FormInput = {
  type: 'input' | 'textarea',
  label: string;
  placeholder: string;
  name: keyof StudyGroupInputs,
}

type StudyGroupFormProps = {
  onSubmit: (form: StudyGroupInputs) => void;
  value?: Partial<StudyGroupInputs>;
};

const studyGroupFormInput: FormInput[] = [
  {
    type: 'input',
    label: 'Name',
    placeholder: 'Enter group name',
    name: 'name'
  },
  {
    type: 'input',
    label: 'Group leader',
    placeholder: 'Enter group leader',
    name: 'leader'
  },
  {
    type: 'input',
    label: 'Working time',
    placeholder: 'Tuesday, 2PM',
    name: 'time'
  },
  {
    type: 'textarea',
    label: 'Subject',
    placeholder: 'Describe this group',
    name: 'subject'
  }
]

export default function StudyGroupForm({
  onSubmit, 
  value = {}
}: StudyGroupFormProps): JSX.Element {
  const [form, setForm] = useState<StudyGroupInputs>({
    name: '',
    leader: '',
    time: '',
    subject: '',
    ...value
  });

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

  return <Form onSubmit={handleSubmit}>
    <Row>
    {studyGroupFormInput.map(
          ({ label, placeholder, type, name }) => {
            return (
              <Col md="6" key={name}>
                <Form.Group className="mb-3">
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
          }
        )}
    </Row>
    <div className="d-flex justify-content-end">
        <Button disabled={!form.name} className="text-end" type="submit">
          Save
        </Button>
      </div>
  </Form>
}