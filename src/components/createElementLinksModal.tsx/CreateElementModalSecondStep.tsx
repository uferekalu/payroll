import React, { useState } from 'react';
import classes from './CreateElementLinksModal.module.scss';
import Select from '../select/Select';
import Button from '../button/Button';
import CreateElementModalThirdStep from './CreateElementModalThirdStep';

interface ICreateElementLinkSecond {
  thirdStep: boolean;
  handleThirdStep: () => void;
  setSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
  setThirdStep: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateElementLink: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateElementModalSecondStep: React.FC<ICreateElementLinkSecond> = ({
  thirdStep,
  handleThirdStep,
  setSecondStep,
  setThirdStep,
  setOpenSuccessModal,
  setCreateElementLink
}) => {
  const [additionInfo] = useState<boolean>(true);

  const backToFirstStep = () => {
    setSecondStep(false);
  };

  return (
    <>
      {thirdStep ? (
        <CreateElementModalThirdStep
          setThirdStep={setThirdStep}
          setOpenSuccessModal={setOpenSuccessModal}
          setCreateElementLink={setCreateElementLink}
        />
      ) : (
        <div className={classes.createElementLink__secondstep}>
          <div className={classes.createElementLink__secondstep__gradestep}>
            <div
              className={
                classes.createElementLink__secondstep__gradestep__grade
              }
            >
              <span
                className={
                  classes.createElementLink__secondstep__gradestep__grade__text
                }
              >
                Grade
              </span>
              <Select
                classname={
                  classes.createElementLink__secondstep__gradestep__grade__select
                }
                text="Select a Grade"
                defaultText="Select a Grade"
              />
            </div>
            <div
              className={
                classes.createElementLink__secondstep__gradestep__gradestep
              }
            >
              <span
                className={
                  classes.createElementLink__secondstep__gradestep__gradestep__text
                }
              >
                Grade Step
              </span>
              <Select
                classname={
                  classes.createElementLink__secondstep__gradestep__gradestep__select
                }
                text="Select a Grade Step"
                defaultText="Select a Grade Step"
              />
            </div>
          </div>
          <div className={classes.createElementLink__secondstep__union}>
            <span
              className={classes.createElementLink__secondstep__union__text}
            >
              Union
            </span>
            <Select
              classname={classes.createElementLink__secondstep__union__select}
              text="Select a Union"
              defaultText="Select a Union"
            />
          </div>
          <div
            className={classes.createElementLink__secondstep__additionalinfo}
          >
            <span
              className={
                classes.createElementLink__secondstep__additionalinfo__text
              }
            >
              Additional Assignment Information
            </span>
            {additionInfo ? (
              <>
                <div
                  className={
                    classes.createElementLink__secondstep__additionalinfo__pensionhouse
                  }
                >
                  <div
                    className={
                      classes.createElementLink__secondstep__additionalinfo__pensionhouse__pension
                    }
                  >
                    <span
                      className={
                        classes.createElementLink__secondstep__additionalinfo__pensionhouse__pension__text
                      }
                    >
                      Pension
                    </span>
                    <Select
                      classname={
                        classes.createElementLink__secondstep__additionalinfo__pensionhouse__pension__select
                      }
                      text="Select Pension"
                      defaultText="Select Pension"
                    />
                  </div>
                  <div
                    className={
                      classes.createElementLink__secondstep__additionalinfo__pensionhouse__housing
                    }
                  >
                    <span
                      className={
                        classes.createElementLink__secondstep__additionalinfo__pensionhouse__housing__text
                      }
                    >
                      Housing
                    </span>
                    <Select
                      classname={
                        classes.createElementLink__secondstep__additionalinfo__pensionhouse__housing__select
                      }
                      text="Select Housing"
                      defaultText="Select Housing"
                    />
                  </div>
                </div>
                <div
                  className={
                    classes.createElementLink__secondstep__additionalinfo__loyaltybonus
                  }
                >
                  <span
                    className={
                      classes.createElementLink__secondstep__additionalinfo__loyaltybonus__text
                    }
                  >
                    Loyalty Bonus
                  </span>
                  <Select
                    classname={
                      classes.createElementLink__secondstep__additionalinfo__loyaltybonus__select
                    }
                    text="Select Loyalty Bonus"
                    defaultText="Select Loyalty Bonus"
                  />
                </div>
              </>
            ) : (
              <span
                className={
                  classes.createElementLink__secondstep__additionalinfo__text2
                }
              >
                N/A
              </span>
            )}
          </div>
          <div className={classes.createElementLink__btnaction}>
            <Button
              type="reset"
              btnClassName={classes.createElementLink__btnaction__cancel}
              onClick={() => backToFirstStep()}
              btnText="Back"
            />
            <Button
              type="submit"
              btnClassName={classes.createElementLink__btnaction__next}
              onClick={() => handleThirdStep()}
              btnText="Next"
              // disabled
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateElementModalSecondStep;
