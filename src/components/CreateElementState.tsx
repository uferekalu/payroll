import React, { useState } from 'react';

const initialValues = {
  name: '',
  elementCategory: '',
  elementClassification: '',
  payrun: '',
  description: '',
  reportingName: '',
};

const secondStepValues = {
  effectiveStartDate: null,
  effectiveEndDate: null,
  processingType: '',
  payFrequency: '',
  selectedPayMonths: [],
  prorate: '',
  status: false,
};

interface CreateElementStateContextType {
  isCustomModalOpen: boolean;
  setIsCustomModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createElementLinksDetail: boolean;
  setCreateElementLinkDetail: React.Dispatch<React.SetStateAction<boolean>>;
  successModal: boolean;
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  createElement: boolean;
  setCreateElement: React.Dispatch<React.SetStateAction<boolean>>;
  createElementSucces: boolean;
  setCreateElementSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  nextStep: boolean;
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  stepOneFormData: {
    name: string;
    elementCategory: string;
    elementClassification: string;
    payrun: string;
    description: string;
    reportingName: string;
  };
  setStepOneFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      elementCategory: string;
      elementClassification: string;
      payrun: string;
      description: string;
      reportingName: string;
    }>
  >;
  stepTwoFormData: {
    effectiveStartDate: Date | null;
    effectiveEndDate: Date | null;
    processingType: string;
    payFrequency: string;
    selectedPayMonths: string[];
    prorate: string;
    status: boolean;
  };
  setStepTwoFormData: React.Dispatch<
    React.SetStateAction<{
      effectiveStartDate: Date | null;
      effectiveEndDate: Date | null;
      processingType: string;
      payFrequency: string;
      selectedPayMonths: string[];
      prorate: string;
      status: boolean;
    }>
  >;
  lookUpValueIds: {
    payRunValueId: string;
    classificationValueId: string;
    categoryValueId: string;
  };
  setLookUpValueIds: React.Dispatch<
    React.SetStateAction<{
      payRunValueId: string;
      classificationValueId: string;
      categoryValueId: string;
    }>
  >;
  errors: {
    name: string;
    elementCategory: string;
    elementClassification: string;
    payrun: string;
    description: string;
    reportingName: string;
    effectiveStartDate: string;
    effectiveEndDate: string;
    processingType: string;
    payFrequency: string;
    selectedPayMonths: string;
    prorate: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      name: string;
      elementCategory: string;
      elementClassification: string;
      payrun: string;
      description: string;
      reportingName: string;
      effectiveStartDate: string;
      effectiveEndDate: string;
      processingType: string;
      payFrequency: string;
      selectedPayMonths: string;
      prorate: string;
    }>
  >;

  selectedStartDate: Date | null;
  setSelectedStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedEndDate: Date | null;
  setSelectedEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  processingType: string;
  setProcessingType: React.Dispatch<React.SetStateAction<string>>;
  monthlySelectedMonths: string;
  setMonthlySelectedMonths: React.Dispatch<React.SetStateAction<string>>;
  selectedMonths: string[];
  setSelectedMonths: React.Dispatch<React.SetStateAction<string[]>>;
  prorate: string;
  setProrate: React.Dispatch<React.SetStateAction<string>>;
}

const CreateElementStateContext = React.createContext<
  CreateElementStateContextType | undefined
>(undefined);

interface CreateElementProviderProps {
  children: React.ReactNode;
}
const CreateElementStateProvider: React.FC<CreateElementProviderProps> = ({
  children,
}) => {
  const [createElement, setCreateElement] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [createElementLinksDetail, setCreateElementLinkDetail] =
    useState<boolean>(false);
  const [createElementSucces, setCreateElementSuccess] =
    useState<boolean>(false);
  const [stepOneFormData, setStepOneFormData] = useState<{
    name: string;
    elementCategory: string;
    elementClassification: string;
    payrun: string;
    description: string;
    reportingName: string;
  }>(initialValues);
  const [stepTwoFormData, setStepTwoFormData] = useState<{
    effectiveStartDate: Date | null;
    effectiveEndDate: Date | null;
    processingType: string;
    payFrequency: string;
    selectedPayMonths: string[];
    prorate: string;
    status: boolean;
  }>(secondStepValues);

  const [lookUpValueIds, setLookUpValueIds] = useState({
    payRunValueId: '',
    classificationValueId: '',
    categoryValueId: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    elementCategory: '',
    elementClassification: '',
    payrun: '',
    description: '',
    reportingName: '',
    effectiveStartDate: '',
    effectiveEndDate: '',
    processingType: '',
    payFrequency: '',
    selectedPayMonths: '',
    prorate: '',
  });

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [processingType, setProcessingType] = useState<string>('');
  const [monthlySelectedMonths, setMonthlySelectedMonths] =
    useState<string>('');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [prorate, setProrate] = useState<string>('');

  return (
    <CreateElementStateContext.Provider
      value={{
        createElement,
        setCreateElement,
        createElementSucces,
        setCreateElementSuccess,
        stepOneFormData,
        setStepOneFormData,
        stepTwoFormData,
        setStepTwoFormData,
        lookUpValueIds,
        setLookUpValueIds,
        errors,
        setErrors,
        selectedStartDate,
        setSelectedStartDate,
        selectedEndDate,
        setSelectedEndDate,
        processingType,
        setProcessingType,
        monthlySelectedMonths,
        setMonthlySelectedMonths,
        selectedMonths,
        setSelectedMonths,
        prorate,
        setProrate,
        nextStep,
        setNextStep,
        successModal,
        setSuccessModal,
        createElementLinksDetail,
        setCreateElementLinkDetail,
        isCustomModalOpen,
        setIsCustomModalOpen,
      }}
    >
      {children}
    </CreateElementStateContext.Provider>
  );
};

export { CreateElementStateContext, CreateElementStateProvider };
