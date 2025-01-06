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
import { $with, generateId, GetCssVar, releaseData } from '../../modules/lib';
//external modules
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
export const SettingsTab=({})=>{
    const todo=useSelector(state=>state.todo);
    const settings=useSelector(state=>state.settings);
    const dispatch=useDispatch();
    const saveStatusToastId=React.useRef(null);
    const scrollToHeader=(header_id)=>{
        $with(document.getElementById(header_id)).then((settingsheader)=>{
            $with(document.getElementById("settingsContent")).then((settingsContent)=>{
                settingsContent.scrollTo({ 
                    left:0,
                    top: 
                        settingsheader.getBoundingClientRect().top 
                        + settingsContent.scrollTop 
                        - 75,
                    behavior:"smooth", 
                    // block:"start", 
                    // inline:"nearest",
                });
            });
        });
    }
    return(<><pre>
        <div id="settingsWrapper">
            <div id="settingsSidebar">
                <h1>Settings</h1>
                <motion.button 
                    id="settingsSidebar_general"
                    transition={{ delay:0,duration:.05 }}
                    initial={{x:-5,opacity:0,}}
                    animate={{x:0,opacity:1,}}
                    onClick={(e)=>{
                        e.preventDefault();
                        scrollToHeader("settingsheader_general");
                    }}><FontAwesomeIcon className='i' icon={faHouse}/> General</motion.button>
                <motion.button 
                    id="settingsSidebar_appearance"
                    transition={{ delay:.15,duration:.05 }}
                    initial={{x:-5,opacity:0,}}
                    animate={{x:0,opacity:1,}}
                    onClick={(e)=>{
                        e.preventDefault();
                        scrollToHeader("settingsheader_appearance");
                    }}><FontAwesomeIcon className='i' icon={faPaintBrush}/> Appearance</motion.button>
                {settings.advanced_settings?<>
                    <motion.button 
                        id="settingsSidebar_advancedsettings"
                        transition={{ delay:.25,duration:.05 }}
                        initial={{x:-5,opacity:0,}}
                        animate={{x:0,opacity:1,}}
                        onClick={(e)=>{
                            e.preventDefault();
                            scrollToHeader("settingsheader_advancedsettings");
                        }}><FontAwesomeIcon className='i' icon={faScrewdriverWrench}/> Advanced</motion.button>
                </>:null}
                {/* {window.toduraApi?toduraApi.desktop? */}<motion.button 
                    id="settingsSidebar_backup"
                    transition={{ delay:.35,duration:.05 }}
                    initial={{x:-5,opacity:0,}}
                    animate={{x:0,opacity:1,}}
                    onClick={(e)=>{
                        e.preventDefault();
                        scrollToHeader("settingsheader_backup");
                    }}><FontAwesomeIcon className='i' icon={faClockRotateLeft}/> Backup</motion.button>
                        {/* :null:null} */}
                <motion.button 
                    id="settingsSidebar_info"
                    transition={{ delay:.5,duration:.05 }}
                    initial={{x:-5,opacity:0,scale:.985,}}
                    animate={{x:0,opacity:1,scale:1,}}
                    onClick={(e)=>{
                        e.preventDefault();
                        scrollToHeader("settingsheader_info");
                    }}><FontAwesomeIcon className='i' icon={faInfoCircle}/> Info</motion.button>
            </div>
            <div id="settingsContent" onScroll={(e)=>{
                document.getElementById("taskScrollShadeTop").style.opacity=
                    (e.target.scrollTop>0)?"1":"0";
                document.getElementById("taskScrollShade").style.opacity=
                    (Math.abs(e.target.scrollHeight-e.target.scrollTop-e.target.clientHeight)<1)?
                        "0":"1";
            }}>
                <motion.h2 
                    id="settingsheader_general"
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}>General</motion.h2>
                <motion.label 
                    htmlFor="settings_advancedsettings" 
                    className='label_checkbox'
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}>Advanced Settings&nbsp;
                    <span className="tooltip">This is some advanced settings, like theme variables and experimental features.</span>
                        <label className="checkmarkContainer">
                            <input 
                                type="checkbox" 
                                defaultChecked={settings.advanced_settings}
                                onChange={(e)=>{dispatch(setAdvancedSettings(e.target.checked));}}/>
                            <span className="checkmark"></span>
                    </label></motion.label>
                <motion.h2 
                    id="settingsheader_appearance"
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}>Appearance</motion.h2>
                <motion.label 
                    htmlFor="settings_theme"
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                    y:0,}}>Themes<br/>
                        {/* <span className="tooltip">These are our inbuilt themes. Custom themes and setting custom theme variables can be found in advanced settings </span> */}
                        <select id="settings_theme" onClick={(e)=>{
                            dispatch(setTheme(e.target.value));}} defaultValue={settings.theme}>
                            <option value="default_dark">Default Dark</option>
                            <option value="default_light">Default Light</option>
                            <option value="sharp_dark">Sharp Dark</option>
                            <option value="sharp_light">Sharp Light</option>
                        </select></motion.label>
                {settings.advanced_settings?<>
                    <br/><motion.h2 
                        transition={{ delay:.1,duration:.15 }}
                        initial={{
                            opacity:0,
                            y:-5,}}
                        whileInView={{
                            opacity:1,
                            y:0,}}
                        id="settingsheader_advancedsettings">Advanced</motion.h2>
                    {/* <p className='caption'>
                        Nothing yet... (tried custom css vars but OH. MY. GOD. (I hate js sometimes))
                    </p> */}
                    <motion.div 
                        transition={{ delay:.1,duration:.15 }}
                        initial={{
                            opacity:0,
                            y:-5,}}
                        whileInView={{
                            opacity:1,
                            y:0,}}
                        className="experimental_settingswrapper">
                            <h3>Custom Theme Variables</h3>
                            {Object.keys(settings.customCssVar)
                            .map((cssvar,index)=>
                                settings.customCssVar[cssvar].type=="color"?
                                    <React.Fragment key={generateId(10)}>
                                        {/* <form id={`${cssvar}_form`}/> */}
                                            <motion.label 
                                                transition={{ delay:.1,duration:.15 }}
                                                initial={{
                                                    opacity:0,
                                                    y:-5,}}
                                                whileInView={{
                                                    opacity:1,
                                                    y:0,}}
                                                className='clrinput' 
                                                htmlFor={`${cssvar.slice(2)}_tvs`}>{settings.customCssVar[cssvar].title} &nbsp;
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
                                            </motion.label>
                                        {/* <form/> */}
                                    </React.Fragment>:null)}
                    </motion.div>
                </>:null}
                <br/><motion.h2 
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}
                    id="settingsheader_backup">Backup</motion.h2>
                {window.toduraApi?toduraApi.desktop?<><motion.button 
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}
                    onClick={(e)=>{
                        e.preventDefault();
                        saveStatusToastId.current=toast("Saving to File...",{autoClose:false});
                        let saveObj={todo,settings,saveId:generateId(10).replaceAll("==","")}
                        setTimeout(()=>toduraApi.saveToFile(saveObj),200);
                        toast.update(saveStatusToastId.current,{render:"Saved File to 'Downloads'",autoClose:5000})
                    }}>Save to File
                        <span className="tooltip">Just save all your data to a custom <code>.tsf</code> file</span></motion.button><br/></>:null:null}
                
                <motion.div 
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}
                    className="danger_settingswrapper"><br/>
                        <motion.button 
                            transition={{ delay:.1,duration:.15 }}
                            initial={{
                                opacity:0,
                                y:-5,}}
                            whileInView={{
                                opacity:1,
                                y:0,}}
                            onClick={(e)=>{
                                e.preventDefault();
                                localStorage.clear();
                                location.reload();
                            }}>Reset Data</motion.button>
                </motion.div>
                <br/><motion.h2 
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}
                    id="settingsheader_info">Info</motion.h2>
                <motion.label
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}>Current Version: {releaseData.v}</motion.label>
                <motion.label
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}>Release Date: {releaseData.date}</motion.label>
                <motion.label
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}><a href="https://github.com/m1dnight-ofcl/todura-v2">Github</a></motion.label>
                <motion.h3
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}>Changelog</motion.h3>
                <motion.ul
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}>
                        {releaseData.changelog.map((data,index)=>
                            <motion.li 
                                transition={{ delay:.15,duration:.15 }}
                                initial={{
                                    opacity:0,
                                    y:-5,}}
                                whileInView={{
                                    opacity:1,
                                    y:0,}}
                                key={index}>{data}</motion.li>)}
                </motion.ul>
                <motion.label
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}>M1dnight <FontAwesomeIcon icon={faCopyright} /> 2024-Current</motion.label>
                <motion.label
                    transition={{ delay:.1,duration:.15 }}
                    initial={{
                        opacity:0,
                        y:-5,}}
                    whileInView={{
                        opacity:1,
                        y:0,}}>Made with <FontAwesomeIcon icon={faHeart} /> in nj</motion.label>
                <br/><br/>
            </div>
            <div id="taskScrollShade"></div>
            <div id="taskScrollShadeTop"></div>
        </div>
    </pre></>);
}
