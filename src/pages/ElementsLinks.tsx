import React, { useContext, useState } from 'react';
import classes from './Elements.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import MobileSidebar from '../components/sidebar/MobileSidebar';
import Sidebar from '../components/sidebar/Sidebar';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import ElementDetail from '../components/elementDetail/ElementDetail';
import {
  CreateElementStateContext,
  CreateElementStateProvider,
} from '../components/CreateElementState';
import SuccessModal from '../components/successModl/SuccessModal';
import check from '../images/check.png';

interface IElementsLinks {}

const ElementLinks: React.FC<IElementsLinks> = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const createElementState = useContext(CreateElementStateContext);

  const toggleMobileShowSidebar = () => {
    setShowMobileSidebar((prevState) => !prevState);
  };

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
            <ElementDetail />
          </div>
        </div>
        <SuccessModal
          imgSrc={check}
          alt="Success"
          onClick={() => createElementState?.setSuccessModal(false)}
          successMsg={'Element Link has been created successfully'}
          btnText={'Close to continue'}
        />
      </CreateElementStateProvider>
    </>
  );
};

export default ElementLinks;
