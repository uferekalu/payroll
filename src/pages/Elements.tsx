import React, { useState } from 'react';
import classes from './Elements.module.scss';
import Sidebar from '../components/sidebar/Sidebar';
import MobileSidebar from '../components/sidebar/MobileSidebar';
import { AiOutlineClose } from 'react-icons/ai';
import NoElement from '../components/noElement/NoElement';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
// import check from '../images/check.png';

interface IElement {}

const Elements: React.FC<IElement> = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

  const toggleMobileShowSidebar = () => {
    setShowMobileSidebar((prevState) => !prevState);
  };
  return (
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
        <NoElement />
      </div>
    </div>
  );
};

export default Elements;
