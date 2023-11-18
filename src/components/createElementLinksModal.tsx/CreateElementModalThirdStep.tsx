import React, { useContext, useState } from 'react';
import classes from './CreateElementLinksModal.module.scss';
import Select from '../select/Select';
import DatePicker from 'react-datepicker';
import calenderIcon from '../../images/calenderIcon.png';
import toggleBtn from '../../images/toggle-button.png';
import Input from '../input/Input';
import Button from '../button/Button';
import { CreateElementStateContext } from '../CreateElementState';

interface ICreateElementLinkThird {
  setThirdStep: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateElementLink: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateElementModalThirdStep: React.FC<ICreateElementLinkThird> = ({
  setThirdStep,
  setOpenSuccessModal,
  setCreateElementLink,
}) => {
  const [selectedEffectiveStartDate, setSelectedEffectiveStartDate] =
    useState<Date | null>(null);
  const [isEffectiveStartDatePickerOpen, setEffectiveStartDatePickerOpen] =
    useState<boolean>(false);
  const [selectedEffectiveEndDate, setSelectedEffectiveEndDate] =
    useState<Date | null>(null);
  const [isEffectiveEndDatePickerOpen, setEffectiveEndDatePickerOpen] =
    useState<boolean>(false);

  const [automate, setAutomate] = useState<string>('');
  const createElementState = useContext(CreateElementStateContext);

  const backToSecondStep = () => {
    setThirdStep(false);
  };

  const handleAutomate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutomate(e.target.value);
  };

  const handleEffectiveStartDateIconClick = () => {
    setEffectiveStartDatePickerOpen(!isEffectiveStartDatePickerOpen);
  };

  const handleEffectiveEndDateIconClick = () => {
    setEffectiveEndDatePickerOpen(!isEffectiveEndDatePickerOpen);
  };

  const handleSubmit = () => {
    createElementState?.setSuccessModal(true);
    setCreateElementLink(false);
  };
  return (
    <div className={classes.createElementLink__thirdstep}>
      <div className={classes.createElementLink__thirdstep__amounttype}>
        <div className={classes.createElementLink__thirdstep__amounttype__type}>
          <span
            className={
              classes.createElementLink__thirdstep__amounttype__type__text
            }
          >
            Amount Type
          </span>
          <Select
            classname={
              classes.createElementLink__thirdstep__amounttype__type__select
            }
            text="Select an Amount Type"
            defaultText="Select an Amount Type"
          />
        </div>
        <div
          className={classes.createElementLink__thirdstep__amounttype__amount}
        >
          <span
            className={
              classes.createElementLink__thirdstep__amounttype__amount__text
            }
          >
            Amount
          </span>
          <Select
            classname={
              classes.createElementLink__thirdstep__amounttype__amount__select
            }
            text="Select Amount"
            defaultText="Select Amount"
          />
        </div>
      </div>
      <div className={classes.createElementLink__thirdstep__startend__date}>
        <div
          className={
            classes.createElementLink__thirdstep__startend__date__start
          }
        >
          <span
            className={
              classes.createElementLink__thirdstep__startend__date__start__text
            }
          >
            Effective Start Date
          </span>
          <DatePicker
            selected={selectedEffectiveStartDate}
            onChange={(date) => {
              setSelectedEffectiveStartDate(date);
              setEffectiveStartDatePickerOpen(false);
            }}
            open={isEffectiveStartDatePickerOpen}
            onClickOutside={() => setEffectiveStartDatePickerOpen(false)}
            onInputClick={() =>
              setEffectiveStartDatePickerOpen(!isEffectiveStartDatePickerOpen)
            }
            placeholderText="Select Date"
            className={
              classes.createElementLink__thirdstep__startend__date__start__selectdate
            }
          />
          <img
            src={calenderIcon}
            alt="calender icon"
            className={
              classes.createElementLink__thirdstep__startend__date__start__calendericon
            }
            onClick={handleEffectiveStartDateIconClick}
          />
        </div>
        <div
          className={classes.createElementLink__thirdstep__startend__date__end}
        >
          <span
            className={
              classes.createElementLink__thirdstep__startend__date__end__text
            }
          >
            Effective End Date
          </span>
          <DatePicker
            selected={selectedEffectiveEndDate}
            onChange={(date) => {
              setSelectedEffectiveEndDate(date);
              setEffectiveEndDatePickerOpen(false);
            }}
            open={isEffectiveEndDatePickerOpen}
            onClickOutside={() => setEffectiveEndDatePickerOpen(false)}
            onInputClick={() =>
              setEffectiveEndDatePickerOpen(!isEffectiveEndDatePickerOpen)
            }
            placeholderText="Select Date"
            className={
              classes.createElementLink__thirdstep__startend__date__end__selectdate
            }
          />
          <img
            src={calenderIcon}
            alt="calender icon"
            className={
              classes.createElementLink__thirdstep__startend__date__end__calendericon
            }
            onClick={handleEffectiveEndDateIconClick}
          />
        </div>
      </div>
      <div className={classes.createElementLink__thirdstep__lastsection}>
        <div
          className={classes.createElementLink__thirdstep__lastsection__part1}
        >
          <span
            className={
              classes.createElementLink__thirdstep__lastsection__part1__text
            }
          >
            Automate
          </span>
          <div
            className={
              classes.createElementLink__thirdstep__lastsection__automate__openclose
            }
          >
            <div
              className={
                classes.createElementLink__thirdstep__lastsection__automate__openclose__openholder
              }
            >
              <Input
                type="radio"
                value="Yes"
                checked={automate === 'Yes'}
                onChange={handleAutomate}
                classname={
                  classes.createElementLink__thirdstep__lastsection__automate__openclose__openholder__radio
                }
              />
              <span
                className={
                  classes.createElementLink__thirdstep__lastsection__automate__openclose__openholder__text
                }
              >
                Yes
              </span>
            </div>
            <div
              className={
                classes.createElementLink__thirdstep__lastsection__automate__openclose__closeholder
              }
            >
              <Input
                type="radio"
                value="No"
                checked={automate === 'No'}
                onChange={handleAutomate}
                classname={
                  classes.createElementLink__thirdstep__lastsection__automate__openclose__closeholder__radio
                }
              />
              <span
                className={
                  classes.createElementLink__thirdstep__lastsection__automate__openclose__closeholder__text
                }
              >
                No
              </span>
            </div>
          </div>
        </div>
        <div
          className={classes.createElementLink__thirdstep__lastsection__part2}
        >
          <span
            className={
              classes.createElementLink__thirdstep__lastsection__part2__text
            }
          >
            Status
          </span>
          <div
            className={
              classes.createElementLink__thirdstep__lastsection__part2__status
            }
          >
            <div
              className={
                classes.createElementLink__thirdstep__lastsection__part2__status__activeicon
              }
            >
              <img
                src={toggleBtn}
                alt="toggle"
                className={
                  classes.createElementLink__thirdstep__lastsection__part2__status__activeicon__btn
                }
              />
              <span
                className={
                  classes.createElementLink__thirdstep__lastsection__part2__status__activeicon__text
                }
              >
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.createElementLink__btnaction}>
        <Button
          type="reset"
          btnClassName={classes.createElementLink__btnaction__cancel}
          onClick={() => backToSecondStep()}
          btnText="Back"
        />
        <Button
          type="submit"
          btnClassName={classes.createElementLink__btnaction__next}
          onClick={() => handleSubmit()}
          btnText="Create A New Element Link"
          // disabled
        />
      </div>
    </div>
  );
};

export default CreateElementModalThirdStep;
