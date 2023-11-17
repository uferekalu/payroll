import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import {
  AllElementLinksObject,
  GetAnElementLinkSlice,
} from '../utils/interface';

const initialState: GetAnElementLinkSlice = {
  elementLink: [],
  elementLinkStatus: '',
  elementLinkError: '',
};

export const getAnElementLink = createAsyncThunk<
  AllElementLinksObject,
  { elementId: number; id: number; rejectValue: any }
>('elementlink/getAnElementLink', async ({ elementId, id }, thunkAPI) => {
  try {
    const response = await axios.get(
      `${baseUrl}/elements/${elementId}/elementlinks/${id}`,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getAnElementLinkSlice = createSlice({
  name: 'elementlink',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnElementLink.pending, (state, action) => {
      return {
        ...state,
        elementLinkStatus: 'pending',
      };
    });
    builder.addCase(getAnElementLink.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          elementLinkStatus: 'success',
          elementLink: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getAnElementLink.rejected, (state, action: any) => {
      return {
        ...state,
        elementLinkStatus: 'rejected',
        elementLinkError: action.payload.error,
      };
    });
  },
});
export default getAnElementLinkSlice.reducer;
