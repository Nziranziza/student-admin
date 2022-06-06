import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback } from 'react';

import {
  SearchInput,
  Avatar,
  Table,
  Modal,
  CheckBoxGroup,
} from '../../components';
import { useStudents, useStudyGroups } from '../../hooks';
import { Column, Item as ActionItem } from '../../components/table';
import { studentDataToRows } from '../../utilities';
import { StudentInputs } from '../../services/student';
import { StudyGroupList, StudentForm, ConfirmDelete } from './components';

const columns: Column[] = [
  {
    title: '',
    render: () => <Form.Check type='checkbox' />,
  },
  {
    title: '',
    render: (item: ActionItem) => <Avatar firstName={item.name} />,
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
    render: (item) => `${item.placeOfBirth}, ${item.dateOfBirth}`
  },
  {
    title: 'Groups',
    key: 'groups',
    render: (item: ActionItem) => <StudyGroupList data={item.groups} />,
  },
];

const add = 'add';
const remove = 'delete';
const update = 'update';

type ModalTitles = {
  [remove]: string;
  [update]: string;
  [add]: string;
};

type ModalContentType = keyof ModalTitles;

const modalTitles: ModalTitles = {
  [remove]: 'Delete a student confirmation!',
  [update]: 'Update a student',
  [add]: 'Add a new student',
};

export default function Students() {
  const {
    loading,
    data,
    onSearch,
    onPageChange,
    onCreate,
    onDelete,
    onUpdate,
  } = useStudents();
  const [showModal, setShowModal] = useState(false);
  const { data: groups, loading: groupsLoading } = useStudyGroups();
  const [modalContentType, setModalContentType] =
    useState<ModalContentType>(add);
  const [modalTitle, setModalTitle] = useState<string>(modalTitles[add]);
  const [actionItem, setActionItem] = useState<ActionItem>();

  const hideModal = () => {
    setShowModal(false);
    setActionItem(undefined);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const handleStudentCreate = (form: StudentInputs) => {
    onCreate(form);
    hideModal();
  };

  const handleStudentUpdate = (form: Partial<StudentInputs>) => {
    if (!actionItem) return;
    onUpdate(actionItem.id, form);
    hideModal();
  };

  const handleDelete = () => {
    if (!actionItem) return;
    onDelete(actionItem?.id);
    hideModal();
  };

  const onGroupFilterChange = useCallback(
    (groupIds: string[]) => {
      onSearch({
        groups: groupIds,
      });
    },
    [onSearch]
  );

  const renderModalContent = () => {
    if (!actionItem) return;
    switch (modalContentType) {
      case update: {
        const { name, sex, placeOfBirth, dateOfBirth, email } = actionItem;
        return (
          <StudentForm
            onSubmit={handleStudentUpdate}
            value={{
              name,
              sex,
              placeOfBirth,
              dateOfBirth,
              email
            }}
          />
        );
      }
      case remove:
        return <ConfirmDelete onOk={handleDelete} onCancel={hideModal} />;
      default:
        return <StudentForm onSubmit={handleStudentCreate} />;
    }
  };

  const onAction = (type: ModalContentType, item?: ActionItem) => {
    setModalContentType(type);
    setModalTitle(modalTitles[type]);
    openModal();
    setActionItem(item);
  };

  return (
    <div>
      <Row>
        <Col md='3' className='pe-md-5'>
          <div>
            <label className='mb-2 text-muted'>SEARCH FOR NAME</label>
            <SearchInput
              onSearch={(keyWord: string) =>
                onSearch({
                  search: keyWord,
                })
              }
            />
          </div>
          <div className='mt-3 mt-md-5 mb-3'>
            <label className='text-muted mb-2'>FILTERS FOR STUDY GROUPS</label>
            <CheckBoxGroup
              options={groups.map(({ name, id }) => ({
                label: name,
                value: id,
              }))}
              onChange={onGroupFilterChange}
              loading={groupsLoading}
            />
          </div>
        </Col>
        <Col md='9'>
          <Table
            tableTitle={
              <>
                <FontAwesomeIcon icon={faUserAlt} />
                <span className='fw-bolder ms-3'>{data.count} students</span>
              </>
            }
            pageSize={data?.pageSize}
            className='mt-3 mt-md-5'
            data={studentDataToRows(data?.data)}
            columns={columns}
            dataLength={data?.count}
            loading={loading}
            onPageChange={onPageChange}
            onAddItem={() => onAction(add)}
            onEditItem={(item: ActionItem) => onAction(update, item)}
            onDeleteItem={(item: ActionItem) => onAction(remove, item)}
            emptyStateMessage='No students available!'
          />
        </Col>
      </Row>
      <Modal title={modalTitle} show={showModal} onHide={hideModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
}
