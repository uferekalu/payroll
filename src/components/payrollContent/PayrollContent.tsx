import React from 'react';
import classes from './PayrollContent.module.scss';

const payrollContentData = [
  'System Administration',
  'People Management',
  'Payroll Management',
  'System Service',
];

interface IPayroll {
  handleSelectedModule: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  selectedModule: string | null;
}

const PayrollContent: React.FC<IPayroll> = ({
  handleSelectedModule,
  selectedModule,
}) => {
  return (
    <div className={classes.payroll}>
      {payrollContentData.map((data, idx) =>
        selectedModule === data ? (
          <div key={idx}>
            <i
              style={{
                color: 'black',
                marginLeft: '10px',
              }}
              className="bi bi-check-lg"
            ></i>
            <span
              onClick={handleSelectedModule}
              style={{
                marginLeft: '10px',
              }}
              className={classes.payroll__title}
            >
              {selectedModule}
            </span>
            <hr
              style={
                idx === payrollContentData.length - 1
                  ? {
                      display: 'none',
                    }
                  : {
                      display: 'block',
                    }
              }
              className={classes.payroll__hl}
            />
          </div>
        ) : (
          <div key={idx}>
            <span
              className={classes.payroll__title}
              onClick={handleSelectedModule}
            >
              {data}
            </span>
            <hr
              style={
                idx === payrollContentData.length - 1
                  ? {
                      display: 'none',
                    }
                  : {
                      display: 'block',
                    }
              }
              className={classes.payroll__hl}
            />
          </div>
        ),
      )}
    </div>
  );
};

export default PayrollContent;
