import React, { useEffect, useState, useMemo, useContext } from 'react';
import GeneralModal from '../modal/GeneralModal';
import classes from './CreateElementModal.module.scss';
import stepOne from '../../images/step1.png';
import stepTwo from '../../images/step2.png';
import Input from '../input/Input';
import Textarea from '../textarea/Textarea';
import Button from '../button/Button';
import CreateElementNextStep from './CreateElementNextStep';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { LookupValueObject } from '../../utils/interface';
import { baseUrl } from '../../slices/api';
import { CreateElementStateContext } from '../CreateElementState';

interface ICreateElement {}

const CreateElementModal: React.FC<ICreateElement> = () => {
  const createElementState = useContext(CreateElementStateContext);
  const [elementCategories, setElementCategories] = useState<
    LookupValueObject[]
  >([]);
  const [elementClassifications, setElementClassifications] = useState<
    LookupValueObject[]
  >([]);
  const [payRuns, setPayruns] = useState<LookupValueObject[]>([]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    createElementState?.setStepOneFormData({
      ...createElementState?.stepOneFormData,
      [name]: value,
    });
  };

  const elementCategoriesData = useMemo(() => {
    if (createElementState?.stepOneFormData.elementClassification === '7') {
      return elementCategories.filter((cat) => cat.name.includes('Deduction'));
    }
    if (createElementState?.stepOneFormData.elementClassification === '8') {
      return elementCategories.filter((cat) => cat.name.includes('Earning'));
    }
    return elementCategories;
  }, [
    elementCategories,
    createElementState?.stepOneFormData.elementClassification,
  ]);

  const payRunValueId = useMemo(() => {
    if (createElementState?.stepOneFormData?.payrun) {
      const prun = payRuns.filter(
        (pr) => String(pr.id) === createElementState?.stepOneFormData?.payrun,
      )[0];
      return prun?.lookupId;
    }
  }, [payRuns, createElementState?.stepOneFormData.payrun]);

  const classificationValueId = useMemo(() => {
    if (createElementState?.stepOneFormData?.elementClassification) {
      const eClass = elementClassifications.filter(
        (ec) =>
          String(ec.id) ===
          createElementState?.stepOneFormData?.elementClassification,
      )[0];
      return eClass?.lookupId;
    }
  }, [
    elementClassifications,
    createElementState?.stepOneFormData.elementClassification,
  ]);

  const categoryValueId = useMemo(() => {
    if (createElementState?.stepOneFormData?.elementCategory) {
      const eCat = elementCategories.filter(
        (ecat) =>
          String(ecat.id) ===
          createElementState?.stepOneFormData?.elementCategory,
      )[0];
      return eCat?.lookupId;
    }
  }, [elementCategories, createElementState?.stepOneFormData.elementCategory]);

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const req1 = axios.get(`${baseUrl}/lookups/1/lookupvalues`);
        const req2 = axios.get(`${baseUrl}/lookups/2/lookupvalues`);
        const req3 = axios.get(`${baseUrl}/lookups/5/lookupvalues`);

        const responses = await Promise.all([req1, req2, req3]);

        const elementCat = responses[0].data;
        const elementClass = responses[1].data;
        const payrun = responses[2].data;

        setElementCategories(elementCat);
        setElementClassifications(elementClass);
        setPayruns(payrun);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLookups();
  }, []);

  const handleCancelCreateElement = () => {
    createElementState?.setCreateElement(false);
    createElementState?.setStepOneFormData({
      name: '',
      elementCategory: '',
      elementClassification: '',
      payrun: '',
      description: '',
      reportingName: '',
    });
    createElementState?.setErrors({
      name: '',
      elementCategory: '',
      elementClassification: '',
      payrun: '',
      description: '',
      reportingName: '',
      effectiveStartDate: '',
      effectiveEndDate: '',
      processingType: '',
      payFrequency: '',
      selectedPayMonths: '',
      prorate: '',
    });
  };

  const validateStepOneForm = () => {
    let isValid = true;
    const newErrors = { ...createElementState?.errors };

    if (createElementState?.stepOneFormData.name.trim() === '') {
      newErrors.name = 'Please input name';
      isValid = false;
    } else {
      newErrors.name = '';
    }

    if (createElementState?.stepOneFormData.description.trim() === '') {
      newErrors.description = 'Please input description';
      isValid = false;
    } else {
      newErrors.description = '';
    }

    if (createElementState?.stepOneFormData.elementCategory === '') {
      newErrors.elementCategory = 'Plese select element category';
      isValid = false;
    } else {
      newErrors.elementCategory = '';
    }

    if (createElementState?.stepOneFormData.elementClassification === '') {
      newErrors.elementClassification = 'Plese select element classification';
      isValid = false;
    } else {
      newErrors.elementClassification = '';
    }

    if (createElementState?.stepOneFormData.payrun === '') {
      newErrors.payrun = 'Plesse select a Pay run';
      isValid = false;
    } else {
      newErrors.payrun = '';
    }

    if (createElementState?.stepOneFormData.reportingName.trim() === '') {
      newErrors.reportingName = 'Please input reporting name';
      isValid = false;
    } else {
      newErrors.reportingName = '';
    }

    createElementState?.setErrors((prevState) => {
      return {
        ...prevState,
        ...newErrors,
      };
    });
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStepOneForm()) {
      if (payRunValueId && classificationValueId && categoryValueId) {
        createElementState?.setLookUpValueIds({
          payRunValueId,
          classificationValueId,
          categoryValueId,
        });
      }
      createElementState?.setNextStep(true);
    } else {
      console.log('Form validation failed');
    }
  };
  return (
    <GeneralModal
      size="lg"
      show={
        createElementState !== undefined && createElementState?.createElement
      }
      onHide={() => {
        createElementState?.setCreateElement(false);
      }}
      className={classes.createElement}
    >
      <Modal.Body className={classes.createElement__body}>
        <h3 className={classes.createElement__heading}>Create Element</h3>
        <div className={classes.createElement__step__holder}>
          {createElementState?.nextStep ? (
            <img
              src={stepTwo}
              className={classes.createElement__step__holder__imgone}
              alt="step two"
            />
          ) : (
            <img
              src={stepOne}
              className={classes.createElement__step__holder__imgone}
              alt="step one"
            />
          )}
        </div>
        {createElementState?.nextStep ? (
          <CreateElementNextStep />
        ) : (
          <>
            <div className={classes.createElement__info}>
              <div className={classes.createElement__info__sectionone}>
                <div
                  className={
                    classes.createElement__info__sectionone__nameholder
                  }
                >
                  <span
                    className={
                      classes.createElement__info__sectionone__nameholder__name
                    }
                  >
                    Name
                  </span>
                  <Input
                    type="text"
                    classname={
                      classes.createElement__info__sectionone__nameholder__input
                    }
                    placeholder="Input Name"
                    name="name"
                    value={createElementState?.stepOneFormData.name}
                    onChange={handleChange}
                  />
                  {createElementState?.errors.name && (
                    <span className={classes.createElement__errors}>
                      {createElementState?.errors.name}
                    </span>
                  )}
                </div>
                <div
                  className={
                    classes.createElement__info__sectionone__categoryholder
                  }
                >
                  <span
                    className={
                      classes.createElement__info__sectionone__categoryholder__category
                    }
                  >
                    Element Category
                  </span>
                  <select
                    className={
                      classes.createElement__info__sectionone__categoryholder__selectcategory
                    }
                    name="elementCategory"
                    value={createElementState?.stepOneFormData.elementCategory}
                    onChange={handleChange}
                  >
                    <option>Select Element Category</option>
                    {elementCategoriesData.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                {createElementState?.errors.elementCategory && (
                  <div className={classes.createElement__errors}>
                    {createElementState?.errors.elementCategory}
                  </div>
                )}
              </div>
              <div className={classes.createElement__info__sectiontwo}>
                <div
                  className={
                    classes.createElement__info__sectiontwo__classificationholder
                  }
                >
                  <span
                    className={
                      classes.createElement__info__sectiontwo__classificationholder__classification
                    }
                  >
                    Element Classification
                  </span>
                  <select
                    className={
                      classes.createElement__info__sectiontwo__classificationholder__selectclassification
                    }
                    name="elementClassification"
                    value={
                      createElementState?.stepOneFormData.elementClassification
                    }
                    onChange={handleChange}
                  >
                    <option>Select Classification</option>
                    {elementClassifications.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                  {createElementState?.errors.elementClassification && (
                    <div className={classes.createElement__errors}>
                      {createElementState?.errors.elementClassification}
                    </div>
                  )}
                </div>
                <div
                  className={
                    classes.createElement__info__sectiontwo__payrunholder
                  }
                >
                  <span
                    className={
                      classes.createElement__info__sectiontwo__payrunholder__payrun
                    }
                  >
                    Payrun
                  </span>
                  <select
                    className={
                      classes.createElement__info__sectiontwo__payrunholder__selectpayrun
                    }
                    name="payrun"
                    value={createElementState?.stepOneFormData.payrun}
                    onChange={handleChange}
                  >
                    <option>Select Payrun</option>
                    {payRuns.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                  {createElementState?.errors.payrun && (
                    <div className={classes.createElement__errors}>
                      {createElementState?.errors.payrun}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={classes.createElement__description}>
              <span className={classes.createElement__description__text}>
                Description
              </span>
              <Textarea
                classname={classes.createElement__description__textarea}
                rows={2}
                placeholder="Input Description"
                name="description"
                value={
                  createElementState !== undefined
                    ? createElementState?.stepOneFormData.description
                    : ''
                }
                onChange={handleChange}
              />
              {createElementState?.errors.description && (
                <div className={classes.createElement__errors}>
                  {createElementState?.errors.description}
                </div>
              )}
            </div>
            <div className={classes.createElement__reporting}>
              <span className={classes.createElement__reporting__text}>
                Reporting Name
              </span>
              <Textarea
                classname={classes.createElement__reporting__textarea}
                rows={2}
                placeholder="Input Reporting Name"
                name="reportingName"
                value={
                  createElementState !== undefined
                    ? createElementState?.stepOneFormData.reportingName
                    : ''
                }
                onChange={handleChange}
              />
              {createElementState?.errors.reportingName && (
                <div className={classes.createElement__errors}>
                  {createElementState?.errors.reportingName}
                </div>
              )}
            </div>
            <div className={classes.createElement__btnaction}>
              <Button
                type="reset"
                btnClassName={classes.createElement__btnaction__cancel}
                onClick={() => handleCancelCreateElement()}
                btnText="Cancel"
              />
              <Button
                style={
                  Object.keys(
                    createElementState !== undefined
                      ? createElementState?.errors
                      : {},
                  ).length === 0
                    ? {
                        background: '#4BAA79',
                      }
                    : {
                        background: '#93ccaf',
                      }
                }
                type="submit"
                btnClassName={classes.createElement__btnaction__next}
                onClick={() => handleNextStep()}
                btnText="Next"
                // disabled={Object.keys(errors).length > 0}
              />
            </div>
          </>
        )}
      </Modal.Body>
    </GeneralModal>
  );
};

export default CreateElementModal;
