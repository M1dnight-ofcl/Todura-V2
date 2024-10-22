import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../modules/lib';
export const settingsslice=createSlice({
  name: 'settings',
  initialState: {
    theme:"default_dark",
    advanced_settings:false,
  },
  reducers: {
    setTheme:(state,action)=>{
      return {
        ...state,
        theme:action.payload,
      }
    },
    setAdvancedSettings:(state,action)=>{
      return {
        ...state,
        advanced_settings:action.payload,
      }
    },
  }
});
export const {
  setTheme,
  setAdvancedSettings,
}=settingsslice.actions;
export default settingsslice.reducer;
