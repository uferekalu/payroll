import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { AllElementsObject, CreateElementSlice } from '../utils/interface';

const initialState: CreateElementSlice = {
  message: '',
  createElementStatus: '',
  createElementError: '',
};

interface ICreateElementForm extends AllElementsObject {}

export const createElement = createAsyncThunk<
  string,
  { data: ICreateElementForm },
  { rejectValue: any }
>('element/createElement', async ({ data }, thunkAPI) => {
  try {
    const result = await axios.post(`${baseUrl}/elements`, {
      name: data.name,
      description: data.description,
      payRunId: data.payRunId,
      payRunValueId: data.payRunValueId,
      classificationId: data.classificationValueId,
      classificationValueId: data.classificationValueId,
      categoryId: data.categoryId,
      categoryValueId: data.categoryValueId,
      reportingName: data.reportingName,
      processingType: data.processingType,
      status: data.status,
      prorate: data.prorate,
      effectiveStartDate: data.effectiveStartDate,
      effectiveEndDate: data.effectiveEndDate,
      selectedMonths: data.selectedMonths,
      payFrequency: data.payFrequency,
      modifiedBy: data.modifiedBy
    });
    console.log('created data', result.data);
    return 'Element has been created successfully';
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const createElementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createElement.pending, (state, action) => {
      return {
        ...state,
        createElementStatus: 'pending',
      };
    });
    builder.addCase(createElement.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          createElementStatus: 'success',
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(createElement.rejected, (state, action: any) => {
      return {
        ...state,
        createElementStatus: 'rejected',
        createElementError: action.payload.error,
      };
    });
  },
});

export default createElementSlice.reducer;
