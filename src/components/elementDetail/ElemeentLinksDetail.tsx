import React, { useContext } from 'react';
import classes from './ElementDetail.module.scss';
import CustomModal from '../modal/CustomModal';
import { CreateElementStateContext } from '../CreateElementState';
import { Table } from 'react-bootstrap';
import closeIcon from '../../images/closeIcon.png';

interface IElementLD {}

const ElementLinksDetails: React.FC<IElementLD> = () => {
  const createElementState = useContext(CreateElementStateContext);
  return (
    <div>
      <CustomModal
        isOpen={
          createElementState !== undefined &&
          createElementState?.isCustomModalOpen
        }
        onClose={() => {}}
      >
        <div className={classes.elementDetail}>
          <img
            style={{
              marginBottom: '12px',
            }}
            onClick={() => createElementState?.setIsCustomModalOpen(false)}
            src={closeIcon}
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
                    <span className={classes.elementDetailtable__data}>
                      Open
                    </span>
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
                    <span className={classes.elementDetailtable__data}>
                      Yes
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
                      Active
                    </span>
                  </span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </CustomModal>
    </div>
  );
};

export default ElementLinksDetails;
