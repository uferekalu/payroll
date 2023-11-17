import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { GradeObject, GradesSlice } from '../utils/interface';

const initialState: GradesSlice = {
  data: [],
  gradesStatus: '',
  gradesError: '',
  message: '',
};

export const allGrades = createAsyncThunk<
  GradeObject[],
  void,
  { rejectValue: any }
>('grades/grades', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/grade`);
    const { data } = response.data;
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const allGradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allGrades.pending, (state, action) => {
      return {
        ...state,
        gradesStatus: 'pending',
      };
    });
    builder.addCase(allGrades.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          gradesStatus: 'success',
          data: action.payload,
          message: 'Grades have been successfully retrieved.',
        };
      } else {
        return state;
      }
    });
    builder.addCase(allGrades.rejected, (state, action: any) => {
      return {
        ...state,
        gradesStatus: 'rejected',
        gradesError: action.payload.error,
      };
    });
  },
});
export default allGradesSlice.reducer;
