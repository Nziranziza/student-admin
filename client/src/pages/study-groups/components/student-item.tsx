import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import { Avatar } from '../../../components';

type StudentItemProp = {
  name: string;
  icon?: IconDefinition;
  onClick?: () => void
};

export default function StudentItem({ name, icon = faTrash, onClick }: StudentItemProp): JSX.Element {
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