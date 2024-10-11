import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../modules/lib';
export const todoslice=createSlice({
  name: 'todo',
  initialState: [
    {//template
      title:"Test: Hello, World",
      desc:"Lorem ipsum odor amet, consectetuer adipiscing elit.",
      id:generateId(),
      meta:{
        creationTime: Date.now(),
        checked: false,
      }
    },{//template 2 (for test)
      title:"Test: Hello, World 2",
      desc:"Ipsum ullamco magna mollit quis quis veniam consectetur minim eu dolor reprehenderit consequat eu.",
      id:generateId(),
      meta:{
        creationTime: Date.now(),
        checked: true,
      }
    },{//template 3 (for test)
      title:"Test: Hello, World 3",
      desc:"Consequat cillum irure et laboris laboris amet ut officia aute mollit sit velit.",
      id:generateId(),
      meta:{
        creationTime: Date.now(),
        checked: false,
      }
    },
  ],
  reducers: {
    addTask:(state,action)=>{
      state.push(action.payload);
    },
    removeTask:(state,action)=>{
      console.log(`removing: ${action.payload}`)
      state=state.filter((item)=>item.id!==action.payload);
    },
    modifyState:(state,action)=>{
      state[state.findIndex(data=>data.id==action.payload.target)]=action.payload.new;
    },
  }
});
export const {
    addTask,
    removeTask,
    modifyState,
}=todoslice.actions;
export default todoslice.reducer;
