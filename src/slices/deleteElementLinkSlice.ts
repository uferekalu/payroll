import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import { DeleteElementLinkSlice } from '../utils/interface';

const initialState: DeleteElementLinkSlice = {
  message: '',
  deleteElementLinkStatus: '',
  deleteElementLinkError: '',
};

export const deleteElementLink = createAsyncThunk<
  string,
  { elementId: number; id: number },
  { rejectValue: any }
>('elementlink/deleteElementLink', async ({ elementId, id }, thunkAPI) => {
  try {
    await axios.delete(`${baseUrl}/elements/${elementId}/elementlinks/${id}`);
    return 'Element Link has been deleted successfully';
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const deleteElementLinkSlice = createSlice({
  name: 'elementlink',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteElementLink.pending, (state, action) => {
      return {
        ...state,
        deleteElementLinkStatus: 'pending',
      };
    });
    builder.addCase(deleteElementLink.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          deleteElementLinkStatus: 'success',
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(deleteElementLink.rejected, (state, action: any) => {
      return {
        ...state,
        deleteElementLinkStatus: 'rejected',
        deleteElementLinkError: action.payload,
      };
    });
  },
});

export default deleteElementLinkSlice.reducer;
