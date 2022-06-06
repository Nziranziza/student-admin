import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react'

import { StudentInputs } from '../../../services/student';

type FormInput = {
  type: 'date' | 'text' | 'email' | 'radio';
  label: string;
  placeholder?: string;
  options?: string[];
  name: keyof StudentInputs;
};

type StudentFormProps = {
  onSubmit: (form: StudentInputs) => void;
  value?: Partial<StudentInputs>;
};

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


export default function StudentForm({ onSubmit, value = {} }: StudentFormProps): JSX.Element {
  const [form, setForm] = useState<StudentInputs>({
    name: '',
    sex: 'Male',
    placeOfBirth: '',
    dateOfBirth: '',
    email: '',
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
        <Button disabled={!form.email || !form.name} className="text-end" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}