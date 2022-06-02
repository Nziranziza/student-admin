import { ReactNode } from 'react';
import { Table as DefaultTable, Nav, Button, Spinner } from 'react-bootstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export type Column = {
  title: string;
  key?: string;
  render?: (item: any) => any;
};

type TableProps = {
  columns: Column[];
  data: any[];
  dataLength: number;
  pageSize: number;
  className?: string;
  tableTitle?: ReactNode;
  loading?: boolean;
};

type PageSwitcherProps = {
  size: number;
};

function PageSwitcher({ size }: PageSwitcherProps) {
  return (
    <Nav variant="pills" defaultActiveKey="#1">
      {Array.from(Array(size).keys()).map((page) => (
        <Nav.Item>
          <Nav.Link href={`#${page + 1}`}>{page + 1}</Nav.Link>
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
}: TableProps) {
  const numberOfPages = Math.ceil(dataLength / pageSize) || 1;
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="d-none d-md-block">{tableTitle}</div>
          <Button variant="secondary ms-md-3">
            <FontAwesomeIcon icon={faEdit} />
            <span className="ms-2">New</span>
          </Button>
        </div>
        {numberOfPages > 1 && <PageSwitcher size={numberOfPages} />}
      </div>
      <DefaultTable
        responsive="md"
        className={classnames(className, 'position-relative')}
      >
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
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
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
            </tr>
          ))}
        </tbody>
        {loading && (
          <div className="position-absolute top-0 bg-light w-100 h-100 opacity-50 d-flex justify-content-center align-items-center">
            <Spinner animation="grow" />
          </div>
        )}
      </DefaultTable>
    </>
  );
}
