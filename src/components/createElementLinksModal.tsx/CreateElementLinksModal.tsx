import React, { useState, useEffect } from 'react';
import classes from './CreateElementLinksModal.module.scss';
import GeneralModal from '../modal/GeneralModal';
import { Modal } from 'react-bootstrap';
import createLink1 from '../../images/createLink1.png';
import createLink2 from '../../images/createLink2.png';
import createLink3 from '../../images/createLink3.png';
import Input from '../input/Input';
import Button from '../button/Button';
import CreateElementModalSecondStep from './CreateElementModalSecondStep';
import {
  AllElementLinksObject,
  DepartmentObject,
  LookupValueObject,
  SuborganizationObject,
} from '../../utils/interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { allSuborganizations } from '../../slices/getSuborganizationsSlice';
import { useParams } from 'react-router-dom';
import { getDepartments } from '../../slices/departmentsSlice';
import { JobTitle } from './jobTitles';
import { Locations } from './locations';
import { EmployeeTypes } from './employeeTypes';
import { EmployeeCategories } from './employeeCategories';

interface ICreateElementLinks {
  createElementLink: boolean;
  setCreateElementLink: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  editElementLinks: boolean;
}

const CreateElementLinksModal: React.FC<ICreateElementLinks> = ({
  createElementLink,
  setCreateElementLink,
  setOpenSuccessModal,
  editElementLinks,
}) => {
  const param = useParams();
  console.log(param.id);
  const [secondStep, setSecondStep] = useState<boolean>(false);
  const [thirdStep, setThirdStep] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const subOrganizations = useAppSelector(
    (state: RootState) => state.allSuborganizations,
  );
  const departments = useAppSelector((state: RootState) => state.departments);
  const [elementLinksForm, setElementLinksForm] =
    useState<AllElementLinksObject>({
      id: null,
      name: '',
      elementId: Number(param.id),
      suborganizationId: null,
      locationId: null,
      departmentId: null,
      employeeCategoryId: null,
      employeeCategoryValueId: 3,
      employeeTypeId: null,
      employeeTypeValueId: 4,
      jobTitleId: null,
      grade: null,
      gradeStep: null,
      unionId: null,
      amountType: '',
      amount: null,
      rate: null,
      effectiveStartDate: '',
      effectiveEndDate: '',
      status: '',
      automate: '',
      additionalInfo: [
        {
          lookupId: null,
          lookupValueId: null,
        },
      ],
    });

  const { jobTitles } = JobTitle();
  const { locations } = Locations();
  const { employeeTypes } = EmployeeTypes();
  const { employeeCategories } = EmployeeCategories();

  console.log('form fata', elementLinksForm);
  useEffect(() => {
    dispatch(allSuborganizations());
  }, [dispatch]);

  useEffect(() => {
    if (elementLinksForm.suborganizationId) {
      dispatch(getDepartments(elementLinksForm.suborganizationId));
    }
  }, [dispatch, elementLinksForm.suborganizationId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // If the property is part of additionalInfo array
    if (name.startsWith('additionalInfo')) {
      const additionalInfoIndex = Number(name.split('.')[1]); 
      const updatedAdditionalInfo = Array.isArray(
        elementLinksForm.additionalInfo,
      )
        ? [...elementLinksForm.additionalInfo]
        : [];

      // Update the specific property in the additionalInfo array
      updatedAdditionalInfo[additionalInfoIndex] = {
        ...updatedAdditionalInfo[additionalInfoIndex],
        [name.split('.')[2]]: value,
      };

      // Update the state with the modified additionalInfo array
      setElementLinksForm({
        ...elementLinksForm,
        additionalInfo: updatedAdditionalInfo,
      });
    } else {
      // If not part of additionalInfo array, update as usual
      setElementLinksForm({
        ...elementLinksForm,
        [name]: value,
      });
    }
  };

  const handleThirdStep = () => {
    setThirdStep(true);
  };

  const handleSecondStep = () => {
    setSecondStep(true);
  };

  const handleCancel = () => {
    setCreateElementLink(false);
  };
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
          {editElementLinks
            ? 'Edit Element Link'
            : createElementLink
            ? 'Create Element Link'
            : undefined}
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
            elementLinksForm={elementLinksForm}
            setElementLinksForm={setElementLinksForm}
            handleChange={handleChange}
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
                name="name"
                value={elementLinksForm.name}
                onChange={handleChange}
              />
            </div>
            <div className={classes.createElementLink__subdept}>
              <div className={classes.createElementLink__subdept__sub}>
                <span className={classes.createElementLink__subdept__sub__text}>
                  Suborganization
                </span>
                <select
                  className={classes.createElementLink__subdept__sub__select}
                  onChange={handleChange}
                  name="suborganizationId"
                  value={String(elementLinksForm.suborganizationId)}
                >
                  <option>Select a Suborganization</option>
                  {subOrganizations &&
                    subOrganizations.data.map((sub: SuborganizationObject) => (
                      <option key={sub.id} value={String(sub.id)}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className={classes.createElementLink__subdept__dept}>
                <span className={classes.createElementLink__subdept__sub__text}>
                  Department
                </span>
                <select
                  className={classes.createElementLink__subdept__sub__select}
                  onChange={handleChange}
                  name="departmentId"
                  value={String(elementLinksForm.departmentId)}
                >
                  <option>Select a Department</option>
                  {departments &&
                    departments.data.map((dept: DepartmentObject) => (
                      <option key={dept.id} value={String(dept.id)}>
                        {dept.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className={classes.createElementLink__jobloc}>
              <div className={classes.createElementLink__jobloc__job}>
                <span className={classes.createElementLink__jobloc__job__text}>
                  Job Title
                </span>
                <select
                  className={classes.createElementLink__jobloc__job__select}
                  onChange={handleChange}
                  name="jobTitleId"
                  value={String(elementLinksForm.jobTitleId)}
                >
                  <option>Select a Job Title</option>
                  {jobTitles &&
                    jobTitles.lookupValues.map((job: LookupValueObject) => (
                      <option key={job.id} value={String(job.id)}>
                        {job.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className={classes.createElementLink__jobloc__loc}>
                <span className={classes.createElementLink__jobloc__loc__text}>
                  Location
                </span>
                <select
                  className={classes.createElementLink__jobloc__loc__select}
                  onChange={handleChange}
                  name="locationId"
                  value={String(elementLinksForm.locationId)}
                >
                  <option>Select a Location</option>
                  {locations &&
                    locations.map((location: LookupValueObject) => (
                      <option key={location.id} value={String(location.id)}>
                        {location.name}
                      </option>
                    ))}
                </select>
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
                <select
                  className={
                    classes.createElementLink__employeetypecat__type__select
                  }
                  onChange={handleChange}
                  name="employeeTypeId"
                  value={String(elementLinksForm.employeeTypeId)}
                >
                  <option>Select an Employee Type</option>
                  {employeeTypes &&
                    employeeTypes.map((employeeType: LookupValueObject) => (
                      <option
                        key={employeeType.id}
                        value={String(employeeType.id)}
                      >
                        {employeeType.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className={classes.createElementLink__employeetypecat__cat}>
                <span
                  className={
                    classes.createElementLink__employeetypecat__cat__text
                  }
                >
                  Employee Category
                </span>
                <select
                  className={
                    classes.createElementLink__employeetypecat__cat__select
                  }
                  onChange={handleChange}
                  name="employeeCategoryId"
                  value={String(elementLinksForm.employeeCategoryId)}
                >
                  <option>Select a Employee Category</option>
                  {employeeCategories &&
                    employeeCategories.map(
                      (employeeCategory: LookupValueObject) => (
                        <option
                          key={employeeCategory.id}
                          value={String(employeeCategory.id)}
                        >
                          {employeeCategory.name}
                        </option>
                      ),
                    )}
                </select>
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
