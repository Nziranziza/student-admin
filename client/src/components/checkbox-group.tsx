import { Form, Placeholder } from 'react-bootstrap';
import { useState } from 'react';
import classnames from 'classnames';

import { NoContent } from './icons';

type Option = {
  label: string;
  value: string;
};

type CheckBoxGroupProps = {
  options: Option[];
  values?: string[];
  onChange?: (selected: string[]) => void;
  loading?: boolean;
  emptyStateMessage?: string;
};

type CheckBoxLoaderProps = {
  className: string;
  xs: number;
};

const CheckBoxLoader = ({ className, xs }: CheckBoxLoaderProps) => {
  return (
    <div className={classnames('d-flex', className)}>
      <Placeholder xs='1' className='me-2' />
      <Placeholder xs={xs} />
    </div>
  );
};

export function CheckBoxGroupLoader() {
  const getRandomSize = () => Math.floor(Math.random() * (10 - 3 + 1)) + 3;
  return (
    <Placeholder bg='dark' animation='glow'>
      {[
        getRandomSize(),
        getRandomSize(),
        getRandomSize(),
        getRandomSize(),
        getRandomSize(),
      ].map((xs) => (
        <CheckBoxLoader key={xs} className='mb-2' xs={xs} />
      ))}
    </Placeholder>
  );
}

export default function CheckBoxGroup({
  options,
  values = [],
  onChange = () => {},
  loading = false,
  emptyStateMessage = 'No options available!'
}: CheckBoxGroupProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>(values);

  const onCheck = (value: string) => {
    if (!value) return;
    if (selected.indexOf(value) !== -1) {
      const newIds = selected.filter((option) => option !== value);
      setSelected(newIds);
      onChange(newIds);
    } else {
      const newIds = [...selected, value];
      setSelected(newIds);
      onChange(newIds);
    }
  };

  return (
    <Form className='check-box-group'>
      {options.map(({ label, value }) => (
        <Form.Check
          className='mb-2'
          type={'checkbox'}
          label={label}
          id={value}
          onClick={() => onCheck(value)}
          key={value}
          checked={!!selected.find((option) => option === value)}
        />
      ))}
      {loading && <CheckBoxGroupLoader />}
      {!loading && !options.length && (
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <NoContent size={60} />
          <span className="small">{emptyStateMessage}</span>
        </div>
      )}
    </Form>
  );
}
