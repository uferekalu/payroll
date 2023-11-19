import React from 'react';
import './ElementComp.module.scss';
import ElementTable from './ElementTable';
import classes from './ElementComp.module.scss';

interface IElementComp {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ElementComp: React.FC<IElementComp> = ({
  setIsEdit,
  editId,
  setEditId,
}) => {
  return (
    <div className={classes.elementcomp}>
      <ElementTable
        setIsEdit={setIsEdit}
        editId={editId}
        setEditId={setEditId}
      />
    </div>
  );
};

export default ElementComp;
