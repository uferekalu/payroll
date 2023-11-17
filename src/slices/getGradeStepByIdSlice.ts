import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { GetGradeStepByIdSlice, GetGradeStepObject } from '../utils/interface';

const initialState: GetGradeStepByIdSlice = {
  data: {
    createdAt: '',
    name: '',
    amount: null,
    description: '',
    id: null,
    gradeId: null,
  },
  getGradeStepByIdStatus: '',
  getGradeStepByIdError: '',
  message: '',
};

export const getGradeStepById = createAsyncThunk<
  GetGradeStepObject,
  { gradeId: number; id: number; rejectValue: any }
>('grades/getGradeStepById', async ({ gradeId, id }, thunkAPI) => {
  try {
    const response = await axios.get(
      `${baseUrl}/grade/${gradeId}/gradesteps/${id}`,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getGradeStepByIdSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGradeStepById.pending, (state, action) => {
      return {
        ...state,
        getGradeStepByIdStatus: 'pending',
      };
    });
    builder.addCase(getGradeStepById.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          getGradeStepByIdStatus: 'success',
          data: action.payload.data,
          message: action.payload.message,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getGradeStepById.rejected, (state, action: any) => {
      return {
        ...state,
        getGradeStepByIdStatus: 'rejected',
        getGradeStepByIdError: action.payload.error,
      };
    });
  },
});
export default getGradeStepByIdSlice.reducer;
