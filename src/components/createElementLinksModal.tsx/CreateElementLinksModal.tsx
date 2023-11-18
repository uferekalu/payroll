import React, { useState } from 'react';
import classes from './CreateElementLinksModal.module.scss';
import GeneralModal from '../modal/GeneralModal';
import { Modal } from 'react-bootstrap';
import createLink1 from '../../images/createLink1.png';
import createLink2 from '../../images/createLink2.png';
import createLink3 from '../../images/createLink3.png';
import Input from '../input/Input';
import Select from '../select/Select';
import Button from '../button/Button';
import CreateElementModalSecondStep from './CreateElementModalSecondStep';

interface ICreateElementLinks {
  createElementLink: boolean;
  setCreateElementLink: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateElementLinksModal: React.FC<ICreateElementLinks> = ({
  createElementLink,
  setCreateElementLink,
  setOpenSuccessModal
}) => {
  const [secondStep, setSecondStep] = useState<boolean>(false);
  const [thirdStep, setThirdStep] = useState<boolean>(false);

  const handleThirdStep = () => {
    setThirdStep(true);
  };

  const handleSecondStep = () => {
    setSecondStep(true);
  };

  const handleCancel = () => {
    setCreateElementLink(false)
  }
  return (
    <GeneralModal
      size="lg"
      show={createElementLink}
      onHide={() => {
        setCreateElementLink(false);
      }}
      className={classes.createElementLink}
    >
      <Modal.Body className={classes.createElementLink__body}>
        <h3 className={classes.createElementLink__heading}>
          Create Element Link
        </h3>
        <div className={classes.createElementLink__step__holder}>
          {thirdStep ? (
            <img
              src={createLink3}
              className={classes.createElementLink__step__holder__imgone}
              alt="step three"
            />
          ) : secondStep ? (
            <img
              src={createLink2}
              className={classes.createElementLink__step__holder__imgone}
              alt="step two"
            />
          ) : (
            <img
              src={createLink1}
              className={classes.createElementLink__step__holder__imgone}
              alt="step one"
            />
          )}
        </div>
        {secondStep ? (
          <CreateElementModalSecondStep
            thirdStep={thirdStep}
            handleThirdStep={handleThirdStep}
            setSecondStep={setSecondStep}
            setThirdStep={setThirdStep}
            setOpenSuccessModal={setOpenSuccessModal}
            setCreateElementLink={setCreateElementLink}
          />
        ) : (
          <>
            <div className={classes.createElementLink__name}>
              <span className={classes.createElementLink__name__text}>
                Element Link Name
              </span>
              <Input
                type="text"
                classname={classes.createElementLink__name__input}
                placeholder="Input Name"
              />
            </div>
            <div className={classes.createElementLink__subdept}>
              <div className={classes.createElementLink__subdept__sub}>
                <span className={classes.createElementLink__subdept__sub__text}>
                  Suborganization
                </span>
                <Select
                  classname={classes.createElementLink__subdept__sub__select}
                  text="Select a Suborganization"
                  defaultText="Select a Suborganization"
                />
              </div>
              <div className={classes.createElementLink__subdept__dept}>
                <span className={classes.createElementLink__subdept__sub__text}>
                  Suborganization
                </span>
                <Select
                  classname={classes.createElementLink__subdept__sub__select}
                  text="Select a Suborganization"
                  defaultText="Select a Suborganization"
                />
              </div>
            </div>
            <div className={classes.createElementLink__jobloc}>
              <div className={classes.createElementLink__jobloc__job}>
                <span className={classes.createElementLink__jobloc__job__text}>
                  Job Title
                </span>
                <Select
                  classname={classes.createElementLink__jobloc__job__select}
                  text="Select a Job Title"
                  defaultText="Select a Job Title"
                />
              </div>
              <div className={classes.createElementLink__jobloc__loc}>
                <span className={classes.createElementLink__jobloc__loc__text}>
                  Location
                </span>
                <Select
                  classname={classes.createElementLink__jobloc__loc__select}
                  text="Select a Location"
                  defaultText="Select a Location"
                />
              </div>
            </div>
            <div className={classes.createElementLink__employeetypecat}>
              <div className={classes.createElementLink__employeetypecat__type}>
                <span
                  className={
                    classes.createElementLink__employeetypecat__type__text
                  }
                >
                  Employee Type
                </span>
                <Select
                  classname={
                    classes.createElementLink__employeetypecat__type__select
                  }
                  text="Select an employee Type"
                  defaultText="Select an employee Type"
                />
              </div>
              <div className={classes.createElementLink__employeetypecat__cat}>
                <span
                  className={
                    classes.createElementLink__employeetypecat__cat__text
                  }
                >
                  Employee Category
                </span>
                <Select
                  classname={
                    classes.createElementLink__employeetypecat__cat__select
                  }
                  text="Select a Employee Category"
                  defaultText="Select a Employee Category"
                />
              </div>
            </div>
            <div className={classes.createElementLink__btnaction}>
              <Button
                type="reset"
                btnClassName={classes.createElementLink__btnaction__cancel}
                onClick={() => handleCancel()}
                btnText="Cancel"
              />
              <Button
                type="submit"
                btnClassName={classes.createElementLink__btnaction__next}
                onClick={() => handleSecondStep()}
                btnText="Next"
                // disabled
              />
            </div>
          </>
        )}
      </Modal.Body>
    </GeneralModal>
  );
};

export default CreateElementLinksModal;
