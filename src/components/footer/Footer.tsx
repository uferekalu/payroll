import React from 'react';
import classes from './Footer.module.scss';

interface IFooter {}

const Footer: React.FC<IFooter> = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__copyright}>
        <i style={{
          color: "white",
          fontWeight: 400,
          fontSize: '11px',
          marginRight: "5px"
        }} className="bi bi-c-circle"></i>
        <span className={classes.footer__copyright__text}>
          2022 SoftSuite. All rights reserved.
        </span>
      </div>
      <span className={classes.footer__email}>support@softsuit.com</span>
    </div>
  );
};

export default Footer;
