import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import {
  GetSuborganizationByIdSlice,
  SuborganizationObject,
} from '../utils/interface';

const initialState: GetSuborganizationByIdSlice = {
  data: {
    createdAt: '',
    name: '',
    note: '',
    id: null,
  },
  getSuborganizationByIdStatus: '',
  getSuborganizationByIdError: '',
};

export const getSuborganizationById = createAsyncThunk<
  SuborganizationObject,
  { rejectValue: any }
>('suborganizations/getSuborganizationById', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/suborganizations/${id}`);
    const { data } = response.data;
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getSuborganizationByIdSlice = createSlice({
  name: 'suborganizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSuborganizationById.pending, (state, action) => {
      return {
        ...state,
        getSuborganizationByIdStatus: 'pending',
      };
    });
    builder.addCase(getSuborganizationById.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          getSuborganizationByIdStatus: 'success',
          data: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getSuborganizationById.rejected, (state, action: any) => {
      return {
        ...state,
        getSuborganizationByIdStatus: 'rejected',
        getSuborganizationByIdError: action.payload.error,
      };
    });
  },
});
export default getSuborganizationByIdSlice.reducer;
