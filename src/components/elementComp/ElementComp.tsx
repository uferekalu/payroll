import React from 'react';
import './ElementComp.module.scss';
import ElementTable from './ElementTable';
import classes from './ElementComp.module.scss'

interface IElementComp {}

const ElementComp: React.FC<IElementComp> = () => {
  return (
    <div className={classes.elementcomp}>
      <ElementTable />
    </div>
  );
};

export default ElementComp;
