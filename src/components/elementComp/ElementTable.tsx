import React, { useEffect, useRef, useState, useContext } from 'react';
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
import { AllElementsObject } from '../../utils/interface';
import { CreateElementStateContext } from '../CreateElementState';
import { deleteElement } from '../../slices/deleteAnElementSlice';

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

interface IElementTb {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ElementTable: React.FC<IElementTb> = ({
  setIsEdit,
  editId,
  setEditId,
}) => {
  const createElementState = useContext(CreateElementStateContext);
  const imgRef = useRef<HTMLImageElement>(null);
  const naviagte = useNavigate();
  const [noOfItems, setNoOfItems] = useState<number>(5);
  const [outOfRange, setOutOfRange] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const allElementsData = useAppSelector(
    (state: RootState) => state.allElements,
  );

  const deletedElement = useAppSelector(
    (state: RootState) => state.deleteAnElement,
  );
  const [elements, setElements] = useState<
    {
      id: number;
      name: string;
      elementCategory: string;
      elementClassification: string;
      status: string;
      date: string;
      modifiedBy: string;
    }[]
  >([]);
  const [successfulRemoval, setSuccessfulRemoval] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (deleteId) {
      setDeleteModal(true);
    }
  }, [deleteId]);

  useEffect(() => {
    const getAllElements = async () => {
      const data = allElementsData.allElements.map(
        (data: AllElementsObject) => {
          const dt = {
            id: data.id ?? 0,
            name: data.name,
            elementCategory: String(data.categoryId),
            elementClassification: String(data.classificationId),
            status: data.status,
            date: String(
              `${data.effectiveStartDate} || ${data.effectiveEndDate}`,
            ),
            modifiedBy: String(data.modifiedBy),
          };
          return dt;
        },
      );
      setElements(data);
    };
    getAllElements();
  }, [allElementsData.allElements]);

  useEffect(() => {
    dispatch(allElements());
  }, [dispatch]);

  useEffect(() => {
    if (deletedElement.deleteElementStatus === 'success') {
      setSuccessfulRemoval(true);
      dispatch(allElements());
    }
  }, [deletedElement.deleteElementStatus, dispatch]);

  const handleSuccessfulRemoval = async () => {
    const data = {
      id: deleteId,
    };
    await dispatch(deleteElement(data));
    setDeleteModal(false);
  };

  const handleNoOfItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number(e.target.value) > elements.length) {
      setOutOfRange(true);
      return;
    }
    setNoOfItems(Number(e.target.value));
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setDeleteModal(false);
  };

  return (
    <>
      <Pagination
        handleNoOfItems={handleNoOfItems}
        outOfRange={outOfRange}
        items={elements}
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
                      {dt.name.split(' ')[0]}
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
                      {dt.modifiedBy.split(' ').slice(0, 2).join(' ')}
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
                                          ? () => {
                                              naviagte(
                                                `/element-links/${dt.id}`,
                                              );
                                              createElementState?.setElementId(
                                                (prevState) => dt.id,
                                              );
                                              setId(dt.id);
                                            }
                                          : pop === 'Delete Element'
                                          ? () => {
                                              setDeleteId(dt.id);
                                            }
                                          : pop === 'Edit Element'
                                          ? () => {
                                              setEditId(dt.id);
                                              setIsEdit(true);
                                              createElementState?.setCreateElement(
                                                true,
                                              );
                                            }
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
        onClick1={handleCancelDelete}
        onClick2={() => handleSuccessfulRemoval()}
        btnText1="Cancel"
        btnText2="Yes, Delete"
      />
      <SuccessModal
        successModal={successfulRemoval}
        setSuccessModal={setSuccessfulRemoval}
        imgSrc={check2}
        alt="Success"
        onClick={() => setSuccessfulRemoval(false)}
        successMsg={'Element has been deleted successfully'}
        btnText={'Close to continue'}
      />
    </>
  );
};

export default React.memo(ElementTable);
