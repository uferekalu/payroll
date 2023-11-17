import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import {
  GetLookupValuesByIdSlice,
  LookupValueByIdObject,
} from '../utils/interface';

const initialState: GetLookupValuesByIdSlice = {
  data: {
    id: null,
    name: '',
    description: '',
    status: '',
    lookupId: '',
    lookupName: '',
    createdAt: '',
  },
  getLookupValuesByIdStatus: '',
  getLookupValuesByIdError: '',
};

export const getLookupValueById = createAsyncThunk<
  LookupValueByIdObject,
  { lookupId: number; id: number; rejectValue: any }
>('lookupvalues/getLookupValueById', async ({ lookupId, id }, thunkAPI) => {
  try {
    const response = await axios.get(
      `${baseUrl}/lookups/${lookupId}/lookupvalues/${id}`,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getLookupValueByIdSlice = createSlice({
  name: 'lookupvalues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLookupValueById.pending, (state, action) => {
      return {
        ...state,
        getLookupValuesByIdStatus: 'pending',
      };
    });
    builder.addCase(getLookupValueById.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          getLookupValuesByIdStatus: 'success',
          data: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getLookupValueById.rejected, (state, action: any) => {
      return {
        ...state,
        getLookupValuesByIdStatus: 'rejected',
        getLookupValuesByIdError: action.payload.error,
      };
    });
  },
});
export default getLookupValueByIdSlice.reducer;
