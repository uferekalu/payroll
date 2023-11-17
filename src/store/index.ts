import { configureStore } from '@reduxjs/toolkit';
import allElementsReducer from '../slices/getElementsSlice';
import createElementReducer from '../slices/createElementSlice';
import getElementReducer from '../slices/getAnElementSlice';
import updateElementReducer from '../slices/editElementSlice';
import deleteElementReducer from '../slices/deleteAnElementSlice';
import allElementLinksReducer from '../slices/getElementLinksSlice';
import createElementLinkReducer from '../slices/createElementLinkSlice';
import getElementLinkReducer from '../slices/getAnElementLinkSlice';
import updateElementLinkReducer from '../slices/editElementLinkSlice';
import deleteElementLinkReducer from '../slices/deleteElementLinkSlice';
import allLookupsReducer from '../slices/getLookupsSlice';
import getLookupByIdReducer from '../slices/getLookupByIdSlice';
import getLookupValuesReducer from '../slices/getLookupValuesSlice';
import getLookupValueByIdReducer from '../slices/getLookupValueByIdSlice';
import allSuborganizationsReducer from '../slices/getSuborganizationsSlice';
import getSuborganizationByIdReducer from '../slices/getSuborganizationByIdSlice';
import departmentsReducer from '../slices/departmentsSlice';
import getDepartmentByIdReducer from '../slices/getDepartmentByIdSlice';
import gradesReducer from '../slices/gradesSlice';
import getGradeByIdReducer from '../slices/getGradeByIdSlice';
import getGradeStepsReducer from '../slices/getGradeStepsSlice';
import getGradeStepByIdReducer from '../slices/getGradeStepByIdSlice';

const store = configureStore({
  reducer: {
    allElements: allElementsReducer,
    createElement: createElementReducer,
    getAnElement: getElementReducer,
    updateAnElement: updateElementReducer,
    deleteAnElement: deleteElementReducer,
    allElementLinks: allElementLinksReducer,
    createElementLink: createElementLinkReducer,
    getElementLink: getElementLinkReducer,
    updateElementLink: updateElementLinkReducer,
    deleteElementLink: deleteElementLinkReducer,
    allLookups: allLookupsReducer,
    getLookupById: getLookupByIdReducer,
    getLookupValues: getLookupValuesReducer,
    getLookupValueById: getLookupValueByIdReducer,
    allSuborganizations: allSuborganizationsReducer,
    getSuborganizationById: getSuborganizationByIdReducer,
    departments: departmentsReducer,
    getDepartmentById: getDepartmentByIdReducer,
    grades: gradesReducer,
    getGradeById: getGradeByIdReducer,
    getGradeSteps: getGradeStepsReducer,
    getGradeStepById: getGradeStepByIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
