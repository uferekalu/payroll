import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { DepartmentByIdSlice, DepartmentObject } from '../utils/interface';

const initialState: DepartmentByIdSlice = {
  data: {
    createdAt: '',
    name: '',
    note: '',
    id: null,
    suborganizationId: null,
  },
  departmentByIdStatus: '',
  departmentByIdError: '',
  message: '',
};

export const getDepartmentById = createAsyncThunk<
  DepartmentObject,
  { suborganizationId: number; id: number; rejectValue: any }
>(
  'departments/getDepartmentById',
  async ({ suborganizationId, id }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/suborganizations/${suborganizationId}/departments/${id}`,
      );
      const { data } = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const getDepartmentByIdSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartmentById.pending, (state, action) => {
      return {
        ...state,
        departmentByIdStatus: 'pending',
      };
    });
    builder.addCase(getDepartmentById.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          departmentByIdStatus: 'success',
          data: action.payload,
          message: 'Department has been successfully retrieved.',
        };
      } else {
        return state;
      }
    });
    builder.addCase(getDepartmentById.rejected, (state, action: any) => {
      return {
        ...state,
        departmentByIdStatus: 'rejected',
        departmentByIdError: action.payload.error,
      };
    });
  },
});

export default getDepartmentByIdSlice.reducer;
