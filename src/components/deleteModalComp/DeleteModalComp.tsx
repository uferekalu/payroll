import React from 'react';
import GeneralModal from '../modal/GeneralModal';
import classes from './DeleteModalComp.module.scss';
import { Modal } from 'react-bootstrap';
import Button from '../button/Button';

interface IDelete {
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  imgSrc: string;
  alt: string;
  deleteMsg1: string;
  deleteMsg2: string;
  btnText1: string;
  btnText2: string;
  onClick1: () => void;
  onClick2: () => void;
}

const DeleteModalComp: React.FC<IDelete> = ({
  deleteModal,
  setDeleteModal,
  imgSrc,
  alt,
  deleteMsg1,
  deleteMsg2,
  btnText1,
  btnText2,
  onClick1,
  onClick2,
}) => {
  return (
    <GeneralModal
      size="sm"
      show={deleteModal}
      onHide={() => {
        setDeleteModal(false);
      }}
      className={classes.deletemodal}
    >
      <Modal.Body className={classes.deletemodal__body}>
        <img
          src={imgSrc}
          alt={alt}
          className={classes.deletemodal__body__imgicon}
        />
        <span className={classes.deletemodal__body__successmsg}>
          {deleteMsg1}
        </span>
        <span className={classes.deletemodal__body__successmsg2}>
          {deleteMsg2}
        </span>
        <div className={classes.deletemodal__body__btnholder}>
          <Button
            type="reset"
            btnClassName={classes.deletemodal__body__btnholder__btn1}
            btnText={btnText1}
            onClick={onClick1}
          />
          <Button
            type="submit"
            btnClassName={classes.deletemodal__body__btnholder__btn2}
            btnText={btnText2}
            onClick={onClick2}
          />
        </div>
      </Modal.Body>
    </GeneralModal>
  );
};

export default DeleteModalComp;
