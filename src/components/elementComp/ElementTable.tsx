import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import sortIcon from '../../images/sort.png';
import eyeIcon from '../../images/eye.png';
import deleteIcon from '../../images/deleteicon.png';
import editIcon from '../../images/edit.png';
import actionIcon from '../../images/actionicon.png';
import check2 from '../../images/check2.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import classes from './ElementComp.module.scss';
import Pagination from '../pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import DeleteModalComp from '../deleteModalComp/DeleteModalComp';
import SuccessModal from '../successModl/SuccessModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { allElements } from '../../slices/getElementsSlice';
import axios from 'axios';
import { baseUrl } from '../../slices/api';
import { LookupValueByIdObject } from '../../utils/interface';
import { CreateElementStateContext } from '../CreateElementState';

const popoverData = ['View Element Links', 'Edit Element', 'Delete Element'];

const headerData = [
  'Name',
  'Element Category',
  'Element Classification',
  'Status',
  'Date & Time Modified',
  'Modified By',
  'Action',
];

const data = [
  {
    id: 1,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 2,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 3,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 4,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 5,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 6,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 7,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 8,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 9,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 10,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 11,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
  {
    id: 12,
    name: "13th Month Allowance'",
    elementCategory: 'Deduction',
    elementClassification: 'Pre-Tax Deduction',
    status: 'Active',
    date: '4 - 02 - 2022 || 09:30 AM',
    modifiedBy: 'Samson Ayorinde',
  },
];

interface IElementTb {}

const ElementTable: React.FC<IElementTb> = () => {
  const createElementState = useContext(CreateElementStateContext);
  const imgRef = useRef<HTMLImageElement>(null);
  const naviagte = useNavigate();
  const [noOfItems, setNoOfItems] = useState<number>(5);
  const [outOfRange, setOutOfRange] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [successfulRemoval, setSuccessfulRemoval] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const elements = useAppSelector((state: RootState) => state.allElements);

  const elementsData = useMemo(() => {
    const allData =
      Array.isArray(elements.allElements) &&
      elements.allElements.forEach(async (data) => {
        const result = {
          id: data.id,
          name: data.name,
        };
        const categoy: LookupValueByIdObject = await axios.get(
          `${baseUrl}/lookups/${data.categoryValueId}/lookupvalues/${data.categoryId}`,
        );
        const classification: LookupValueByIdObject = await axios.get(
          `${baseUrl}/lookups/${data.classificationValueId}/lookupvalues/${data.classificationId}`,
        );
        const categoryName = categoy?.name;
        const classificationName = classification?.name;
        return {
          ...result,
          elementCategory: categoryName,
          elementClassification: classificationName,
          status: data.status,
          date: data.effectiveStartDate,
          modifiedBy: data.modifiedBy,
        };
      });
    return allData;
  }, [elements.allElements]);

  console.log(elementsData);

  useEffect(() => {
    dispatch(allElements());
  }, [dispatch]);

  const handleSuccessfulRemoval = () => {
    setSuccessfulRemoval(true);
    setDeleteModal(false);
  };

  const handleNoOfItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number(e.target.value) > elements.allElements.length) {
      setOutOfRange(true);
      return;
    }
    setNoOfItems(Number(e.target.value));
  };

  return (
    <>
      <Pagination
        handleNoOfItems={handleNoOfItems}
        outOfRange={outOfRange}
        items={data}
        itemsPerPage={noOfItems}
        render={(
          displayedItems: {
            id: number;
            name: string;
            elementCategory: string;
            elementClassification: string;
            status: string;
            date: string;
            modifiedBy: string;
          }[],
        ) => (
          <div>
            <Table responsive>
              <thead
                style={{
                  height: '40px',
                }}
              >
                <tr>
                  {headerData.map((header, idx) => (
                    <th
                      style={{
                        background: '#2d416f',
                        padding: '5px',
                      }}
                      key={idx}
                    >
                      <span
                        style={{
                          display: 'flex',
                          gap: '7px',
                          padding: '2px',
                        }}
                      >
                        <h3
                          style={{
                            fontSize: '12px',
                            color: 'white',
                          }}
                        >
                          {header}
                        </h3>
                        <img
                          style={{
                            width: '10px',
                            height: '10px',
                            marginTop: '3px',
                          }}
                          src={sortIcon}
                          alt="sort"
                        />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedItems.map((dt, idx) => (
                  <tr key={`${idx}-table126`}>
                    <td
                      style={{
                        fontSize: '11px',
                      }}
                    >
                      {dt.name}
                    </td>
                    <td
                      style={{
                        fontSize: '11px',
                      }}
                    >
                      {dt.elementCategory}
                    </td>
                    <td
                      style={{
                        fontSize: '11px',
                      }}
                    >
                      {dt.elementClassification}
                    </td>
                    <td
                      style={{
                        fontSize: '11px',
                      }}
                    >
                      {dt.status}
                    </td>
                    <td
                      style={{
                        fontSize: '11px',
                      }}
                    >
                      {dt.date}
                    </td>
                    <td
                      style={{
                        fontSize: '11px',
                      }}
                    >
                      {dt.modifiedBy}
                    </td>
                    <td>
                      <>
                        <OverlayTrigger
                          placement="top"
                          trigger="click"
                          rootClose
                          overlay={
                            <Popover>
                              <Popover.Body>
                                <span className={classes.popover}>
                                  {popoverData.map((pop, idx) => (
                                    <span
                                      style={{
                                        textDecoration: 'none',
                                      }}
                                      onClick={
                                        pop === 'View Element Links'
                                          ? () => naviagte('/element-links')
                                          : pop === 'Delete Element'
                                          ? () => setDeleteModal(true)
                                          : undefined
                                      }
                                      key={idx}
                                      className={classes.popover__container}
                                    >
                                      <img
                                        className={
                                          classes.popover__container__img
                                        }
                                        src={
                                          pop === 'View Element Links'
                                            ? eyeIcon
                                            : pop === 'Edit Element'
                                            ? editIcon
                                            : deleteIcon
                                        }
                                        alt="eye icon"
                                      />
                                      <span
                                        className={
                                          classes.popover__container__text
                                        }
                                      >
                                        {pop}
                                      </span>
                                    </span>
                                  ))}
                                </span>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <img
                            ref={imgRef}
                            style={{
                              cursor: 'pointer',
                            }}
                            src={actionIcon}
                            alt="sort"
                          />
                        </OverlayTrigger>
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      />
      <DeleteModalComp
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        imgSrc={deleteIcon}
        alt="delte"
        deleteMsg1={'Are you sure you want to delete Element?'}
        deleteMsg2={'You can’t reverse this action'}
        onClick1={() => setDeleteModal(false)}
        onClick2={() => handleSuccessfulRemoval()}
        btnText1="Cancel"
        btnText2="Yes, Delete"
      />
      <SuccessModal
        imgSrc={check2}
        alt="Success"
        onClick={() => createElementState?.setSuccessModal(false)}
        successMsg={'Element has been deleted successfully'}
        btnText={'Close to continue'}
      />
    </>
  );
};

export default ElementTable;
