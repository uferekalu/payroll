import React, { useState } from 'react';
import classes from './Header.module.scss';
import logo from '../../images/logo.png';
import ChangeOrg from './changeOrg/ChangeOrg';
import SearchBar from './search/SearchBar';
import notification from '../../images/notification-fill.png';
import PayrollMg from './payrollMg/PayrollMg';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

interface IHeader {}

const Header: React.FC<IHeader> = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    setShowMenu((prevState) => !prevState);
  };
  return (
    <>
      <header className={classes.header}>
        <div className={classes.header__img__container}>
          <img src={logo} className={classes.header__logo} alt="logo" />
        </div>
        <div className={classes.header__content}>
          <ChangeOrg />
          <SearchBar placeholderText='Search for anything...' />
          <div className={classes.header__notpayroll__holder}>
            <img
              src={notification}
              className={classes.header__content__notification}
              alt="logo"
            />
            <PayrollMg />
          </div>
        </div>
      </header>
      <header className={classes.header__mobile}>
        <img src={logo} className={classes.header__mobile__logo} alt="logo" />
        <div className={classes.header__mobile__notpayroll__holder}>
          <img
            src={notification}
            className={classes.header__content__notification}
            alt="logo"
          />
          <PayrollMg />
        </div>
        <div
          style={
            showMenu
              ? {
                  display: 'block',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transition: "0.3s ease all"
                }
              : {
                  display: 'none',
                }
          }
        >
          <div className={classes.header__mobile__content}>
            <ChangeOrg />
            <SearchBar placeholderText='Search for anything...'  />
          </div>
        </div>
        <div className={classes.header__mobile__content__toggle}>
          {showMenu ? (
            <AiOutlineClose
              onClick={handleShowMenu}
              className={classes.header__mobile__menu}
            />
          ) : (
            <BiMenuAltRight
              onClick={handleShowMenu}
              className={classes.header__mobile__menu}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
