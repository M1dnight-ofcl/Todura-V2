//react
import React, { useEffect, useState, useRef } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { 
    setTheme, 
    setAdvancedSettings, 
    setCustomCssVar 
} from '../../store/slices/settings';
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
//helmet
import { Helmet } from 'react-helmet-async';
//css
import "./assets/style/settings.css";
//lib
import { generateId, GetCssVar, releaseData } from '../../modules/lib';
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
                    <span className="tooltip">This is some advanced settings, like theme variables and experimental features.</span>
                    <label className="checkmarkContainer">
                        <input 
                            type="checkbox" 
                            defaultChecked={settings.advanced_settings}
                            onChange={(e)=>{dispatch(setAdvancedSettings(e.target.checked));}}/>
                        <span className="checkmark"></span>
                    </label></label>
                <h2 id="settingsheader_appearance">Appearance</h2>
                <label htmlFor="settings_theme">Themes<br/>
                    {/* <span className="tooltip">These are our inbuilt themes. Custom themes and setting custom theme variables can be found in advanced settings </span> */}
                    <select id="settings_theme" onClick={(e)=>{
                        dispatch(setTheme(e.target.value));}} defaultValue={settings.theme}>
                        <option value="default_dark">Default Dark</option>
                        <option value="default_light">Default Light</option>
                        <option value="sharp_dark">Sharp Dark</option>
                        <option value="sharp_light">Sharp Light</option>
                    </select></label>
                {settings.advanced_settings?<>
                    <br/><h2 id="settingsheader_advancedsettings">Advanced</h2>
                    {/* <p className='caption'>
                        Nothing yet... (tried custom css vars but OH. MY. GOD. (I hate js sometimes))
                    </p> */}
                    <div className="experimental_settingswrapper">
                        <h3>Custom Theme Variables</h3>
                            {Object.keys(settings.customCssVar)
                            .map((cssvar,index)=>
                                settings.customCssVar[cssvar].type=="color"?
                                    <React.Fragment key={generateId(10)}>
                                        {/* <form id={`${cssvar}_form`}/> */}
                                            <label className='clrinput' htmlFor={`${cssvar.slice(2)}_tvs`}>{settings.customCssVar[cssvar].title} &nbsp;
                                                <code>{cssvar}
                                                <span className="clrinput_tooltip">This is the css variable in the code. If you want to make a custom theme, these is the variabe you would set</span></code>&nbsp;
                                                <input 
                                                    type="color" 
                                                    id={`${cssvar.slice(2)}_tvs`}
                                                    defaultValue={GetCssVar(cssvar)}
                                                    onBlur={(e)=>{
                                                        // document.getElementById(`${cssvar}_form`).submit();
                                                        dispatch(setCustomCssVar({
                                                            name:cssvar,
                                                            new:e.target.value,
                                                        }));
                                                    }}
                                                />
                                            </label>
                                        {/* <form/> */}
                                    </React.Fragment>:null)}
                    </div>
                </>:null}
                <br/><h2 id="settingsheader_backup">Backup</h2>
                {window.toduraApi?toduraApi.desktop?<button onClick={(e)=>{
                    e.preventDefault();
                    saveStatusToastId.current=toast("Saving to File...",{autoClose:false});
                    let saveObj={todo,settings,saveId:generateId(10).replaceAll("==","")}
                    setTimeout(()=>toduraApi.saveToFile(saveObj),200);
                    toast.update(saveStatusToastId.current,{render:"Saved File to 'Downloads'",autoClose:5000})
                }}>Save to File
                    <span className="tooltip">Just save all your data to a custom <code>.tsf</code> file</span></button>:null:null}
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
