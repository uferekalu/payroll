import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { AllElementsObject, GetAnElementSlice } from '../utils/interface';

const initialState: GetAnElementSlice = {
  element: {
    name: '',
    description: '',
    payRunId: null,
    payRunValueId: null,
    classificationId: null,
    classificationValueId: null,
    categoryId: null,
    categoryValueId: null,
    reportingName: '',
    processingType: '',
    status: '',
    prorate: '',
    effectiveStartDate: '',
    effectiveEndDate: '',
    selectedMonths: [],
    payFrequency: '',
  },
  elementStatus: '',
  elementError: '',
};

export const getAnElement = createAsyncThunk<
  AllElementsObject,
  { rejectValue: any }
>('element/getAnElement', async (elementId, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/elements/${elementId}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getAnElementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnElement.pending, (state, action) => {
      return {
        ...state,
        elementStatus: 'pending',
      };
    });
    builder.addCase(getAnElement.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          elementStatus: 'success',
          element: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getAnElement.rejected, (state, action: any) => {
      return {
        ...state,
        elementStatus: 'rejected',
        elementError: action.payload.error,
      };
    });
  },
});
export default getAnElementSlice.reducer;
