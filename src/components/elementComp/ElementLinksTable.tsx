import React, { useState, useContext } from 'react';
import Pagination from '../pagination/Pagination';
import sortIcon from '../../images/sort.png';
import editIcon from '../../images/edit.png';
import deleteIcon from '../../images/delete.png';
import deleteIcon2 from '../../images/deleteicon.png';
import { Table } from 'react-bootstrap';
import DeleteModalComp from '../deleteModalComp/DeleteModalComp';
import { CreateElementStateContext } from '../CreateElementState';
import ElementLinksDetails from '../elementDetail/ElemeentLinksDetail';

interface IElementsLink {
  createElementLink: boolean;
  setCreateElementLink: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditElementLinks: React.Dispatch<React.SetStateAction<boolean>>;
}

const headerData = [
  'Name',
  'Sub Organization',
  'Department',
  'Employee Category',
  'Amount',
  'Details',
  'Action',
];
const data = [
  {
    id: 1,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
  {
    id: 2,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
  {
    id: 3,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
  {
    id: 4,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
  {
    id: 5,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
  {
    id: 6,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
  {
    id: 7,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
  {
    id: 8,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
  {
    id: 9,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
  {
    id: 10,
    name: 'ABC Corporation',
    elementCategory: 'Solutioons Delivery',
    elementClassification: 'Software Department',
    status: 'Junior Staff',
    date: '10,000.000',
    modifiedBy: 'View Details',
  },
];

const ElementLinksTable: React.FC<IElementsLink> = ({
  setCreateElementLink,
  setIsEditElementLinks,
}) => {
  const createElementState = useContext(CreateElementStateContext);
  const [outOfRange, setOutOfRange] = useState<boolean>(false);
  const [noOfItems, setNoOfItems] = useState<number>(5);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [successfulRemoval, setSuccessfulRemoval] = useState<boolean>(false);
  const handleNoOfItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number(e.target.value) > data.length) {
      setOutOfRange(true);
      return;
    }
    setNoOfItems(Number(e.target.value));
  };

  const openEditElementLinkModal = () => {
    setIsEditElementLinks(true);
    setCreateElementLink(true);
  };

  const handleSuccessfulRemoval = () => {
    setSuccessfulRemoval(true);
    setDeleteModal(false);
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
                      onClick={() =>
                        createElementState?.setIsCustomModalOpen(true)
                      }
                      style={{
                        fontSize: '11px',
                        textDecoration: 'underline',
                        color: 'green',
                        cursor: 'pointer',
                      }}
                    >
                      {dt.modifiedBy}
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'flex',
                          gap: '10px',
                        }}
                      >
                        <img
                          onClick={openEditElementLinkModal}
                          style={{
                            cursor: 'pointer',
                          }}
                          src={editIcon}
                          alt="edit"
                        />
                        <img
                          onClick={() => setDeleteModal(true)}
                          style={{
                            cursor: 'pointer',
                          }}
                          src={deleteIcon}
                          alt="edit"
                        />
                      </span>
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
        imgSrc={deleteIcon2}
        alt="delte"
        deleteMsg1={'Are you sure you want to delete Element Link?'}
        deleteMsg2={'You can’t reverse this action'}
        onClick1={() => setDeleteModal(false)}
        onClick2={() => handleSuccessfulRemoval()}
        btnText1="Cancel"
        btnText2="Yes, Delete"
      />
      <ElementLinksDetails />
    </>
  );
};

export default ElementLinksTable;
