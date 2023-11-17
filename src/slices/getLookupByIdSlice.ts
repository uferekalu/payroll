import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { GetLookupByIdSlice, LookupsObject } from '../utils/interface';

const initialState: GetLookupByIdSlice = {
  lookup: {
    createdAt: '',
    name: '',
    description: '',
    type: '',
    id: '',
  },
  message: '',
  getLookupByIdStatus: '',
  getLookupByIdError: '',
};

export const getLookupById = createAsyncThunk<
  LookupsObject,
  { rejectValue: any }
>('lookup/getLookUpById', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/lookups/${id}`);
    const { data } = response.data;
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getLookupByIdSlice = createSlice({
  name: 'lookup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLookupById.pending, (state, action) => {
      return {
        ...state,
        getLookupByIdStatus: 'pending',
      };
    });
    builder.addCase(getLookupById.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          getLookupByIdStatus: 'success',
          lookup: action.payload,
          message: 'Lookup has been successfully retrieved.',
        };
      } else {
        return state;
      }
    });
    builder.addCase(getLookupById.rejected, (state, action: any) => {
      return {
        ...state,
        getLookupByIdStatus: 'rejected',
        getLookupByIdError: action.payload.error,
      };
    });
  },
});
export default getLookupByIdSlice.reducer;
