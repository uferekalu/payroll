import React, { useEffect } from 'react';
import classes from './NoElement.module.scss';
import SearchBar from '../header/search/SearchBar';
import filterBtn from '../../images/filterbtn.png';
import Button from '../button/Button';
import ellipse from '../../images/element-ellipse.png';
import warning from '../../images/warning.png';
// import ElementComp from '../elementComp/ElementComp';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { allElements } from '../../slices/getElementsSlice';
import { RootState } from '../../store';

interface INoElement {}

const NoElement: React.FC<INoElement> = () => {
  // const [elements] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const elements = useAppSelector((state: RootState) => state.allElements);

  useEffect(() => {
    dispatch(allElements());
  }, [dispatch]);

  return (
    <div className={classes.noelement}>
      <h3 className={classes.noelement__heading}>Elements</h3>
      <div className={classes.noelement__searchbar}>
        <div className={classes.noelement__searchbar__holder}>
          <SearchBar placeholderText="Search for element" />
          <img
            src={filterBtn}
            alt="filter btn"
            className={classes.noelement__searchbar__holder__filterbtn}
          />
        </div>
        <Button
          btnClassName={classes.noelement__searchbar__btnholder__text}
          type="submit"
          btnText={`Create Element`}
          spanClassName={classes.noelement__searchbar__btnholder__text__span}
          onClick={() => {}}
          spanText={'+'}
        />
      </div>

      {/* <ElementComp /> */}

      <div className={classes.noelement__warningContainer}>
        <img
          src={ellipse}
          alt="ellipse"
          className={classes.noelement__warningContainer__ellipse}
        />
        <div className={classes.noelement__warningContainer__holder}>
          <img
            src={warning}
            alt="warning"
            className={classes.noelement__warningContainer__warning}
          />
          <span className={classes.noelement__warningContainer__holder__text}>
            There are no elements to display
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoElement;
