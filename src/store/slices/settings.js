import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../modules/lib';
import { GetCssVar } from '../../modules/lib';
export const settingsslice=createSlice({
  name: 'settings',
  initialState: {
    theme:"default_dark",
    advanced_settings:false,
    customCssVar:{
      "--bg1":{title:"Primary Background",value:GetCssVar("--bg1"),type:"color"},
      "--bg2":{title:"Secondary Background",value:GetCssVar("--bg2"),type:"color"},
      "--bg3":{title:"Dark Background",value:GetCssVar("--bg3"),type:"color"},
      "--bg4":{title:"Darkest Background",value:GetCssVar("--bg4"),type:"color"},
      "--bg5":{title:"Darker Background",value:GetCssVar("--bg5"),type:"color"},
      "--ui1":{title:"Primary UI Background",value:GetCssVar("--ui1"),type:"color"},
      "--ui2":{title:"Secondary UI Background",value:GetCssVar("--ui2"),type:"color"},
      "--ui3":{title:"Middle UI Background",value:GetCssVar("--ui3"),type:"color"},
      "--ui4":{title:"Light UI Color",value:GetCssVar("--ui4"),type:"color"},
      "--ui5":{title:"Lighter UI Color",value:GetCssVar("--ui5"),type:"color"},
      "--h1":{title:"Header 1 Color",value:GetCssVar("--h1"),type:"color"},
      "--h2":{title:"Header 2 Color",value:GetCssVar("--h2"),type:"color"},
      "--p1":{title:"Paragraph 1 Color",value:GetCssVar("--p1"),type:"color"},
      "--p2":{title:"Paragraph 2 Color",value:GetCssVar("--p2"),type:"color"},
      "--p3":{title:"Paragraph 3 Color",value:GetCssVar("--p3"),type:"color"},
      "--sbicons":{title:"Sidebar Icons Color",value:GetCssVar("--sbicons"),type:"color"},
      "--disabled":{title:"Disabled Color",value:GetCssVar("--disabled"),type:"color"},
      "--navbar":{title:"Navbar Background",value:GetCssVar("--navbar"),type:"color"},
      "--active":{title:"Active Color",value:GetCssVar("--active"),type:"color"},
      "--border-rad":{title:"Border Radius",value:GetCssVar("--border-rad"),type:"text"},
      "--font":{title:"Font",value:GetCssVar("--font"),type:"text"},
      "--font-monospace":{title:"Monospace Font",value:GetCssVar("--font-monospace"),type:"text"},
      "--outline":{title:"Outline Color",value:GetCssVar("--outline"),type:"color"},
      "--outline-active":{title:"Active Outline Color",value:GetCssVar("--outline-active"),type:"color"},
      "--clr0":{title:"White Task Color",value:GetCssVar("--clr0"),type:"color"},
      "--clr1":{title:"Red Task Color",value:GetCssVar("--clr1"),type:"color"},
      "--clr2":{title:"Orange Task Color",value:GetCssVar("--clr2"),type:"color"},
      "--clr3":{title:"Yellow Task Color",value:GetCssVar("--clr3"),type:"color"},
      "--clr4":{title:"Green Task Color",value:GetCssVar("--clr4"),type:"color"},
      "--clr5":{title:"Blue Task Color",value:GetCssVar("--clr5"),type:"color"},
      "--clr6":{title:"Purple Task Color",value:GetCssVar("--clr6"),type:"color"},
      "--clr7":{title:"Pink Task Color",value:GetCssVar("--clr7"),type:"color"},
      "--color-scheme":{title:"Color Scheme",value:GetCssVar("--color-scheme"),type:"text"},
    },
  },
  reducers: {
    setTheme:(state,action)=>{
      return {
        ...state,
        theme:action.payload,
      }
    },
    setCustomCssVar:(state,action)=>{
      return {
        ...state,
        customCssVar:{
          ...state.customCssVar,
          [action.payload.name]:{
            ...state.customCssVar[action.payload.name],
            value:action.payload.new,
          },
        }
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
  setCustomCssVar,
}=settingsslice.actions;
export default settingsslice.reducer;
