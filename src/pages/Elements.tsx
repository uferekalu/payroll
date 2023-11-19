import React, { useContext, useState } from 'react';
import classes from './Elements.module.scss';
import Sidebar from '../components/sidebar/Sidebar';
import MobileSidebar from '../components/sidebar/MobileSidebar';
import { AiOutlineClose } from 'react-icons/ai';
import NoElement from '../components/noElement/NoElement';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import {
  CreateElementStateContext,
  CreateElementStateProvider,
} from '../components/CreateElementState';
import CreateElementModal from '../components/createElementModal/CreateElementModal';
import SuccessModal from '../components/successModl/SuccessModal';
import check from '../images/check.png';

interface IElement {}

const Elements: React.FC<IElement> = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const createElementState = useContext(CreateElementStateContext);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [createElementSucces, setCreateElementSuccess] =
    useState<boolean>(false);
  const toggleMobileShowSidebar = () => {
    setShowMobileSidebar((prevState) => !prevState);
  };

  // console.log("create element success", createElementState?.createElementSucces)
  return (
    <>
      <CreateElementStateProvider>
        <div className={classes.elements}>
          <div className={classes.elements__showsidebar}>
            {showMobileSidebar ? (
              <AiOutlineClose
                style={{
                  cursor: 'pointer',
                }}
                onClick={toggleMobileShowSidebar}
              />
            ) : (
              <i
                style={{
                  cursor: 'pointer',
                }}
                className="bi bi-list"
                onClick={toggleMobileShowSidebar}
              ></i>
            )}
          </div>
          {showMobileSidebar && (
            <div className={classes.mobileSidebar}>
              <MobileSidebar />
            </div>
          )}
          <div className={classes.elements__sidebar}>
            <Sidebar />
          </div>
          <div className={classes.elements__main}>
            <Breadcrumb />
            <NoElement
              setIsEdit={setIsEdit}
              editId={editId}
              setEditId={setEditId}
            />
          </div>
          <CreateElementModal
            setCreateElementSuccess={setCreateElementSuccess}
            isEdit={isEdit}
            editId={editId}
            setEditId={setEditId}
          />
        </div>
        <SuccessModal
          successModal={createElementSucces}
          setSuccessModal={setCreateElementSuccess}
          imgSrc={check}
          alt="Success"
          onClick={() => setCreateElementSuccess(false)}
          successMsg={'Element has been created successfully'}
          btnText={'Close to continue'}
        />
      </CreateElementStateProvider>
    </>
  );
};

export default Elements;
