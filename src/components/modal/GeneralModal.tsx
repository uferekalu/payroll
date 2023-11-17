import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import classes from './GeneralModal.module.scss';

interface IModal {
  size: 'sm' | 'lg' | 'xl' | undefined;
  children: ReactNode;
  onHide: () => void
  show: boolean
  className: string
}

const GeneralModal: React.FC<IModal> = ({ size, children, onHide, show, className }) => {
  return (
    <Modal
      size={size}
      arial-labellby="contained-modal-title-vcenter"
      dialogClassName={classes.modal}
      onHide={onHide}
      show={show}
      className={className}
    >
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default GeneralModal;
