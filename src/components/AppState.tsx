import React, { useState } from 'react';

interface AppStateContextType {
  openSwitchModule: boolean;
  selectedModule: string | null;
  payrollActivities: boolean;
  elementSetup: boolean;
  toggleElementSetup: () => void;
  togglePayrollActivities: () => void;
  handleSelectedModule: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleOpenSwitchModule: () => void;
}

const AppStateContext = React.createContext<AppStateContextType | undefined>(undefined);

interface AppStateProviderProps {
  children: React.ReactNode;
}

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [openSwitchModule, setOpenSwitchModule] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<string | null>('Payroll Management');
  const [payrollActivities, setPayrollActivities] = useState<boolean>(false);
  const [elementSetup, setElementSetup] = useState<boolean>(true);

  const toggleElementSetup = () => {
    setElementSetup((prevState) => !prevState);
  };

  const togglePayrollActivities = () => {
    setPayrollActivities((prevState) => !prevState);
  };

  const handleSelectedModule = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const textContent = e.currentTarget.textContent;
    setSelectedModule(textContent);
  };

  const handleOpenSwitchModule = () => {
    setOpenSwitchModule((prevState) => !prevState);
  };

  return (
    <AppStateContext.Provider
      value={{
        openSwitchModule,
        selectedModule,
        payrollActivities,
        elementSetup,
        toggleElementSetup,
        togglePayrollActivities,
        handleSelectedModule,
        handleOpenSwitchModule,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };