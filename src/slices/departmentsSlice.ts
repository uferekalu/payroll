import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { DepartmentObject, DepartmentsSlice } from '../utils/interface';

const initialState: DepartmentsSlice = {
  data: [],
  departmentsStatus: '',
  departmentsError: '',
  message: '',
};

export const getDepartments = createAsyncThunk<
  DepartmentObject[],
  { rejectValue: any }
>('departments/getDepartments', async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `${baseUrl}/suborganizations/${id}/departments`,
    );
    const { data } = response.data;
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getDepartmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartments.pending, (state, action) => {
      return {
        ...state,
        departmentsStatus: 'pending',
      };
    });
    builder.addCase(getDepartments.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          departmentsStatus: 'success',
          data: action.payload,
          message: 'Departments have been successfully retrieved',
        };
      } else {
        return state;
      }
    });
    builder.addCase(getDepartments.rejected, (state, action: any) => {
      return {
        ...state,
        departmentsStatus: 'rejected',
        departmentsError: action.payload.error,
      };
    });
  },
});
export default getDepartmentSlice.reducer;
