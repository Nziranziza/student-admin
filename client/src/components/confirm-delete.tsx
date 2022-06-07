import { Button } from 'react-bootstrap';

type ConfirmDeleteProps = {
  onOk: () => void;
  onCancel: () => void
};

export default function ConfirmDelete({
  onOk,
  onCancel
}: ConfirmDeleteProps): JSX.Element {
  return <div className="d-flex justify-content-end">
    <Button variant="light" className="me-3" onClick={onCancel}>Cancel</Button>
    <Button variant="danger" onClick={onOk}>Delete</Button>
  </div>
}