import { createSlice } from '@reduxjs/toolkit';
export const selectedTaskSlice=createSlice({
  name: 'selectedTask',
  initialState: {},
  reducers: {
    setSelectedTask:(state,action)=>{
      console.log(action.payload);
      return action.payload;
    },
  }
});
export const {
  setSelectedTask,
}=selectedTaskSlice.actions;
export default selectedTaskSlice.reducer;
