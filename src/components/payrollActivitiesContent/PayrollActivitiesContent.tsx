import React from 'react';
import classes from './PayrollActivitiesContent.module.scss';

const payrollActivitiesData = [
  'Payroll Run',
  'Payroll Reversal',
  'Payroll History',
  'Payroll Lock',
  'Enable Payslip',
  'Payroll Log',
  'Payroll Approval',
];

interface IPayrollAct {
  payrollActivities: boolean;
}

const PayrollActivitiesContent: React.FC<IPayrollAct> = ({
  payrollActivities,
}) => {
  return (
    <div className={classes.payroll_activities}>
      {payrollActivitiesData.map((payroll, idx) => (
        <span
          className={
            payrollActivities
              ? `${classes.payroll_activities__content}
        ${classes.payroll_activities__content__extra}`
              : `${classes.payroll_activities__content}`
          }
          key={idx}
        >
          {payroll}
        </span>
      ))}
    </div>
  );
};

export default PayrollActivitiesContent;
