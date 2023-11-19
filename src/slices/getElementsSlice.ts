import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { AllEments } from '../utils/interface';

const initialState: AllEments = {
  allElements: [],
  allElementsStatus: '',
  allElementsError: '',
};

export const allElements = createAsyncThunk<
  AllEments[],
  void,
  { rejectValue: any }
>('element/elements', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/elements`);
    return response.data.data.content;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getElementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allElements.pending, (state, action) => {
      return {
        ...state,
        allElementsStatus: 'pending',
      };
    });
    builder.addCase(allElements.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          allElementsStatus: 'success',
          allElements: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(allElements.rejected, (state, action: any) => {
      return {
        ...state,
        allElementsStatus: 'rejected',
        allElementsError: action.payload,
      };
    });
  },
});

export default getElementsSlice.reducer;
