import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { AllElementLinks, AllElementLinksObject } from '../utils/interface';

const initialState: AllElementLinks = {
  allElementLinks: [],
  allElementLinksStatus: "",
  allElementLinksError: ""
} 

export const getAllElementLinks = createAsyncThunk<
  AllElementLinksObject[],
  { rejectValue: any }
>('elementlinks/elementLinks', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/elements/${id}/elementlinks`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getElementLinksSlice = createSlice({
  name: 'elementlinks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllElementLinks.pending, (state, action) => {
      return {
        ...state,
        allElementLinksStatus: 'pending',
      };
    });
    builder.addCase(getAllElementLinks.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          allElementLinksStatus: 'success',
          allElementLinks: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getAllElementLinks.rejected, (state, action: any) => {
      return {
        ...state,
        allElementLinksStatus: 'rejected',
        allElementLinksError: action.payload,
      };
    });
  },
});

export default getElementLinksSlice.reducer;
