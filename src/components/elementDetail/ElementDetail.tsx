import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface IElementDetail {}

const ElementDetail: React.FC<IElementDetail> = () => {
  const navigate = useNavigate();
  const [createElementLink, setCreateElementLink] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const closeSuccessModal = () => {
    setOpenSuccessModal(false);
  };

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
                    13th Month Allowance
                  </span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    Element Classification
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    Pre-Tax Deduction
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
                    Deductibles
                  </span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    PayRun
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    Monthly Run
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
                    18-09-2023
                  </span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    Effective End Date
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    22-09-2023
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
                  <span className={classes.elementDetailtable__data}>Open</span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    PAY frequency
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    Selected Months
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
                    Pay Months
                  </span>
                  <span className={classes.elementDetailtable__data}>
                    January, February, March
                  </span>
                </span>
              </td>
              <td>
                <span className={classes.elementDetailtable}>
                  <span className={classes.elementDetailtable__heading}>
                    Prorate
                  </span>
                  <span className={classes.elementDetailtable__data}>Yes</span>
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
                    Active
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
            onClick={() => setCreateElementLink(true)}
            spanText={'+'}
          />
        </div>
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
              className={classes.elementDetail__warningContainer__holder__text}
            >
              There are no element links to display
            </span>
          </div>
        </div>
      </div>
      <CreateElementLinksModal
        createElementLink={createElementLink}
        setCreateElementLink={setCreateElementLink}
        setOpenSuccessModal={setOpenSuccessModal}
      />
      <SuccessModal
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
