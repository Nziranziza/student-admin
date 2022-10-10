import { ReactNode } from 'react';
import { Table as DefaultTable, Nav, Button, Spinner } from 'react-bootstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NoContent } from './icons';

export interface Item  {
  id: number;
  [key: string]: any;
};

export type Column<I = Item> = {
  title: string;
  key?: string;
  render?: (item: I) => ReactNode;
};

export type TableProps<I = Item> = {
  columns: Column<I>[];
  data: I[];
  dataLength: number;
  pageSize: number;
  className?: string;
  tableTitle?: ReactNode;
  loading?: boolean;
  onPageChange?: (pageNumber?: number) => void;
  onAddItem?: () => void;
  onDeleteItem?: (item: I) => void;
  onEditItem?: (item: I) => void;
  emptyStateMessage?: string;
};

type PageSwitcherProps = {
  size: number;
  onPageChange?: (pageNumber?: number) => void;
};
// TODO: Refactor when page size grows over width of screen
function PageSwitcher({ size, onPageChange = () => {} }: PageSwitcherProps) {
  return (
    <Nav className="flex-1 flex-nowrap ms-2" variant='pills' defaultActiveKey='#1'>
      {Array.from(Array(size).keys()).map((page) => (
        <Nav.Item key={page + 1}>
          <Nav.Link
            onClick={() => onPageChange(page + 1)}
            href={`#${page + 1}`}
          >
            {page + 1}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default function Table({
  columns,
  data,
  className,
  tableTitle,
  dataLength,
  pageSize,
  loading,
  onPageChange = () => {},
  onAddItem = () => {},
  onDeleteItem = () => {},
  onEditItem = () => {},
  emptyStateMessage = 'No contents!',
}: TableProps<any>): JSX.Element {
  const numberOfPages = Math.ceil(dataLength / pageSize) || 1;
  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <div className='d-none d-md-block'>{tableTitle}</div>
          <Button variant='secondary ms-md-3' onClick={onAddItem}>
            <FontAwesomeIcon icon={faAdd} />
            <span className='ms-2'>New</span>
          </Button>
        </div>
        {numberOfPages > 1 && (
          <PageSwitcher onPageChange={onPageChange} size={numberOfPages} />
        )}
      </div>
      <div className='position-relative'>
        <DefaultTable responsive='md' className={classnames(className)}>
          <thead>
            <tr>
              {columns.map(({ title }, index) => (
                <th
                  key={index}
                  className={classnames('text-muted', {
                    'text-end': index === columns.length - 1,
                  })}
                >
                  {title}
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map(({ key, render }, index) => (
                  <td
                    key={index}
                    className={classnames({
                      'text-end': index === columns.length - 1,
                    })}
                  >
                    {render ? render(item) : `${key ? item[key] : ''}`}
                  </td>
                ))}
                <td className="text-nowrap">
                  <div>
                    <Button
                      onClick={() => onEditItem(item)}
                      className='me-2 p-0 shadow-none'
                      variant=''
                    >
                      <FontAwesomeIcon color='#6A8FFF' icon={faEdit} />
                    </Button>
                    <Button
                      onClick={() => onDeleteItem(item)}
                      className='p-0 shadow-none'
                      variant=''
                    >
                      <FontAwesomeIcon color='#E05E6A' icon={faTrash} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
        {loading && (
          <div className='position-absolute top-0 bg-light w-100 h-100 opacity-50 d-flex justify-content-center align-items-center'>
            <Spinner animation='grow' />
          </div>
        )}
        {!loading && !data.length && (
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <NoContent />
            <span>{emptyStateMessage}</span>
          </div>
        )}
      </div>
    </>
  );
}
