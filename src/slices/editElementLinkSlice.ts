import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import {
  AllElementLinksForm,
  UpdateAnElementLinkSlice,
} from '../utils/interface';

const initialState: UpdateAnElementLinkSlice = {
  message: '',
  updateElementLinkStatus: '',
  updateElementLinkError: '',
};

interface IUpdateElemenLinktForm extends AllElementLinksForm {}

export const updateElementLink = createAsyncThunk<
  string,
  { elementId: number; id: number; data: IUpdateElemenLinktForm },
  { rejectValue: any }
>(
  'elementlink/updateElementLink',
  async ({ elementId, id, data }, thunkAPI) => {
    try {
      const result = await axios.put(
        `${baseUrl}/elements/${elementId}/elementlinks/${id}`,
        {
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
        },
      );
      console.log('created data', result.data);
      return 'Element Link has been updated successfully';
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const updateElementLinkSlice = createSlice({
  name: 'elementlink',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateElementLink.pending, (state, action) => {
      return {
        ...state,
        updateElementLinkStatus: 'pending',
      };
    });
    builder.addCase(updateElementLink.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          updateElementLinkStatus: 'success',
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(updateElementLink.rejected, (state, action: any) => {
      return {
        ...state,
        updateElementLinkStatus: 'rejected',
        updateElementLinkError: action.payload,
      };
    });
  },
});

export default updateElementLinkSlice.reducer;
