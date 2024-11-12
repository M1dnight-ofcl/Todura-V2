import React,{ useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import "./style/index.css";
import App from './App/App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { useSelector, useDispatch } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
const AppContainer=({})=>{
    // const settings=useSelector(state=>state.settings);
    // const dispatch=useDispatch();
    useEffect(()=>{
        if('scrollRestoration' in window.history)window.history.scrollRestoration='manual';
    },[]);
    return(<>
        <HelmetProvider>
            <motion.div 
                id="titlebar"
                transition={{ duration:.15,delay:.05 }}
                initial={{
                    y: "-100%",
                    opacity: 0,
                }}
                animate={{ y:0,opacity:1,scale:1 }}>
                    <motion.h1
                        transition={{ duration:.15,delay:.35 }}
                        initial={{
                            x: "-120%",
                            y:"-50%",
                            opacity: 0,
                        }}
                        animate={{ x:0,y:"-50%",opacity:1,scale:1 }}>
                        Todura V2</motion.h1>
                    {window.toduraApi?toduraApi.desktop?<div id="itemContainer">
                        <motion.div className="item" id="close" onClick={(e)=>{
                            e.preventDefault();window.toduraApi.close();}}
                            transition={{ duration:.15,delay:.05 }}
                            initial={{
                                y: "-100%",
                                opacity: 0,
                            }}
                            animate={{ y:0,opacity:1,scale:1 }}>
                                <i className="fa-solid fa-xmark"></i></motion.div>
                        <motion.div className="item" id="maximize" onClick={(e)=>{
                            e.preventDefault();window.toduraApi.max();}}
                            transition={{ duration:.15,delay:.1 }}
                            initial={{
                                y: "-100%",
                                opacity: 0,
                            }}
                            animate={{ y:0,opacity:1,scale:1 }}>
                                <i className="fa-solid fa-expand"></i></motion.div>
                        <motion.div className="item" id="minimize"onClick={(e)=>{
                            e.preventDefault();window.toduraApi.min();}}
                            transition={{ duration:.15,delay:.15 }}
                            initial={{
                                y: "-100%",
                                opacity: 0,
                            }}
                            animate={{ y:0,opacity:1,scale:1 }}>
                                <i className="fa-solid fa-minus"></i></motion.div>
                    </div>:null:null}
            </motion.div>
            <App/>
        </HelmetProvider>
    </>);
}
createRoot(document.getElementById('root'))
    .render(<React.StrictMode>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </React.StrictMode>);
