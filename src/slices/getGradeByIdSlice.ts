import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { GetGradeByIdSlice, GradeObject } from '../utils/interface';

const initialState: GetGradeByIdSlice = {
  data: {
    createdAt: '',
    name: '',
    description: '',
    id: null,
  },
  getGradeByIdStatus: '',
  getGradeByIdError: '',
  message: '',
};

export const getGradeById = createAsyncThunk<GradeObject, { rejectValue: any }>(
  'grades/getGradeById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/grade/${id}`);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const getGradeByIdSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGradeById.pending, (state, action) => {
      return {
        ...state,
        getGradeByIdStatus: 'pending',
      };
    });
    builder.addCase(getGradeById.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          getGradeByIdStatus: 'success',
          data: action.payload,
          message: 'Grade has been successfully retrieved.',
        };
      } else {
        return state;
      }
    });
    builder.addCase(getGradeById.rejected, (state, action: any) => {
      return {
        ...state,
        getGradeByIdStatus: 'rejected',
        getGradeByIdError: action.payload.error,
      };
    });
  },
});
export default getGradeByIdSlice.reducer;
