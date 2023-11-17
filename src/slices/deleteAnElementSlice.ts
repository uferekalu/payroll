import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { DeleteElementSlice } from '../utils/interface';

const initialState: DeleteElementSlice = {
  message: "",
  deleteElementStatus: "",
  deleteElementError: ""
}

export const deleteElement = createAsyncThunk<
  string,
  { id: number },
  { rejectValue: any }
>('element/deleteElement', async ({ id }, thunkAPI) => {
  try {
    await axios.delete(`${baseUrl}/elements/${id}`);
    return 'Element has been deleted successfully';
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const deleteElementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteElement.pending, (state, action) => {
      return {
        ...state,
        deleteElementStatus: 'pending',
      };
    });
    builder.addCase(deleteElement.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          deleteElementStatus: 'success',
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(deleteElement.rejected, (state, action: any) => {
      return {
        ...state,
        deleteElementStatus: 'rejected',
        deleteElementError: action.payload,
      };
    });
  },
});

export default deleteElementSlice.reducer;
