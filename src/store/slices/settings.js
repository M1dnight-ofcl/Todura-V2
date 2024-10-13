import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../modules/lib';
export const settingsslice=createSlice({
  name: 'settings',
  initialState: {
    theme:"default_dark",
  },
  reducers: {
    setTheme:(state,action)=>{
      return {
        ...state,
        theme:action.payload,
      }
    },
  }
});
export const {
  setTheme
}=settingsslice.actions;
export default settingsslice.reducer;
