import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { GetLookupsSlice, LookupsObject } from '../utils/interface';

const initialState: GetLookupsSlice = {
  data: [],
  message: '',
  lookupsStatus: '',
  lookupsError: '',
};

export const allLookups = createAsyncThunk<
  LookupsObject[],
  void,
  { rejectValue: any }
>('lookup/lookups', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/lookups`);
    console.log('all lookups', response.data);
    const { data } = response.data;
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getAllLookupsSlice = createSlice({
  name: 'lookups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allLookups.pending, (state, action) => {
      return {
        ...state,
        lookupsStatus: 'pending',
      };
    });
    builder.addCase(allLookups.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          lookupsStatus: 'success',
          data: action.payload,
          message: 'Lookups have been successfully retrieved.',
        };
      } else {
        return state;
      }
    });
    builder.addCase(allLookups.rejected, (state, action: any) => {
      return {
        ...state,
        lookupsStatus: 'rejected',
        lookupsError: action.payload,
      };
    });
  },
});

export default getAllLookupsSlice.reducer;
