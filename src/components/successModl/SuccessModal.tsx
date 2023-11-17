import React from 'react';
import GeneralModal from '../modal/GeneralModal';
import classes from './SuccessModal.module.scss';
import Button from '../button/Button';
import { Modal } from 'react-bootstrap';

interface ISuccessModal {
  successModal: boolean;
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  imgSrc: string;
  alt: string;
  successMsg: string;
  btnText: string;
  onClick: () => void;
}

const SuccessModal: React.FC<ISuccessModal> = ({
  successModal,
  setSuccessModal,
  imgSrc,
  alt,
  successMsg,
  btnText,
  onClick,
}) => {
  return (
    <GeneralModal
      size="sm"
      show={successModal}
      onHide={() => {
        setSuccessModal(false);
      }}
      className={classes.successmodal}
    >
      <Modal.Body className={classes.successmodal__body}>
        <img
          src={imgSrc}
          alt={alt}
          className={classes.successmodal__body__imgicon}
        />
        <span className={classes.successmodal__body__successmsg}>
          {successMsg}
        </span>
        <div className={classes.successmodal__body__btnholder}>
          <Button
            type="submit"
            btnClassName={classes.successmodal__body__btnholder__btn}
            btnText={btnText}
            onClick={onClick}
          />
        </div>
      </Modal.Body>
    </GeneralModal>
  );
};

export default SuccessModal;
