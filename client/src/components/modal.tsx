import { Modal as DefaultModal, Button } from 'react-bootstrap';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
  children: ReactNode;
  show?: boolean;
  onHide: () => void;
  title: string;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  hasFooter?: boolean;
};

export default function Modal({
  show,
  children,
  onHide,
  title,
  onOk = onHide,
  okText = 'Ok',
  cancelText = 'Cancel',
  hasFooter = false,
}: ModalProps) {
  return (
    <DefaultModal centered show={show} onHide={onHide}>
      <DefaultModal.Header>
        <DefaultModal.Title>{title}</DefaultModal.Title>
        <Button variant="" onClick={onHide} className="rounded-circle"><FontAwesomeIcon icon={faClose} /></Button>
      </DefaultModal.Header>
      <DefaultModal.Body>{children}</DefaultModal.Body>
      {hasFooter && (
        <DefaultModal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={onOk}>
            {okText}
          </Button>
        </DefaultModal.Footer>
      )}
    </DefaultModal>
  );
}
