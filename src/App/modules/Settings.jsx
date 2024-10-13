import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../store/slices/settings';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import "./assets/style/settings.css";
export const SettingsTab=({})=>{
    const settings=useSelector(state=>state.settings);
    const dispatch=useDispatch();
    useEffect(()=>{
        // document.getElementById("settings").click();
        Object.keys(settings).map((skey,index)=>{
            switch(skey){
                case "theme":break;
                default:console.error(`unknowng settings key: ${skey} (value: ${settings[skey]})`);
            }
        });
    },[settings]);
    return(<><pre>
        <div id="settingsWrapper">
            <h1>Settings</h1>
            <h2>Appearance</h2>
            <label htmlFor="settings_theme">Options: <select id="settings_theme" onClick={(e)=>{
                dispatch(setTheme(e.target.value));}} defaultValue={settings.theme}>
                <option value="default_dark">Default Dark</option>
                <option value="default_light">Default Light</option>
            </select></label>
        </div>
    </pre></>);
}
