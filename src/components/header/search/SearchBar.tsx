import React from 'react';
import classes from '../Header.module.scss';
import searchIcon from '../../../images/searchicon.png';

interface ISearch {
  placeholderText: string
}

const SearchBar: React.FC<ISearch> = ({ placeholderText }) => {
  return (
    <div className={classes.header__searchbar}>
      <input
        type="text"
        placeholder={placeholderText}
        className={classes.header__searchbar__input}
      />
      <div className={classes.header__searchbar__iconholder}>
        <img
          src={searchIcon}
          className={classes.header__searchbar__img}
          alt="search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
