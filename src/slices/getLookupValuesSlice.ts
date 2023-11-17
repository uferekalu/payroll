import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { GetLookupValuesSlice, LookupValueObject } from '../utils/interface';

const initialState: GetLookupValuesSlice = {
  lookupValues: [],
  lookupValuesStatus: '',
  lookupValuesError: '',
};

export const getLookupValues = createAsyncThunk<
  LookupValueObject[],
  number,
  { rejectValue: any }
>('lookupvalues/getLookupValues', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/lookups/${id}/lookupvalues`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getLookupValuesSlice = createSlice({
  name: 'lookupvalues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLookupValues.pending, (state, action) => {
      return {
        ...state,
        lookupValuesStatus: 'pending',
      };
    });
    builder.addCase(getLookupValues.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          lookupValuesStatus: 'success',
          lookupValues: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getLookupValues.rejected, (state, action: any) => {
      return {
        ...state,
        lookupValuesStatus: 'rejected',
        lookupValuesError: action.payload.error,
      };
    });
  },
});
export default getLookupValuesSlice.reducer;
