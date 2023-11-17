import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { GetGradeStepObject, GetGradeStepsSice } from '../utils/interface';

const initialState: GetGradeStepsSice = {
  data: [],
  getGradeStepsStatus: '',
  getGradeStepsError: '',
  message: '',
};

export const getGradeSteps = createAsyncThunk<
  GetGradeStepObject[],
  { rejectValue: any }
>('grades/getGradeSteps', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/grade/${id}/gradesteps`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getGradeStepsSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGradeSteps.pending, (state, action) => {
      return {
        ...state,
        getGradeStepsStatus: 'pending',
      };
    });
    builder.addCase(getGradeSteps.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          getGradeStepsStatus: 'success',
          data: action.payload.data,
          message: action.payload.message,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getGradeSteps.rejected, (state, action: any) => {
      return {
        ...state,
        getGradeStepsStatus: 'rejected',
        getGradeStepsError: action.payload.error,
      };
    });
  },
});
export default getGradeStepsSlice.reducer;
