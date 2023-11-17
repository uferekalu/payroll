import React from 'react';
import classes from './ElementSetupContent.module.scss';
import { Link } from 'react-router-dom';

const elementSetupData = ['Elements', 'Balances'];

interface IElementSetup {}

const ElementSetupContent: React.FC<IElementSetup> = () => {
  return (
    <div className={classes.element__setup}>
      {elementSetupData.map((ele, idx) => (
        <Link
          to={ele === 'Elements' ? '/elements' : ''}
          key={idx}
          className={
            ele === 'Elements'
              ? `${classes.element__setup__title} ${classes.element__setup__title__extra}`
              : `${classes.element__setup__title}`
          }
        >
          {ele}
        </Link>
      ))}
    </div>
  );
};

export default ElementSetupContent;
