import React, { useContext } from 'react';
import classes from './Sidebar.module.scss';
import switchModule from '../../images/switch-module.png';
import arrowDown from '../../images/arrowdown.png';
import salaryIcon from '../../images/salaryicon.png';
import dashboardIcon from '../../images/dasboardicon.png';
import payrollIcon from '../../images/payrollicon.png';
import elementIcon from '../../images/elementicon.png';
import elementArrowDown from '../../images/elementArrowDown.png';
import employeesIcon from '../../images/employeeicon.png';
import payrollSettings from '../../images/payrollsetting.png';
import myaccountIcon from '../../images/account.png';
import logoutIcon from '../../images/logout.png';
import PayrollContent from '../payrollContent/PayrollContent';
import PayrollActivitiesContent from '../payrollActivitiesContent/PayrollActivitiesContent';
import ElementSetupContent from '../elementSetupContent/ElementSetupContent';
import { AppStateContext } from '../AppState';

interface ISidebar {}

const Sidebar: React.FC<ISidebar> = () => {
  const appState = useContext(AppStateContext);
  return (
    <div className={classes.sidebar}>
      <div
        className={classes.sidebar__switch__module}
        onClick={appState?.handleOpenSwitchModule}
      >
        <img
          src={switchModule}
          alt="switch"
          className={classes.sidebar__switch__module__img}
        />
        <div className={classes.sidebar__switch__module__content}>
          <span className={classes.sidebar__switch__module__content__title1}>
            Switch Module
          </span>
          <span className={classes.sidebar__switch__module__content__title2}>
            {appState?.selectedModule}
          </span>
        </div>
        <img
          src={arrowDown}
          alt="arrow"
          className={classes.sidebar__switch__module__img}
        />
      </div>
      {appState?.openSwitchModule && (
        <PayrollContent
          handleSelectedModule={appState?.handleSelectedModule}
          selectedModule={appState?.selectedModule}
        />
      )}
      <div className={classes.sidebar__dashboard}>
        <img
          src={dashboardIcon}
          alt="dashboard icon"
          className={classes.sidebar__dashboard__icon}
        />
        <span className={classes.sidebar__dashboard__title}>Dashboard</span>
      </div>
      <div
        className={
          appState?.payrollActivities
            ? `${classes.sidebar__payroll} ${classes.sidebar__payroll__highlight}`
            : `${classes.sidebar__payroll}`
        }
        onClick={appState?.togglePayrollActivities}
      >
        <img
          src={payrollIcon}
          alt="payroll icon"
          className={classes.sidebar__payroll__icon}
        />
        <span className={classes.sidebar__payroll__title}>
          Payroll Activities
        </span>
        <div></div>
        <img
          src={arrowDown}
          alt="arroe icon"
          className={
            appState?.payrollActivities
              ? `${classes.sidebar__payroll__arrowdown} ${classes.sidebar__payroll__arrowdown__extra}`
              : `${classes.sidebar__payroll__arrowdown}`
          }
        />
      </div>
      {appState?.payrollActivities && (
        <PayrollActivitiesContent
          payrollActivities={appState?.payrollActivities}
        />
      )}
      <div className={classes.sidebar__salary__structure}>
        <img
          src={salaryIcon}
          alt="dashboard icon"
          className={classes.sidebar__salary__structure__icon}
        />
        <div></div>
        <span className={classes.sidebar__salary__structure__title}>
          Salary Structure
        </span>
      </div>
      <div
        className={classes.sidebar__element}
        onClick={appState?.toggleElementSetup}
      >
        <img
          src={elementIcon}
          alt="element icon"
          className={classes.sidebar__element__icon}
        />
        <span className={classes.sidebar__element__title}>Element Setup</span>
        <div></div>
        <img
          src={elementArrowDown}
          alt="arroe icon"
          className={
            appState?.elementSetup
              ? `${classes.sidebar__element__arrow} ${classes.sidebar__element__arrow__extra}`
              : `${classes.sidebar__element__arrow}`
          }
        />
      </div>
      {appState?.elementSetup && <ElementSetupContent />}
      <div className={classes.sidebar__employees}>
        <img
          src={employeesIcon}
          alt="employee icon"
          className={classes.sidebar__employees__icon}
        />
        <div></div>
        <span className={classes.sidebar__employees__title}>Employees</span>
      </div>
      <hr className={classes.sidebar__hl} />
      <div className={classes.sidebar__payroll__settings}>
        <img
          src={payrollSettings}
          alt="payroll setting icon"
          className={classes.sidebar__payroll__settings__icon}
        />
        <span className={classes.sidebar__payroll__settings__title}>
          Payroll Settings
        </span>
        <div></div>
        <img
          src={arrowDown}
          alt="arroe icon"
          className={classes.sidebar__payroll__settings__arrow}
        />
      </div>
      <div className={classes.sidebar__myaccount}>
        <img
          src={myaccountIcon}
          alt="myaccount icon"
          className={classes.sidebar__myaccount__icon}
        />
        <span className={classes.sidebar__myaccount__title}>My Account</span>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={classes.sidebar__logout}>
        <img
          src={logoutIcon}
          alt="myaccount icon"
          className={classes.sidebar__logout__icon}
        />
        <span className={classes.sidebar__logout__title}>My Account</span>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Sidebar;
