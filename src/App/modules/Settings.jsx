//react
import { useSelector, useDispatch } from 'react-redux';
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faInfoCircle,
    faClockRotateLeft,
    faHouse,
    faInfo,
    faPaintBrush,
    faScrewdriverWrench,
    faHeart
} from '@fortawesome/free-solid-svg-icons';
//redux
import { setTheme, setAdvancedSettings } from '../../store/slices/settings';
import React, { useEffect, useState, useRef } from 'react';
//helmet
import { Helmet } from 'react-helmet-async';
//css
import "./assets/style/settings.css";
//lib
import { generateId, releaseData } from '../../modules/lib';
//external modules
import { toast } from 'react-toastify';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
export const SettingsTab=({})=>{
    const todo=useSelector(state=>state.todo);
    const settings=useSelector(state=>state.settings);
    const dispatch=useDispatch();
    const saveStatusToastId=React.useRef(null);
    return(<><pre>
        <div id="settingsWrapper">
            <div id="settingsSidebar">
                <h1>Settings</h1>
                <button 
                    id="settingsSidebar_general"
                    onClick={(e)=>{
                        e.preventDefault();
                        document.getElementById("settingsheader_general").scrollIntoView({ 
                            behavior:"smooth", 
                            block:"start", 
                            inline:"nearest",
                        });
                    }}><FontAwesomeIcon className='i' icon={faHouse}/> General</button>
                <button 
                    id="settingsSidebar_appearance"
                    onClick={(e)=>{
                        e.preventDefault();
                        document.getElementById("settingsheader_appearance").scrollIntoView({ 
                            behavior:"smooth", 
                            block:"start", 
                            inline:"nearest",
                        });
                    }}><FontAwesomeIcon className='i' icon={faPaintBrush}/> Appearance</button>
                {settings.advanced_settings?<>
                    <button 
                        id="settingsSidebar_advancedsettings"
                        onClick={(e)=>{
                            e.preventDefault();
                            document.getElementById("settingsheader_advancedsettings").scrollIntoView({ 
                                behavior:"smooth", 
                                block:"start", 
                                inline:"nearest",
                            });
                        }}><FontAwesomeIcon className='i' icon={faScrewdriverWrench}/> Advanced</button>
                </>:null}
                {window.toduraApi?toduraApi.desktop?<button 
                    id="settingsSidebar_backup"
                    onClick={(e)=>{
                        e.preventDefault();
                        document.getElementById("settingsheader_backup").scrollIntoView({ 
                            behavior:"smooth", 
                            block:"start", 
                            inline:"nearest",
                        });
                    }}><FontAwesomeIcon className='i' icon={faClockRotateLeft}/> Backup</button>
                        :null:null}
                <button 
                    id="settingsSidebar_info"
                    onClick={(e)=>{
                        e.preventDefault();
                        document.getElementById("settingsheader_info").scrollIntoView({ 
                            behavior:"smooth", 
                            block:"start", 
                            inline:"nearest",
                        });
                    }}><FontAwesomeIcon className='i' icon={faInfoCircle}/> Info</button>
            </div>
            <div id="settingsContent" onScroll={(e)=>{
                document.getElementById("taskScrollShadeTop").style.opacity=
                    (e.target.scrollTop>0)?"1":"0";
                document.getElementById("taskScrollShade").style.opacity=
                    (Math.abs(e.target.scrollHeight-e.target.scrollTop-e.target.clientHeight)<1)?
                        "0":"1";
            }}>
                <h2 id="settingsheader_general">General</h2>
                <label htmlFor="settings_advancedsettings" className='label_checkbox'>Advanced Settings&nbsp;
                    <label className="checkmarkContainer">
                        <input type="checkbox" onClick={(e)=>{dispatch(setAdvancedSettings(e.target.checked));}}/>
                        <span className="checkmark"></span>
                    </label></label>
                <h2 id="settingsheader_appearance">Appearance</h2>
                <label htmlFor="settings_theme">Themes<br/><select id="settings_theme" onClick={(e)=>{
                    dispatch(setTheme(e.target.value));}} defaultValue={settings.theme}>
                    <option value="default_dark">Default Dark</option>
                    <option value="default_light">Default Light</option>
                </select></label>
                {settings.advanced_settings?<>
                    <br/><h2 id="settingsheader_advancedsettings">Advanced</h2>
                    
                </>:null}
                <br/><h2 id="settingsheader_backup">Backup</h2>
                {window.toduraApi?toduraApi.desktop?<button onClick={(e)=>{
                    e.preventDefault();
                    saveStatusToastId.current=toast("Saving to File...",{autoClose:false});
                    let saveObj={todo,settings,saveId:generateId(10).replaceAll("==","")}
                    setTimeout(()=>toduraApi.saveToFile(saveObj),200);
                    toast.update(saveStatusToastId.current,{render:"Saved File to 'Downloads'",autoClose:5000})
                }}>Save to File</button>:null:null}
                <br/><h2 id="settingsheader_info">Info</h2>
                <label>Current Version: {releaseData.v}</label>
                <h3>Changelog</h3>
                <ul>
                    {releaseData.changelog.map((data,index)=><li key={index}>{data}</li>)}
                </ul>
                <label>M1dnight <FontAwesomeIcon icon={faCopyright} /> 2024-Current</label>
                <label>Made with <FontAwesomeIcon icon={faHeart} /> in nj</label>
                <br/><br/>
            </div>
            <div id="taskScrollShade"></div>
            <div id="taskScrollShadeTop"></div>
        </div>
    </pre></>);
}
