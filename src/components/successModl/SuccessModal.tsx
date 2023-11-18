import React, { useContext, useState } from 'react';
import GeneralModal from '../modal/GeneralModal';
import classes from './SuccessModal.module.scss';
import Button from '../button/Button';
import { Modal } from 'react-bootstrap';
import { CreateElementStateContext } from '../CreateElementState';

interface ISuccessModal {
  imgSrc: string;
  alt: string;
  successMsg: string;
  btnText: string;
  onClick: () => void;
}

const SuccessModal: React.FC<ISuccessModal> = ({
  imgSrc,
  alt,
  successMsg,
  btnText,
  onClick,
}) => {
  const createElementState = useContext(CreateElementStateContext);
  return (
    <GeneralModal
      size="sm"
      show={
        createElementState !== undefined && createElementState?.successModal
      }
      onHide={() => {
        createElementState?.setSuccessModal(false);
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
            onClick={() => createElementState?.setSuccessModal(false)}
          />
        </div>
      </Modal.Body>
    </GeneralModal>
  );
};

export default SuccessModal;
