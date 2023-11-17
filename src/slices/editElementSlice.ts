import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { AllElementsObject, UpdateAnElementSlice } from '../utils/interface';

const initialState: UpdateAnElementSlice = {
  message: '',
  updateElementStatus: '',
  updateElementError: '',
};

interface IUpdateElementForm extends AllElementsObject {}

export const updateElement = createAsyncThunk<
  string,
  { id: number; data: IUpdateElementForm },
  { rejectValue: any }
>('element/updateElement', async ({ id, data }, thunkAPI) => {
  try {
    const result = await axios.put(`${baseUrl}/elements/${id}`, {
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
    });
    console.log('created data', result.data);
    return 'Element has been updated successfully';
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const updateElementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateElement.pending, (state, action) => {
      return {
        ...state,
        updateElementStatus: 'pending',
      };
    });
    builder.addCase(updateElement.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          updateElementStatus: 'success',
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(updateElement.rejected, (state, action: any) => {
      return {
        ...state,
        updateElementStatus: 'rejected',
        updateElementError: action.payload,
      };
    });
  },
});

export default updateElementSlice.reducer;
