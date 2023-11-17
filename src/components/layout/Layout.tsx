import React, { ReactNode } from 'react';
import Header from '../header/Header';
import classes from './Layout.module.scss';
import Footer from '../footer/Footer';

interface ILayout {
  children: ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
