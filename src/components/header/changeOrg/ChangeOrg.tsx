import React from 'react';
import classes from '../Header.module.scss';
import homeIcon from '../../../images/homeicon.png';
import arrowdown from '../../../images/arrowdown.png';

interface IChangeOrg {}

const ChangeOrg: React.FC<IChangeOrg> = () => {
  return (
    <div className={classes.header__changeorg}>
      <img
        src={homeIcon}
        className={classes.header__changeorg__homeicon}
        alt="home Icon"
      />
      <div className={classes.header__changeorg__content}>
        <div className={classes.header__changeorg__content__title1}>Change Organization</div>
        <div className={classes.header__changeorg__content__title2}>PaperSoft Limited</div>
      </div>
      <img
        src={arrowdown}
        className={classes.header__changeorg__arrowdown}
        alt="arrow down"
      />
    </div>
  );
};

export default ChangeOrg;
