import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import {
  SuborganizationObject,
  SuborganizationsSlice,
} from '../utils/interface';

const initialState: SuborganizationsSlice = {
  data: [],
  subOrganizationsStatus: '',
  subOrganizationsError: '',
};

export const allSuborganizations = createAsyncThunk<
  SuborganizationObject[],
  void,
  { rejectValue: any }
>('suborganizations/allSubOrganizations', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/suborganizations`);
    const { data } = response.data;
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getAllSuborganizationsSlice = createSlice({
  name: 'suborganizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allSuborganizations.pending, (state, action) => {
      return {
        ...state,
        subOrganizationsStatus: 'pending',
      };
    });
    builder.addCase(allSuborganizations.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          subOrganizationsStatus: 'success',
          data: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(allSuborganizations.rejected, (state, action: any) => {
      return {
        ...state,
        subOrganizationsStatus: 'rejected',
        subOrganizationsError: action.payload,
      };
    });
  },
});

export default getAllSuborganizationsSlice.reducer;
