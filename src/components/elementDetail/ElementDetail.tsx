import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './ElementDetail.module.scss';
import arrowLeft from '../../images/arrowleft.png';
import check from '../../images/check.png';
import { Table } from 'react-bootstrap';
import SearchBar from '../header/search/SearchBar';
import Button from '../button/Button';
import filterBtn from '../../images/filterbtn.png';
import ellipse from '../../images/element-ellipse.png';
import warning from '../../images/warning.png';
import CreateElementLinksModal from '../createElementLinksModal.tsx/CreateElementLinksModal';
import SuccessModal from '../successModl/SuccessModal';
import { CreateElementStateContext } from '../CreateElementState';
import ElementLinksTable from '../elementComp/ElementLinksTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAnElement } from '../../slices/getAnElementSlice';
import { RootState } from '../../store';
import { LookupValueObject } from '../../utils/interface';
import axios from 'axios';

interface IElementDetail {}

const ElementDetail: React.FC<IElementDetail> = () => {
  const navigate = useNavigate();
  const [createElementLink, setCreateElementLink] = useState<boolean>(false);
  const createElementState = useContext(CreateElementStateContext);
  const [elementLinksDetail] = useState(true);
  const [editElementLinks, setIsEditElementLinks] = useState<boolean>(false);
  const { id } = useParams();
  const [category, setCategory] = useState<LookupValueObject | {}>({});
  const [classification, setClassification] = useState<LookupValueObject | {}>(
    {},
  );
  const [payrun, setPayrun] = useState<LookupValueObject | {}>({});
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const closeSuccessModal = () => {
    setOpenSuccessModal(false);
  };
  const dispatch = useAppDispatch();
  const elementDetail = useAppSelector(
    (state: RootState) => state.getAnElement,
  );

  useEffect(() => {
    if (
      elementDetail.element.categoryId &&
      elementDetail.element.categoryValueId
    ) {
      const handleCategory = async () => {
        const data = await axios.get(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${elementDetail.element.categoryId}/lookupvalues/${elementDetail.element.categoryValueId}`,
        );
        setCategory(data.data);
      };
      handleCategory();
    }
  }, [elementDetail.element.categoryId, elementDetail.element.categoryValueId]);

  useEffect(() => {
    if (
      elementDetail.element.classificationId &&
      elementDetail.element.classificationValueId
    ) {
      const handleClassification = async () => {
        const data = await axios.get(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${elementDetail.element.classificationId}/lookupvalues/${elementDetail.element.classificationValueId}`,
        );
        setClassification(data.data);
      };
      handleClassification();
    }
  }, [
    elementDetail.element.classificationId,
    elementDetail.element.classificationValueId,
  ]);

  useEffect(() => {
    if (elementDetail.element.payRunId && elementDetail.element.payRunValueId) {
      const handlePayRun = async () => {
        const data = await axios.get(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${elementDetail.element.payRunId}/lookupvalues/${elementDetail.element.payRunValueId}`,
        );
        setPayrun(data.data);
      };
      handlePayRun();
    }
  }, [elementDetail.element.payRunId, elementDetail.element.payRunValueId]);

  useEffect(() => {
    dispatch(getAnElement(Number(id)));
  }, [dispatch, id]);

  return (
    <>
      <div className={classes.elementDetail}>
        <img
          onClick={() => navigate('/elements')}
          src={arrowLeft}
          alt="arror left"
          className={classes.elementDetail__arrowleft}
        />
        <h3 className={classes.elementDetail__heading}>Element Details</h3>
        <Table
          responsive
          className="table table-bordered"
          style={{
            marginTop: '7px',
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: '10px',
                }}
              >
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    Element Name
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {elementDetail.element.name}
                  </span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    Element Classification
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {classification &&
                      'name' in classification &&
                      classification["name"]}
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '10px',
                }}
              >
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    ELEMENT category
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {category && 'name' in category && category?.name}
                  </span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    PayRun
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {payrun && 'name' in payrun && payrun.name}
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '10px',
                }}
              >
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    Effective Start Date
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {elementDetail.element.effectiveStartDate}
                  </span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    Effective End Date
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {elementDetail.element.effectiveEndDate}
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '10px',
                }}
              >
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    PROCESSING TYPE
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {elementDetail.element.processingType}
                  </span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    PAY FREQUENCY
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {elementDetail.element.payFrequency}
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '10px',
                }}
              >
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    PAY MONTHS
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {elementDetail.element.selectedMonths.map((month, idx) => (
                      <span
                        style={{
                          display: 'flex',
                          gap: '5px',
                          fontSize: '11px',
                        }}
                        key={idx}
                      >
                        {month}
                      </span>
                    ))}
                  </span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    PRORATE
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {elementDetail.element.prorate}
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '10px',
                }}
              >
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    Status
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    {elementDetail.element.status}
                  </span>
                </span>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <h3 className={classes.elementDetail__heading2}>Element Links</h3>
        <div className={classes.elementDetail__searchbar}>
          <div className={classes.elementDetail__searchbar__holder}>
            <SearchBar placeholderText="Search for element" />
            <img
              src={filterBtn}
              alt="filter btn"
              className={classes.elementDetail__searchbar__holder__filterbtn}
            />
          </div>
          <Button
            btnClassName={classes.elementDetail__searchbar__btnholder__text}
            type="submit"
            btnText={`Create Element Link`}
            spanClassName={
              classes.elementDetail__searchbar__btnholder__text__span
            }
            onClick={() => {
              setCreateElementLink(true);
              setIsEditElementLinks(false);
            }}
            spanText={'+'}
          />
        </div>
        {elementLinksDetail ? (
          <ElementLinksTable
            createElementLink={createElementLink}
            setCreateElementLink={setCreateElementLink}
            setIsEditElementLinks={setIsEditElementLinks}
          />
        ) : (
          <div className={classes.elementDetail__warningContainer}>
            <img
              src={ellipse}
              alt="ellipse"
              className={classes.elementDetail__warningContainer__ellipse}
            />
            <div className={classes.elementDetail__warningContainer__holder}>
              <img
                src={warning}
                alt="warning"
                className={classes.elementDetail__warningContainer__warning}
              />
              <span
                className={
                  classes.elementDetail__warningContainer__holder__text
                }
              >
                There are no element links to display
              </span>
            </div>
          </div>
        )}
      </div>
      <CreateElementLinksModal
        createElementLink={createElementLink}
        setCreateElementLink={setCreateElementLink}
        setOpenSuccessModal={
          createElementState?.setCreateElementSuccess || (() => {})
        }
        editElementLinks={editElementLinks}
      />
      <SuccessModal
        successModal={openSuccessModal}
        setSuccessModal={setOpenSuccessModal}
        imgSrc={check}
        alt={'success'}
        successMsg={`Element Link has been created successfully`}
        btnText={'Close to continue'}
        onClick={() => closeSuccessModal()}
      />
    </>
  );
};

export default ElementDetail;
