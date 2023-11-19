import React, { useEffect, useState } from 'react';
import classes from './CreateElementLinksModal.module.scss';
import Select from '../select/Select';
import Button from '../button/Button';
import CreateElementModalThirdStep from './CreateElementModalThirdStep';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { allGrades } from '../../slices/gradesSlice';
import { RootState } from '../../store';
import {
  AllElementLinksObject,
  GetGradeStepObject,
  GradeObject,
  LookupValueObject,
} from '../../utils/interface';
import { getGradeSteps } from '../../slices/getGradeStepsSlice';
import { Union } from './union';
import { Housing } from './housing';
import { Wadrobe } from './wadrobe';
import { Security } from './security';

interface ICreateElementLinkSecond {
  thirdStep: boolean;
  handleThirdStep: () => void;
  setSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
  setThirdStep: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateElementLink: React.Dispatch<React.SetStateAction<boolean>>;
  elementLinksForm: AllElementLinksObject;
  setElementLinksForm: React.Dispatch<
    React.SetStateAction<AllElementLinksObject>
  >;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const CreateElementModalSecondStep: React.FC<ICreateElementLinkSecond> = ({
  thirdStep,
  handleThirdStep,
  setSecondStep,
  setThirdStep,
  setOpenSuccessModal,
  setCreateElementLink,
  elementLinksForm,
  setElementLinksForm,
  handleChange,
}) => {
  const [additionInfoDiv, setAdditionalInfoDiv] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const grades = useAppSelector((state: RootState) => state.grades);
  const gradeSteps = useAppSelector((state: RootState) => state.getGradeSteps);
  const { unions } = Union();
  const { housings } = Housing();
  const { wadrobes } = Wadrobe();
  const { securities } = Security();

  useEffect(() => {
    dispatch(allGrades());
  }, [dispatch]);

  useEffect(() => {
    if (elementLinksForm.grade) {
      dispatch(getGradeSteps(elementLinksForm.grade));
    }
  }, [dispatch, elementLinksForm.grade]);

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
              <select
                className={
                  classes.createElementLink__secondstep__gradestep__grade__select
                }
                onChange={handleChange}
                name="grade"
                value={String(elementLinksForm.grade)}
              >
                <option>Select a Grade</option>
                {grades &&
                  grades.data.map((grade: GradeObject) => (
                    <option key={grade.id} value={String(grade.id)}>
                      {grade.name}
                    </option>
                  ))}
              </select>
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
              <select
                className={
                  classes.createElementLink__secondstep__gradestep__gradestep__select
                }
                onChange={handleChange}
                name="gradeStep"
                value={String(elementLinksForm.gradeStep)}
              >
                <option>Select a Grade Step</option>
                {gradeSteps &&
                  gradeSteps.data.map((step: GetGradeStepObject) => (
                    <option key={step.id} value={String(step.id)}>
                      {step.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className={classes.createElementLink__secondstep__union}>
            <span
              className={classes.createElementLink__secondstep__union__text}
            >
              Union
            </span>
            <select
              className={classes.createElementLink__secondstep__union__select}
              onChange={handleChange}
              name="unionId"
              value={String(elementLinksForm.unionId)}
            >
              <option>Select a Union</option>
              {unions &&
                unions.map((union: LookupValueObject) => (
                  <option key={union.id} value={String(union.id)}>
                    {union.name}
                  </option>
                ))}
            </select>
          </div>
          <div
            className={classes.createElementLink__secondstep__additionalinfo}
            onClick={() => setAdditionalInfoDiv(true)}
          >
            <span
              className={
                classes.createElementLink__secondstep__additionalinfo__text
              }
            >
              Additional Assignment Information
            </span>
            {additionInfoDiv ? (
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
                      Housing
                    </span>
                    <select
                      className={
                        classes.createElementLink__secondstep__additionalinfo__pensionhouse__pension__select
                      }
                      onChange={handleChange}
                      name="additionalInfo"
                      value={String(elementLinksForm.additionalInfo)}
                    >
                      <option>Select a Housing</option>
                      {housings &&
                        housings.map((housing: LookupValueObject) => (
                          <option key={housing.id} value={String(housing.id)}>
                            {housing.name}
                          </option>
                        ))}
                    </select>
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
                      Wadrobe
                    </span>
                    <select
                      className={
                        classes.createElementLink__secondstep__additionalinfo__pensionhouse__housing__select
                      }
                      onChange={handleChange}
                      name="additionalInfo"
                      value={String(elementLinksForm.additionalInfo)}
                    >
                      <option>Select a wadrobe</option>
                      {wadrobes &&
                        wadrobes.map((wadrobe: LookupValueObject) => (
                          <option key={wadrobe.id} value={String(wadrobe.id)}>
                            {wadrobe.name}
                          </option>
                        ))}
                    </select>
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
                  <select
                    className={
                      classes.createElementLink__secondstep__additionalinfo__loyaltybonus__select
                    }
                    onChange={handleChange}
                    name="additionalInfo"
                    value={String(elementLinksForm.additionalInfo)}
                  >
                    <option>Select a Security</option>
                    {securities &&
                      securities.map((security: LookupValueObject) => (
                        <option key={security.id} value={String(security.id)}>
                          {security.name}
                        </option>
                      ))}
                  </select>
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
