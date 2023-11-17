import React from 'react';
import classes from '../Header.module.scss';
import pic from '../../../images/pic.png';

interface IPayrollMg {}

const PayrollMg: React.FC<IPayrollMg> = () => {
  return (
    <div className={classes.header__payroll}>
      <img src={pic} className={classes.header__payroll__pic} alt="pic" />
      <div className={classes.header__payroll_info}>
        <div className={classes.header__payroll_info__name}>Henry Okoro</div>
        <div className={classes.header__payroll_info__position}>Payroll Manager</div>
      </div>
    </div>
  );
};

export default PayrollMg;
