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
      desc:`Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl ante adipiscing taciti sagittis vivamus suscipit metus placerat. Vitae mattis aliquam curae placerat phasellus luctus mi orci. Fringilla sem augue velit proin integer. Integer vel penatibus montes hendrerit libero mattis enim viverra. Mollis urna nam phasellus nibh sollicitudin. Odio maecenas volutpat aliquet eleifend hac curae. Dis inceptos per tristique vitae tempor turpis efficitur.\n
Cursus tellus tristique morbi pulvinar nibh commodo ullamcorper. Adipiscing imperdiet euismod suscipit eget neque gravida. Habitant nascetur ante bibendum nostra laoreet justo. Tortor bibendum ad suscipit viverra egestas varius maecenas convallis inceptos. Euismod finibus potenti aliquet; condimentum lobortis fringilla vestibulum. Consectetur nisl blandit elementum faucibus enim imperdiet. Quam est luctus scelerisque egestas rhoncus gravida. At pharetra maecenas sodales curae ad massa tempor scelerisque. Aliquet quam eget lobortis lacus dapibus. Elementum dignissim euismod ante euismod sed sociosqu molestie netus.\n
Vitae ultricies vivamus purus ornare tellus id ridiculus cras fermentum. Eleifend quisque viverra erat maximus ullamcorper. Phasellus pellentesque tortor in rhoncus orci sapien. Venenatis primis ipsum cubilia nisl varius auctor eleifend ante quam. In magnis mauris augue penatibus ultricies id nulla sociosqu? Gravida ornare viverra vivamus etiam est fusce. Vehicula pellentesque ultrices class lobortis sollicitudin dolor sit dapibus.\n
Ad senectus inceptos consequat; ridiculus praesent curae pellentesque phasellus. Feugiat rhoncus nullam nostra maecenas metus auctor eget facilisis. Sollicitudin egestas congue parturient class eleifend neque maximus aliquam nulla. Justo felis adipiscing, laoreet fames metus auctor augue tempus. Lobortis tempus hac imperdiet tempor platea. Amet sodales nunc consequat venenatis accumsan faucibus laoreet dictum. Vehicula himenaeos metus donec libero est phasellus.\n
Fusce nisi curabitur laoreet per torquent lobortis. Eget ut hac eleifend cras vehicula metus senectus ridiculus cras. Felis cursus eleifend nisi netus odio praesent maximus suspendisse. Quis a parturient inceptos, sociosqu blandit erat. Neque vel torquent cras netus per. At augue penatibus natoque felis ipsum amet tristique mauris. Nisl sed porta ornare praesent efficitur. Maximus habitasse eu mattis velit magnis turpis ut. Eleifend nec ullamcorper neque justo ullamcorper, nisi nostra imperdiet massa.`,
      id:generateId(),
      meta:{
        creationTime: Date.now(),
        checked: false,
      }
    },
  ],
  reducers: {
    addTask:(state,action)=>{
      //! old code. isnt very proper redux
      // state.push(action.payload);
      return [...state,action.payload]
    },
    removeTask:(state,action)=>{
      console.log(`removing: ${action.payload}`);
      return state.filter((item)=>item.id!==action.payload);
    },
    modifyState:(state,action)=>{
      //! old code. this is not proper redux ettiquite (i cant spell etiquette)
      // state[state.findIndex(data=>data.id==action.payload.target)]=action.payload.new;
      return state.map((data)=>(data.id==action.payload.target)?action.payload.new:data);
    },
  }
});
export const {
    addTask,
    removeTask,
    modifyState,
}=todoslice.actions;
export default todoslice.reducer;
