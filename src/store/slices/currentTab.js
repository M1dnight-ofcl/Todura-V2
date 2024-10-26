import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../modules/lib';
export const tabs={
  home:{id:generateId(),title:"Home",qid:"h"},
  settings:{id:generateId(),title:"Settings",qid:"s"},
};
export const tabslice=createSlice({
  name: 'currentTab',
  initialState: {...tabs.home},
  reducers: {setCurrentTabs:(state,action)=>{return action.payload;},}
});
export const {
  setCurrentTabs,
}=tabslice.actions;
export default tabslice.reducer;
