import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { Table, Modal, ConfirmDelete } from '../../components';
import { Column } from '../../components/table';
import { useStudyGroups } from '../../hooks';
import { StudyGroupForm } from './components';
import { StudyGroupInputs } from '../../services/studyGroup';
import { GetStudyGroupResponse } from '../../services/studyGroup';

const columns: Column[] = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Subject',
    key: 'subject',
  },
  {
    title: 'Time',
    key: 'time',
  },
  {
    title: 'Leader',
    key: 'leader',
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
  [remove]: 'Delete a study group confirmation!',
  [update]: 'Update a study group',
  [add]: 'Add a new study group',
};

export default function StudyGroups(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const { loading, data, onCreate, onDelete, onUpdate, onPageChange } = useStudyGroups();
  const [modalTitle, setModalTitle] = useState<string>(modalTitles[add]);
  const [modalContentType, setModalContentType] =
    useState<ModalContentType>(add);
  const [actionItem, setActionItem] = useState<GetStudyGroupResponse>();
  const [modalSize, setModalSize] = useState<'lg' | undefined>();

  const hideModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleStudyGroupCreate = (form: StudyGroupInputs) => {
    onCreate(form);
    hideModal();
  };

  const handleStudyGroupUpdate = (form: Partial<StudyGroupInputs>) => {
    if (!actionItem) return;
    onUpdate(actionItem.id, form);
    hideModal();
  };

  const handleDelete = () => {
    if (!actionItem) return;
    onDelete(actionItem?.id);
    hideModal();
  };

  const renderModalContent = (): JSX.Element | undefined => {
    switch (modalContentType) {
      case update:
        if (!actionItem) return;
        const { name, time, subject, leader, enrolled } = actionItem;
        return (
          <StudyGroupForm
            value={{
              name,
              time,
              subject,
              leader,
            }}
            students={enrolled.map(({  student }) => student)}
            onSubmit={handleStudyGroupUpdate}
            type="update"
            groupId={actionItem.id}
          />
        );
      case remove:
        return <ConfirmDelete onOk={handleDelete} onCancel={hideModal} />;
      default:
        return <StudyGroupForm onSubmit={handleStudyGroupCreate} />;
    }
  };

  const onAction = (type: ModalContentType, item?: GetStudyGroupResponse) => {
    setModalContentType(type);
    setModalTitle(modalTitles[type]);
    openModal();
    if (item) {
      setActionItem(item);
    }
    if(type === update) {
      setModalSize('lg')
    } else {
      setModalSize(undefined)
    }
  };

  return (
    <div>
      <Table
        tableTitle={
          <>
            <FontAwesomeIcon icon={faUserGroup} />
            <span className='fw-bolder ms-2'>{data.count} Study Groups</span>
          </>
        }
        columns={columns}
        data={data.data}
        dataLength={data.count}
        pageSize={data.pageSize}
        loading={loading}
        className='mt-3 mt-md-5'
        emptyStateMessage='No groups so far!'
        onAddItem={() => onAction(add)}
        onEditItem={(item: GetStudyGroupResponse) => onAction(update, item)}
        onDeleteItem={(item: GetStudyGroupResponse) => onAction(remove, item)}
        onPageChange={onPageChange}
      />
      <Modal size={modalSize} onHide={hideModal} show={showModal} title={modalTitle}>
        {renderModalContent()}
      </Modal>
    </div>
  );
}
