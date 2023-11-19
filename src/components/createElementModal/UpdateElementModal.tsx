import React, { useContext, useState } from 'react';
import classes from './CreateElementModal.module.scss';
import Input from '../input/Input';
import { CreateElementStateContext } from '../CreateElementState';
import { AllElementsObject, LookupValueObject } from '../../utils/interface';
import Textarea from '../textarea/Textarea';

interface IUpdate {
  elementCategories: LookupValueObject[];
  elementClassifications: LookupValueObject[];
  elementCategoriesData: LookupValueObject[];
  payRuns: LookupValueObject[];
  elementDet: AllElementsObject;
}

const UpdateElementModal: React.FC<IUpdate> = ({
  elementCategories,
  elementClassifications,
  payRuns,
  elementDet,
  elementCategoriesData,
}) => {
  const createElementState = useContext(CreateElementStateContext);
  const [updateElement, setUpdateElement] = useState({
    id: elementDet?.id,
    name: elementDet?.name,
    description: elementDet?.description,
    payRunId: elementDet?.payRunId,
    payRunValueId: elementDet?.payRunValueId,
    classificationId: elementDet?.classificationValueId,
    classificationValueId: elementDet?.classificationValueId,
    categoryId: elementDet?.categoryId,
    categoryValueId: elementDet?.classificationValueId,
    reportingName: elementDet?.reportingName,
    processingType: elementDet?.processingType,
    status: elementDet?.status,
    prorate: elementDet?.prorate,
    effectiveStartDate: elementDet?.effectiveStartDate,
    effectiveEndDate: elementDet?.effectiveEndDate,
    selectedMonths: elementDet?.selectedMonths,
    payFrequency: elementDet?.payFrequency,
    modifiedBy: elementDet?.modifiedBy,
  });

  console.log('element data', elementDet);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUpdateElement({
      ...updateElement,
      [name]: value,
    });
  };

  return (
    <>
      <div className={classes.createElement__info}>
        <div className={classes.createElement__info__sectionone}>
          <div className={classes.createElement__info__sectionone__nameholder}>
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
              value={updateElement.name}
              onChange={handleChange}
            />
            {createElementState?.updateErrors.name && (
              <span className={classes.createElement__errors}>
                {createElementState?.updateErrors.name}
              </span>
            )}
          </div>
          <div
            className={classes.createElement__info__sectionone__categoryholder}
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
              value={String(updateElement.categoryId)}
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
          {createElementState?.updateErrors.elementCategory && (
            <div className={classes.createElement__errors}>
              {createElementState?.updateErrors.elementCategory}
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
              value={String(updateElement.classificationId)}
              onChange={handleChange}
            >
              <option>Select Classification</option>
              {elementClassifications.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
            {createElementState?.updateErrors.elementClassification && (
              <div className={classes.createElement__errors}>
                {createElementState?.updateErrors.elementClassification}
              </div>
            )}
          </div>
          <div
            className={classes.createElement__info__sectiontwo__payrunholder}
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
              value={Number(updateElement.payRunId)}
              onChange={handleChange}
            >
              <option>Select Payrun</option>
              {payRuns.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
            {createElementState?.updateErrors.payrun && (
              <div className={classes.createElement__errors}>
                {createElementState?.updateErrors.payrun}
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
          value={updateElement.description}
          onChange={handleChange}
        />
        {createElementState?.updateErrors.description && (
          <div className={classes.createElement__errors}>
            {createElementState?.updateErrors.description}
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
          value={updateElement.reportingName}
          onChange={handleChange}
        />
        {createElementState?.updateErrors.reportingName && (
          <div className={classes.createElement__errors}>
            {createElementState?.updateErrors.reportingName}
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateElementModal;
