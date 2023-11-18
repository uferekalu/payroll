import React from 'react';
import './ElementComp.module.scss';
import ElementTable from './ElementTable';
import classes from './ElementComp.module.scss';

interface IElementComp {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ElementComp: React.FC<IElementComp> = ({ setIsEdit }) => {
  return (
    <div className={classes.elementcomp}>
      <ElementTable setIsEdit={setIsEdit} />
    </div>
  );
};

export default ElementComp;
