import React, { useState, useEffect, useContext } from 'react';
import classes from './CreateElementModal.module.scss';
import calenderIcon from '../../images/calenderIcon.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import Input from '../input/Input';
import Select from '../select/Select';
import Button from '../button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createElement } from '../../slices/createElementSlice';
import { RootState } from '../../store';
import { CreateElementStateContext } from '../CreateElementState';

const months = [
  'Jan',
  'Feb',
  'March',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

interface INextStep {
  setCreateElementSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateElementNextStep: React.FC<INextStep> = ({ setCreateElementSuccess }) => {
  const createElementState = useContext(CreateElementStateContext);
  const [isStartDatePickerOpen, setStartDatePickerOpen] =
    useState<boolean>(false);
  const [isEndDatePickerOpen, setEndDatePickerOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const createdElement = useAppSelector(
    (state: RootState) => state.createElement,
  );

  useEffect(() => {
    if (createdElement.createElementStatus === 'success') {
      setCreateElementSuccess(true);
    }
  }, [
    createdElement.createElementStatus,
    createElementState,
    setCreateElementSuccess
  ]);

  const handleProrate = (e: React.ChangeEvent<HTMLInputElement>) => {
    createElementState?.setProrate(e.target.value);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'status') {
      createElementState?.setStepTwoFormData({
        ...createElementState?.stepTwoFormData,
        [name]: !createElementState?.stepTwoFormData.status,
      });
    } else {
      createElementState?.setStepTwoFormData({
        ...createElementState?.stepTwoFormData,
        [name]: value,
      });
    }
  };

  const removeMonth = (data: string) => {
    const allData = [
      ...(createElementState !== undefined
        ? createElementState?.selectedMonths
        : []),
    ];
    const monthIndex = allData.findIndex((month) => month === data);
    allData.splice(monthIndex, 1);
    createElementState?.setSelectedMonths(allData);
  };

  const removeAllSelectedMonths = () => {
    createElementState?.setSelectedMonths([]);
    createElementState?.setMonthlySelectedMonths('');
  };

  const handleMonthlySelectedMonthsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    createElementState?.setSelectedMonths((prevState) => [
      ...prevState,
      e.target.value,
    ]);
  };

  const handleProcessingType = (e: React.ChangeEvent<HTMLInputElement>) => {
    createElementState?.setProcessingType(e.target.value);
  };

  const handleMonthlySelectedMonths = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    createElementState?.setMonthlySelectedMonths(e.target.value);
  };

  const handleStartDateIconClick = () => {
    setStartDatePickerOpen(!isStartDatePickerOpen);
  };

  const handleEndDateIconClick = () => {
    setEndDatePickerOpen(!isEndDatePickerOpen);
  };

  const handleCreateElement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      data: {
        name:
          createElementState !== undefined
            ? createElementState?.stepOneFormData.name
            : '',
        description:
          createElementState !== undefined
            ? createElementState?.stepOneFormData.description
            : '',
        payRunId: Number(createElementState?.stepOneFormData.payrun),
        payRunValueId: Number(createElementState?.lookUpValueIds.payRunValueId),
        classificationId: Number(
          createElementState?.stepOneFormData.elementClassification,
        ),
        classificationValueId: Number(
          createElementState?.lookUpValueIds.classificationValueId,
        ),
        categoryId: Number(createElementState?.stepOneFormData.elementCategory),
        categoryValueId: Number(
          createElementState?.lookUpValueIds.categoryValueId,
        ),
        reportingName:
          createElementState !== undefined
            ? createElementState?.stepOneFormData.reportingName
            : '',
        processingType:
          createElementState !== undefined
            ? createElementState?.processingType
            : '',
        status: createElementState?.stepTwoFormData.status
          ? 'Active'
          : 'Inactive',
        prorate:
          createElementState !== undefined ? createElementState?.prorate : '',
        effectiveStartDate:
          createElementState !== undefined
            ? createElementState?.selectedStartDate &&
              createElementState?.selectedStartDate?.toISOString()
            : '',
        effectiveEndDate:
          createElementState !== undefined
            ? createElementState?.selectedEndDate &&
              createElementState?.selectedEndDate?.toISOString()
            : '',
        selectedMonths:
          createElementState !== undefined
            ? createElementState?.selectedMonths
            : [],
        payFrequency:
          createElementState !== undefined
            ? createElementState?.monthlySelectedMonths
            : '',
        modifiedBy: 'Kalu Ufere',
      },
    };
    await dispatch(createElement(data));
    createElementState?.setCreateElement(false);
  };

  return (
    <form onSubmit={handleCreateElement}>
      <div className={classes.createElement__nextstep}>
        <div className={classes.createElement__nextstep__datesection}>
          <div
            className={
              classes.createElement__nextstep__datesection__startdateprocessing
            }
          >
            <span
              className={
                classes.createElement__nextstep__datesection__startdateprocessing__date
              }
            >
              Effective Start Date
            </span>
            <DatePicker
              selected={createElementState?.selectedStartDate}
              onChange={(date) => {
                createElementState?.setSelectedStartDate(date);
                setStartDatePickerOpen(false);
              }}
              open={isStartDatePickerOpen}
              onClickOutside={() => setStartDatePickerOpen(false)}
              onInputClick={() =>
                setStartDatePickerOpen(!isStartDatePickerOpen)
              }
              placeholderText="Select Date"
              className={
                classes.createElement__nextstep__datesection__startdateprocessing__selectdate
              }
            />
            <img
              src={calenderIcon}
              alt="calender icon"
              className={
                classes.createElement__nextstep__datesection__startdateprocessing__calendericon
              }
              onClick={handleStartDateIconClick}
            />
            {createElementState?.errors.effectiveStartDate && (
              <span className={classes.createElement__nextstep__errors}>
                {createElementState?.errors.effectiveStartDate}
              </span>
            )}
            <span
              className={
                classes.createElement__nextstep__datesection__startdateprocessing__processing
              }
            >
              Processing Type
            </span>
            <div
              className={
                classes.createElement__nextstep__datesection__startdateprocessing__openclose
              }
            >
              <div
                className={
                  classes.createElement__nextstep__datesection__startdateprocessing__openclose__openholder
                }
              >
                <Input
                  type="radio"
                  value="Open"
                  checked={createElementState?.processingType === 'Open'}
                  onChange={handleProcessingType}
                  classname={
                    classes.createElement__nextstep__datesection__startdateprocessing__openclose__openholder__radio
                  }
                />
                <span
                  className={
                    classes.createElement__nextstep__datesection__startdateprocessing__openclose__openholder__text
                  }
                >
                  Open
                </span>
              </div>
              <div
                className={
                  classes.createElement__nextstep__datesection__startdateprocessing__openclose__closeholder
                }
              >
                <Input
                  type="radio"
                  value="Close"
                  checked={createElementState?.processingType === 'Close'}
                  onChange={handleProcessingType}
                  classname={
                    classes.createElement__nextstep__datesection__startdateprocessing__openclose__closeholder__radio
                  }
                />
                <span
                  className={
                    classes.createElement__nextstep__datesection__startdateprocessing__openclose__closeholder__text
                  }
                >
                  Close
                </span>
              </div>
            </div>
            {createElementState?.errors.processingType && (
              <span className={classes.createElement__nextstep__errors}>
                {createElementState?.errors.processingType}
              </span>
            )}
          </div>
          <div
            className={
              classes.createElement__nextstep__datesection__enddatepayfrequency
            }
          >
            <span
              className={
                classes.createElement__nextstep__datesection__enddatepayfrequency__date
              }
            >
              Effective End Date
            </span>
            <DatePicker
              selected={createElementState?.selectedEndDate}
              onChange={(date) => {
                createElementState?.setSelectedEndDate(date);
                setEndDatePickerOpen(false);
              }}
              open={isEndDatePickerOpen}
              onClickOutside={() => setEndDatePickerOpen(false)}
              onInputClick={() => setEndDatePickerOpen(!isEndDatePickerOpen)}
              placeholderText="Select Date"
              className={
                classes.createElement__nextstep__datesection__enddatepayfrequency__selectdate
              }
            />
            <img
              src={calenderIcon}
              alt="calender icon"
              className={
                classes.createElement__nextstep__datesection__enddatepayfrequency__calendericon
              }
              onClick={handleEndDateIconClick}
            />
            {createElementState?.errors.effectiveEndDate && (
              <span className={classes.createElement__nextstep__errors}>
                {createElementState?.errors.effectiveEndDate}
              </span>
            )}
            <span
              className={
                classes.createElement__nextstep__datesection__enddatepayfrequency__payfrequency
              }
            >
              Pay Frequency
            </span>
            <div
              className={
                classes.createElement__nextstep__datesection__enddatepayfrequency__monthlyselectedmonths
              }
            >
              <div
                className={
                  classes.createElement__nextstep__datesection__enddatepayfrequency__monthlyselectedmonths__monthlyholder
                }
              >
                <Input
                  type="radio"
                  value="Monthly"
                  checked={
                    createElementState?.monthlySelectedMonths === 'Monthly'
                  }
                  onChange={handleMonthlySelectedMonths}
                  classname={
                    classes.createElement__nextstep__datesection__enddatepayfrequency__monthlyselectedmonths__monthlyholder__radio
                  }
                />
                <span
                  className={
                    classes.createElement__nextstep__datesection__enddatepayfrequency__monthlyselectedmonths__monthlyholder__text
                  }
                >
                  Monthly
                </span>
              </div>
              <div
                className={
                  classes.createElement__nextstep__datesection__enddatepayfrequency__monthlyselectedmonths__selectedmonthsholder
                }
              >
                <Input
                  type="radio"
                  value="Selected Months"
                  checked={
                    createElementState?.monthlySelectedMonths ===
                    'Selected Months'
                  }
                  onChange={handleMonthlySelectedMonths}
                  classname={
                    classes.createElement__nextstep__datesection__enddatepayfrequency__monthlyselectedmonths__selectedmonthsholder__radio
                  }
                />
                <span
                  className={
                    classes.createElement__nextstep__datesection__enddatepayfrequency__monthlyselectedmonths__selectedmonthsholder__text
                  }
                >
                  Selected Months
                </span>
              </div>
            </div>
            {createElementState?.errors.payFrequency && (
              <span className={classes.createElement__nextstep__errors}>
                {createElementState?.errors.payFrequency}
              </span>
            )}
          </div>
        </div>
        <div
          className={classes.createElement__nextstep__selectedmonth__prorate}
        >
          <span
            className={
              classes.createElement__nextstep__selectedmonth__prorate__heading
            }
          >
            Selected Pay Months
          </span>
          <div
            style={
              createElementState !== undefined &&
              createElementState?.selectedMonths.length > 0
                ? {
                    background: 'white',
                    border: '1px solid #e1e1e1',
                  }
                : {
                    background: '#e1e1e1',
                  }
            }
            className={
              classes.createElement__nextstep__selectedmonth__prorate__resultholder
            }
          >
            <Select
              disabled={
                createElementState?.monthlySelectedMonths === 'Monthly' ||
                createElementState?.monthlySelectedMonths !== 'Selected Months'
              }
              onChange={handleMonthlySelectedMonthsChange}
              text={months}
              classname={
                classes.createElement__nextstep__selectedmonth__prorate__resultholder__select
              }
              defaultText={
                createElementState !== undefined &&
                createElementState?.selectedMonths.length > 0
                  ? ''
                  : 'Select'
              }
            />
            <div
              style={
                createElementState?.processingType === 'Monthly'
                  ? {
                      display: 'none',
                    }
                  : {
                      display: 'flex',
                      gap: '8px',
                      zIndex: 100,
                      marginLeft: 'auto',
                      marginTop: '-25px',
                      marginRight: '20px',
                    }
              }
            >
              <span
                style={{
                  fontSize: '10px',
                  color: 'gray',
                  cursor: 'pointer',
                }}
                onClick={removeAllSelectedMonths}
              >
                {'X'}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: 'gray',
                }}
              >
                {'|'}
              </span>
            </div>
            <div
              style={
                createElementState !== undefined &&
                createElementState?.selectedMonths.length < 1
                  ? {
                      display: 'none',
                    }
                  : {
                      display: 'block',
                      background: 'white',
                    }
              }
              className={
                classes.createElement__nextstep__selectedmonth__prorate__resultholder__list
              }
            >
              <div
                className={
                  classes.createElement__nextstep__selectedmonth__prorate__resultholder__list__text
                }
              >
                {createElementState?.selectedMonths &&
                  createElementState?.selectedMonths.map((month, idx) => (
                    <div
                      key={idx}
                      className={
                        classes.createElement__nextstep__selectedmonth__prorate__resultholder__list__text__valueholder
                      }
                    >
                      <span
                        className={
                          classes.createElement__nextstep__selectedmonth__prorate__resultholder__list__text__valueholder__val
                        }
                      >
                        {month}
                      </span>
                      <span
                        onClick={() => removeMonth(month)}
                        className={
                          classes.createElement__nextstep__selectedmonth__prorate__resultholder__list__text__valueholder__remove
                        }
                      >
                        {'X'}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {createElementState?.errors.selectedPayMonths && (
          <span className={classes.createElement__nextstep__errors}>
            {createElementState?.errors.selectedPayMonths}
          </span>
        )}
        <div className={classes.createElement__nextstep__lastsection}>
          <div className={classes.createElement__nextstep__lastsection__part1}>
            <span
              className={
                classes.createElement__nextstep__lastsection__part1__text
              }
            >
              Prorate
            </span>
            <div
              className={
                classes.createElement__nextstep__datesection__startdateprocessing__openclose
              }
            >
              <div
                className={
                  classes.createElement__nextstep__datesection__startdateprocessing__openclose__openholder
                }
              >
                <Input
                  type="radio"
                  value="Yes"
                  checked={createElementState?.prorate === 'Yes'}
                  onChange={handleProrate}
                  classname={
                    classes.createElement__nextstep__datesection__startdateprocessing__openclose__openholder__radio
                  }
                />
                <span
                  className={
                    classes.createElement__nextstep__datesection__startdateprocessing__openclose__openholder__text
                  }
                >
                  Yes
                </span>
              </div>
              <div
                className={
                  classes.createElement__nextstep__datesection__startdateprocessing__openclose__closeholder
                }
              >
                <Input
                  type="radio"
                  value="No"
                  checked={createElementState?.prorate === 'No'}
                  onChange={handleProrate}
                  classname={
                    classes.createElement__nextstep__datesection__startdateprocessing__openclose__closeholder__radio
                  }
                />
                <span
                  className={
                    classes.createElement__nextstep__datesection__startdateprocessing__openclose__closeholder__text
                  }
                >
                  No
                </span>
              </div>
            </div>
            {createElementState?.errors.prorate && (
              <span className={classes.createElement__nextstep__errors}>
                {createElementState?.errors.prorate}
              </span>
            )}
          </div>

          <div className={classes.createElement__nextstep__lastsection__part2}>
            <span
              className={
                classes.createElement__nextstep__lastsection__part2__text
              }
            >
              Status
            </span>
            <div
              className={
                classes.createElement__nextstep__lastsection__part2__status
              }
            >
              <div
                className={
                  classes.createElement__nextstep__lastsection__part2__status__activeicon
                }
              >
                <input
                  type="checkbox"
                  checked={createElementState?.stepTwoFormData.status}
                  onChange={handleChange}
                  name="status"
                />
                <span
                  className={
                    classes.createElement__nextstep__lastsection__part2__status__activeicon__text
                  }
                >
                  {createElementState?.stepTwoFormData.status
                    ? 'Active'
                    : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.createElement__btnaction}>
          <Button
            type="reset"
            btnClassName={classes.createElement__btnaction__cancel}
            onClick={() => createElementState?.setNextStep(false)}
            btnText="Back"
          />
          <Button
            type="submit"
            btnClassName={classes.createElement__btnaction__next}
            onClick={() => {}}
            btnText="Create New Element"
          />
        </div>
      </div>
    </form>
  );
};

export default CreateElementNextStep;
