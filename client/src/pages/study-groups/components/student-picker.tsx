import { Dropdown, FormControl, Spinner } from 'react-bootstrap';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

import { StudentItem } from './';
import { GetStudentResponse } from '../../../services/student';
import { NoContent } from '../../../components/icons';

type StudentPickerProps = {
  options: GetStudentResponse[];
  onSelect: (option: GetStudentResponse) => void;
  onSearch?: (keyword: string) => void;
  loading?: boolean
};

export default function StudentPicker({
  options = [],
  onSelect,
  onSearch = () => {},
  loading = false
}: StudentPickerProps): JSX.Element {
  return (
    <Dropdown className='mb-3 w-100'>
      <Dropdown.Toggle
        onChange={(e: React.ChangeEvent<any>) => onSearch(e.target.value)}
        as={FormControl}
        placeholder='Add a member'
      />
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item key={option.id} onClick={() => onSelect(option)}>
            <StudentItem name={option.name} icon={faAdd} />
          </Dropdown.Item>
        ))}
        {!loading && !options.length && (
          <div className='d-flex flex-column align-items-center w-100 px-5'>
            <NoContent size={60} />
            <span className='small'>No students</span>
          </div>
        )}
        {loading && <div className="d-flex flex-column align-items-center px-5">
          <Spinner size="sm" variant="dark" animation="border" />
        </div>
        }
      </Dropdown.Menu>
    </Dropdown>
  );
}
