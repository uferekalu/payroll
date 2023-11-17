import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import {
  AllElementLinksForm,
  CreateElementLinkSlice,
} from '../utils/interface';

const initialState: CreateElementLinkSlice = {
  message: '',
  createElementLinkStatus: '',
  createElementLinkError: '',
};

interface ICreateElementLinkForm extends AllElementLinksForm {}

export const createElementLink = createAsyncThunk<
  string,
  { id: number; data: ICreateElementLinkForm },
  { rejectValue: any }
>('elementlink/createElementLink', async ({ id, data }, thunkAPI) => {
  try {
    const result = await axios.post(`${baseUrl}/elements/${id}/elementlinks`, {
      name: data.name,
      elementId: data.elementId,
      suborganizationId: data.suborganizationId,
      locationId: data.locationId,
      departmentId: data.departmentId,
      employeeCategoryId: data.employeeCategoryId,
      employeeCategoryValueId: data.employeeCategoryValueId,
      employeeTypeId: data.employeeTypeId,
      employeeTypeValueId: data.employeeTypeValueId,
      jobTitleId: data.jobTitleId,
      grade: data.grade,
      gradeStep: data.gradeStep,
      unionId: data.unionId,
      amountType: data.amountType,
      amount: data.amount,
      rate: data.rate,
      effectiveStartDate: data.effectiveStartDate,
      effectiveEndDate: data.effectiveEndDate,
      status: data.status,
      automate: data.automate,
      additionalInfo: data.additionalInfo,
    });
    console.log('created data', result.data);
    return 'Element Link has been created successfully';
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const createElementLinkSlice = createSlice({
  name: 'elementlink',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createElementLink.pending, (state, action) => {
      return {
        ...state,
        createElementLinkStatus: 'pending',
      };
    });
    builder.addCase(createElementLink.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          createElementLinkStatus: 'success',
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(createElementLink.rejected, (state, action: any) => {
      return {
        ...state,
        createElementLinkStatus: 'rejected',
        createElementLinkError: action.payload.error,
      };
    });
  },
});

export default createElementLinkSlice.reducer;
