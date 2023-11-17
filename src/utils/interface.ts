export interface AllElementsObject {
  id?: number | null;
  name: string;
  description: string;
  payRunId: number | null;
  payRunValueId: number | null;
  classificationId: number | null;
  classificationValueId: number | null;
  categoryId: number | null;
  categoryValueId: number | null;
  reportingName: string;
  processingType: string;
  status: string;
  prorate: string;
  effectiveStartDate: string | null;
  effectiveEndDate: string | null;
  selectedMonths: string[];
  payFrequency: string;
  modifiedBy?: string
}

export interface AllEments {
  allElements: AllElementsObject[];
  allElementsStatus: string;
  allElementsError: string;
}

export interface CreateElementSlice {
  message: string;
  createElementStatus: string;
  createElementError: string;
}

export interface GetAnElementSlice {
  element: AllElementsObject;
  elementStatus: string;
  elementError: string;
}

export interface UpdateAnElementSlice {
  message: string;
  updateElementStatus: string;
  updateElementError: string;
}

export interface DeleteElementSlice {
  message: string;
  deleteElementStatus: string;
  deleteElementError: string;
}

export interface AdditionalIfoObject {
  lookupId: number;
  lookupValueId: number;
}

export interface AllElementLinksObject {
  name: string;
  elementId: number;
  suborganizationId: number;
  locationId: number;
  departmentId: number;
  employeeCategoryId: number;
  employeeCategoryValueId: number;
  employeeTypeId: number;
  employeeTypeValueId: number;
  jobTitleId: number;
  grade: number;
  gradeStep: number;
  unionId: number;
  amountType: string;
  amount: number;
  rate: number;
  effectiveStartDate: string;
  effectiveEndDate: string;
  status: string;
  automate: string;
  additionalInfo: AdditionalIfoObject[];
}

export interface AllElementLinks {
  allElementLinks: AllElementLinksObject[];
  allElementLinksStatus: string;
  allElementLinksError: string;
}

export interface AllElementLinksForm {
  name: string;
  elementId?: number;
  suborganizationId?: number;
  locationId?: number;
  departmentId?: number;
  employeeCategoryId?: number;
  employeeCategoryValueId?: number;
  employeeTypeId?: number;
  employeeTypeValueId?: number;
  jobTitleId?: number;
  grade?: number;
  gradeStep?: number;
  unionId?: number;
  amountType: string;
  amount: number;
  rate: number;
  effectiveStartDate?: string;
  effectiveEndDate?: string;
  status?: string;
  automate?: string;
  additionalInfo?: AdditionalIfoObject[];
}

export interface CreateElementLinkSlice {
  message: string;
  createElementLinkStatus: string;
  createElementLinkError: string;
}

export interface GetAnElementLinkSlice {
  elementLink: AllElementLinksObject[];
  elementLinkStatus: string;
  elementLinkError: string;
}

export interface UpdateAnElementLinkSlice {
  message: string;
  updateElementLinkStatus: string;
  updateElementLinkError: string;
}

export interface DeleteElementLinkSlice {
  message: string;
  deleteElementLinkStatus: string;
  deleteElementLinkError: string;
}

export interface LookupsObject {
  createdAt: string;
  name: string;
  description: string;
  type: string;
  id: string;
}

export interface GetLookupsSlice {
  data: LookupsObject[];
  message: string;
  lookupsStatus: string;
  lookupsError: string;
}

export interface GetLookupByIdSlice {
  lookup: LookupsObject;
  message: string;
  getLookupByIdStatus: string;
  getLookupByIdError: string;
}

export interface LookupValueObject {
  id: number;
  name: string;
  description: string;
  status: string;
  lookupId: string;
  lookupName: string;
  createdAt: string;
}

export interface GetLookupValuesSlice {
  lookupValues: LookupValueObject[];
  lookupValuesStatus: string;
  lookupValuesError: string;
}

export interface LookupValueByIdObject {
  id: number | null;
  name: string;
  description: string;
  status: string;
  lookupId: string;
  lookupName: string;
  createdAt: string;
}

export interface GetLookupValuesByIdSlice {
  data: LookupValueByIdObject;
  getLookupValuesByIdStatus: string;
  getLookupValuesByIdError: string;
}

export interface SuborganizationObject {
  createdAt: string;
  name: string;
  note: string;
  id: number | null;
}

export interface SuborganizationsSlice {
  data: SuborganizationObject[];
  subOrganizationsStatus: string;
  subOrganizationsError: string;
}

export interface GetSuborganizationByIdSlice {
  data: SuborganizationObject;
  getSuborganizationByIdStatus: string;
  getSuborganizationByIdError: string;
}

export interface DepartmentObject {
  createdAt: string;
  name: string;
  note: string;
  id: number | null;
  suborganizationId: number | null;
}

export interface DepartmentsSlice {
  data: DepartmentObject[];
  departmentsStatus: string;
  departmentsError: string;
  message: string;
}

export interface DepartmentByIdSlice {
  data: DepartmentObject;
  departmentByIdStatus: string;
  departmentByIdError: string;
  message: string;
}

export interface GradeObject {
  createdAt: string;
  name: string;
  description: string;
  id: number | null;
}

export interface GradesSlice {
  data: GradeObject[];
  gradesStatus: string;
  gradesError: string;
  message: string;
}

export interface GetGradeByIdSlice {
  data: GradeObject;
  getGradeByIdStatus: string;
  getGradeByIdError: string;
  message: string;
}

export interface GetGradeStepObject {
  createdAt: string;
  name: string;
  amount: number | null;
  description: string;
  id: number | null;
  gradeId: number | null;
}

export interface GetGradeStepsSice {
  data: GetGradeStepObject[];
  getGradeStepsStatus: string
  getGradeStepsError: string
  message: string
}

export interface GetGradeStepByIdSlice {
  data: GetGradeStepObject
  getGradeStepByIdStatus: string
  getGradeStepByIdError: string
  message: string
}
